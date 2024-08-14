from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os
sys.path.append(os.path.abspath('../'))
from CityRecommender import CityRecommender
from UserMatcher import UserMatcher
import json
from ActivityRecommender import ActivityRecommender
import numpy as np 
from dotenv import load_dotenv


app = Flask(__name__)
CORS(app)

load_dotenv()

host = os.getenv('HOST')
port = os.getenv('PORT')
db_name = os.getenv('DB_NAME')
username = os.getenv('USERNAME')
password = os.getenv('PASSWORD')


@app.route('/groupRecommend', methods=['POST'])
def groupRecommend():
    req_data = request.get_json()
    trip_id = req_data.get('tripId')

    city_data_path = '/Users/jianing/Documents/Study/Recsys/Hands-On-Recommender-System/data/destination_info_new.csv'

    city_recommender = CityRecommender(city_data_path, "GroupQuestionaire",host, port, db_name, username, password)
    users_id = city_recommender.get_user_ids_by_trip_id_GroupQuestionaire(trip_id)
    groupQuestionaireId = city_recommender.get_groupQuestionaireIds_by_trip_id(trip_id)

    activity_recommender = ActivityRecommender('/Users/jianing/Documents/Study/Recsys/Hands-On-Recommender-System/data/final_data/merged_data.json', "GroupQuestionaire", host, port, db_name, username, password)

    try:
        city_recommendations = city_recommender.recommend_for_group(users_id)
        json_city_recommendations = json.loads(city_recommendations)
        city_name = json_city_recommendations[0]['city']
        recommended_activities = activity_recommender.recommend_activities_for_multiple_users(city_name, users_id, 150)
        json_recommended_activities = json.loads(recommended_activities)
        
        returned_data = {
            "tripId":trip_id,
            "groupQuestionaireId": groupQuestionaireId,
            "city": json_city_recommendations,
            "activities": json_recommended_activities
        }
        
    except ValueError as e:
        print(e)
        
    return returned_data


@app.route('/matchRecommend', methods=['POST'])
def matchRecommend():
    req_data = request.get_json()

    print("req_data", req_data)
    
    matchQuestionaireId = req_data.get('matchQuestionaireId')
    city_data_path = '/Users/jianing/Documents/Study/Recsys/Hands-On-Recommender-System/data/destination_info_new.csv'
    city_recommender = CityRecommender(city_data_path, "MatchQuestionaire",host, port, db_name, username, password)
    activity_recommender = ActivityRecommender('/Users/jianing/Documents/Study/Recsys/Hands-On-Recommender-System/data/final_data/merged_data.json', "MatchQuestionaire", host, port, db_name, username, password)

    matching_user_id = city_recommender.get_userid_by_matchQuestionaireId(matchQuestionaireId)

    matcher = UserMatcher(matching_user_id, host, port, db_name, username, password)
    matched_users = matcher.find_best_matches(1, min_score_threshold=3)
    print(matched_users)
    
    if matched_users is None:
        return jsonify({"message": "No matches found"}), 200
    
    users_id = [matching_user_id.get('userId')]
    print("Best Matches:", users_id)
    
    matched_users_id = [match['userId'] for match in matched_users]
    users_id.extend(matched_users_id)
    print("Best Matches:", users_id)
    startDate = [match['common_start_date'] for match in matched_users]
    endDate = [match['common_end_date'] for match in matched_users]
    print("startDate", startDate)
    print("endDate", endDate)
    try:
        city_recommendations = city_recommender.recommend_for_group(users_id)
        json_city_recommendations = json.loads(city_recommendations)
        city_name = json_city_recommendations[0]['city']
        recommended_activities = activity_recommender.recommend_activities_for_multiple_users(city_name, users_id, 150)
        json_recommended_activities = json.loads(recommended_activities)
        matchQuestionaireIds_dict = city_recommender.get_matchQuestionaireIds_by_userids(users_id)
        matchedQuestionaireId_array = [item['MatchQuestionaireId'] for item in matchQuestionaireIds_dict]


        returned_data = {
            "MatchQuestionaireId": matchedQuestionaireId_array,
            "MatchedUserId": users_id,
            "startDate": startDate,
            "endDate": endDate,          
            "city": json_city_recommendations[0],
            "activities": json_recommended_activities
        }
        
    except ValueError as e:
        print(e)
        
    return returned_data


if __name__ == '__main__':
    app.run(port=12345)
