import sqlalchemy
from sqlalchemy.orm import sessionmaker
import json
from datetime import datetime
import pandas as pd

class UserMatcher:
    def __init__(self, matching_user, host, port, db_name, username, password):
        self.database_url = f"postgresql://{username}:{password}@{host}:{port}/{db_name}"
        self.db_engine = self.connect_to_database()
        self.matching_user_id = matching_user.get('userId')
        self.user_data = self.get_user_data(self.matching_user_id)

    def connect_to_database(self):
        """ Connect to the database using SQLAlchemy. """
        engine = sqlalchemy.create_engine(self.database_url)
        
        try:
            with engine.connect() as connection_str:
                print('Successfully connected to the PostgreSQL database')
        except Exception as ex:
            print(f'Sorry failed to connect: {ex}')
        return engine

    def get_all_user_data(self):
        """ Retrieve all user data from the MatchQuestionnaire table. """
        Session = sessionmaker(bind=self.db_engine)
        session = Session()
        result = session.execute(sqlalchemy.text("SELECT * FROM public.\"MatchQuestionaire\" ")).fetchall()
        columns = ["MatchQuestionaireId", "startDate", "endDate", "reliabilityRating", "flexibilityRating", "organizationRating", "sharedInterestsRating", "daynightPreference", "travelPacePreference", "foodPreference", "groupSizePreference", "createdAt", "updatedAt", "userId", "sociabilityRating", "accomondations", "budget", "hobbies", "travelStyles", "destinationRating1", "destinationRating2", "destinationRating3", "destination1", "destination2", "destination3"]

        # 将结果转换为带有表头的字典列表
        dict_result = [dict(zip(columns, row)) for row in result]

        # 将字典列表转换为 JSON 格式
        json_user_data = json.dumps(dict_result, default=str, indent=4)

        # 输出或保存 JSON 数据
        # print(json_user_data)
        
        session.close()
        return json_user_data
    
    def get_user_data(self, user_id):
        """ Retrieve all user data from the MatchQuestionnaire table. """
        Session = sessionmaker(bind=self.db_engine)
        session = Session()
        result = session.execute(sqlalchemy.text("SELECT * FROM public.\"MatchQuestionaire\" WHERE \"MatchQuestionaire\".\"userId\" = :user_id" ""), {"user_id": user_id}).fetchone()
        result = result._asdict()
        columns = ["MatchQuestionaireId", "startDate", "endDate", "reliabilityRating", "flexibilityRating", "organizationRating", "sharedInterestsRating", "daynightPreference", "travelPacePreference", "foodPreference", "groupSizePreference", "createdAt", "updatedAt", "userId", "sociabilityRating", "accomondations", "budget", "hobbies", "travelStyles", "destinationRating1", "destinationRating2", "destinationRating3", "destination1", "destination2", "destination3"]

        # 将结果转换为带有表头的字典列表
        # dict_result = [dict(zip(columns, row)) for row in result]

        # 将字典列表转换为 JSON 格式
        # json_user_data = json.dumps(result, default=str, indent=4)

        # 输出或保存 JSON 数据
        print(result)
        
        session.close()
        return result
    
    def convert_hobbies_to_keywords(self, hobby_ids):
        hobbies_df = pd.read_csv('/Users/jianing/Documents/Study/Recsys/Hands-On-Recommender-System/data/Hobby.csv')

        hobbies_dict = pd.Series(hobbies_df.hobby.values, index=hobbies_df.hobbyId).to_dict()

        hobby_names = [hobbies_dict[id] for id in hobby_ids if id in hobbies_dict]
        # print(hobby_names)
        return hobby_names
    
    def get_match_score(self, other_user_data):
        """ Calculate a similarity score based on shared interests and preferences. """
        # other_user_data = json.loads(other_user_data)
        print(other_user_data)
        score = 0
        for key in ['reliabilityRating', 'flexibilityRating', 'organizationRating', 'sociabilityRating']:
            score += 1 - abs(self.user_data[key] - other_user_data[key]) / 5
            print(f"Score for {key}: {score}")
        user_hobbies = set(self.user_data['hobbies'])
        other_user_hobbies = set(other_user_data['hobbies'])       
        common_hobbies = user_hobbies.intersection(other_user_hobbies)
        score += len(common_hobbies)
        print(f"Common hobbies: {common_hobbies}")

        if self.user_data['daynightPreference'] == other_user_data['daynightPreference']:
            score += 1

        if self.user_data['travelPacePreference'] == other_user_data['travelPacePreference']:
            score += 1
        accommodations_other = ", ".join(other_user_data['accomondations'])
        accommodations_self = ", ".join(self.user_data['accomondations'])
        # print(accommodations_other)
        # print(accommodations_self)       
        accommodations_self = set(accommodations_self.split(', '))
        accommodations_other = set(accommodations_other.split(', '))
        # accommodations_other = ", ".join(accommodations_other)
        # accommodations_self = ", ".join(accommodations_self)

        if accommodations_self & accommodations_other:
            # print("yes")
            score += 1
            
        travel_styles_other = ", ".join(other_user_data['travelStyles'])
        travel_styles_self = ", ".join(self.user_data['travelStyles'])
        # print  (travel_styles_other)
        # print  (travel_styles_self)
        
        travel_styles_self = set(travel_styles_self.split(', '))
        travel_styles_other = set(travel_styles_other.split(', '))
        # Calculate the intersection of both sets
        matching_styles = travel_styles_self & travel_styles_other
        score += len(matching_styles)
        return score


    def validate_date_difference(self, other_user_data, max_difference_days=7):
        """ Validate the date difference between users' travel periods and return common period. """
        
        # Helper function to ensure we have datetime objects
        def ensure_datetime(date):
            if isinstance(date, datetime):
                return date
            return datetime.strptime(date, "%Y-%m-%d %H:%M:%S")
        
        # Extracting and ensuring datetime format for self user data
        start_date_self = ensure_datetime(self.user_data["startDate"])
        end_date_self = ensure_datetime(self.user_data["endDate"])

        # Extracting and ensuring datetime format for other user data
        start_date_other = ensure_datetime(other_user_data["startDate"])
        end_date_other = ensure_datetime(other_user_data["endDate"])
        # Debugging prints to check values and types
        print(f"start_date_self: {start_date_self}, type: {type(start_date_self)}")
        print(f"end_date_self: {end_date_self}, type: {type(end_date_self)}")
        print(f"start_date_other: {start_date_other}, type: {type(start_date_other)}")
        print(f"end_date_other: {end_date_other}, type: {type(end_date_other)}")
        start_diff = abs((start_date_self - start_date_other).days)
        end_diff = abs((end_date_self - end_date_other).days)

        # print(f"start_diff: {start_diff}, end_diff: {end_diff}") 
        # # Determine the common period
        # common_start_date = max(start_date_self, start_date_other)
        # common_end_date = min(end_date_self, end_date_other)
        
        # # Check if the common period is valid
        # if common_end_date > common_start_date:
        #     # Optionally, you can also check if the common period meets the max_difference_days criteria
        #     common_period_days = (common_end_date - common_start_date).days
        #     if common_period_days <= max_difference_days:
        #         return common_start_date, common_end_date
        #     else:
        #         print("The common period exceeds the maximum allowed difference in days.")
        #         return None
        # else:
        #     print("No common period exists.")
        #     return None
    
        print(f"start_diff: {start_diff}, end_diff: {end_diff}")

        # Check if both the start date difference and end date difference are within the allowed maximum difference
        if start_diff <= max_difference_days and end_diff <= max_difference_days:
            # Determine the common period
            common_start_date = max(start_date_self, start_date_other)
            common_end_date = min(end_date_self, end_date_other)
            print(f"common_start_date: {common_start_date}, type: {type(common_start_date)}")
            print(f"common_end_date: {common_end_date}, type: {type(common_end_date)}")

            # Check if the common period is valid
            if common_end_date > common_start_date:
                common_period_days = (common_end_date - common_start_date).days
                return common_start_date, common_end_date
            else:
                print("No common period exists.")
                return None
        else:
            print("The start date or end date difference exceeds the maximum allowed difference in days.")
            return None
    # def validate_date_difference(self, other_user_data, max_difference_days=7):
    #     """ Validate the date difference between users' travel periods. """
        
    #     # Helper function to ensure we have datetime objects
    #     def ensure_datetime(date):
    #         if isinstance(date, datetime):
    #             return date
    #         return datetime.strptime(date, "%Y-%m-%d %H:%M:%S")
        
    #     # Extracting and ensuring datetime format for self user data
    #     start_date_self = ensure_datetime(self.user_data["startDate"])
    #     end_date_self = ensure_datetime(self.user_data["endDate"])

    #     # Extracting and ensuring datetime format for other user data
    #     start_date_other = ensure_datetime(other_user_data["startDate"])
    #     end_date_other = ensure_datetime(other_user_data["endDate"])
        
    #     # Debugging prints to check values and types
    #     print(f"start_date_self: {start_date_self}, type: {type(start_date_self)}")
    #     print(f"end_date_self: {end_date_self}, type: {type(end_date_self)}")
    #     print(f"start_date_other: {start_date_other}, type: {type(start_date_other)}")
    #     print(f"end_date_other: {end_date_other}, type: {type(end_date_other)}")
    #     start_diff = abs((start_date_self - start_date_other).days)
    #     end_diff = abs((end_date_self - end_date_other).days)

    #     print(f"start_diff: {start_diff}, end_diff: {end_diff}") 
    #     return start_diff <= max_difference_days and end_diff <= max_difference_days
    
    # def find_best_matches(self, num_matches=1, min_score_threshold=5):
    #     """ Find the top 'num_matches' best matches from the database excluding the current user. """
    #     all_users = self.get_all_user_data()
    #     all_users = json.loads(all_users)
    #     any_valid_dates = False
    #     # print(all_users)
    #     scores = []
    #     for user in all_users:
    #         if user.get('userId') != self.matching_user_id:  # Exclude the current user
    #             if self.validate_date_difference(user):
    #                 any_valid_dates = True  # Found at least one user with valid date difference
    #                 score = self.get_match_score(user)
    #                 if score >= min_score_threshold:  # Check if score meets the threshold
    #                     scores.append((user.get('userId'), score))
        
    #     if not any_valid_dates:
    #         return None  # If no users have valid date differences, return None
        
    #     print(scores)
    #     # Sort by score in descending order and return the top 'num_matches' IDs
    #     scores.sort(key=lambda x: x[1], reverse=True)
    #     return [user_id for user_id, _ in scores[:num_matches]] if scores else None
    def find_best_matches(self, num_matches=1, min_score_threshold=3):
        """Find the top 'num_matches' best matches from the database excluding the current user, along with common start and end dates."""
        all_users = self.get_all_user_data()
        all_users = json.loads(all_users)
        any_valid_dates = False
        matches = []  # Store tuples of (userId, score, common_start_date, common_end_date)
        for user in all_users:
            if user.get('userId') != self.matching_user_id:  # Exclude the current user
                date_validation_result = self.validate_date_difference(user)
                if date_validation_result:
                    print("Date validation result:", date_validation_result)
                    any_valid_dates = True
                    common_start_date, common_end_date = date_validation_result
                    score = self.get_match_score(user)
                    print("Score:", score)
                    if score >= min_score_threshold:  # Check if score meets the threshold
                        matches.append((user.get('userId'), score, common_start_date, common_end_date))
                        print("Match found:", user.get('userId'), score, common_start_date, common_end_date)
        
        
        print("Any valid dates found:", any_valid_dates)
        if not any_valid_dates:
            return None  # If no users have valid date differences, return None
        
        # Sort by score in descending order and return the top 'num_matches' IDs along with dates
        matches.sort(key=lambda x: x[1], reverse=True)
        top_matches = matches[:num_matches] if matches else None
        print(top_matches)
        if top_matches:
            return [{'userId': match[0], 'score': match[1], 'common_start_date': match[2], 'common_end_date': match[3]} for match in top_matches]
        else:
            return None