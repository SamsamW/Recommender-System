import pandas as pd
import numpy as np
import json
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from ftfy import fix_text
import string
from deep_translator import GoogleTranslator
from gensim.models import Word2Vec,KeyedVectors
from bs4 import BeautifulSoup
import re
from collections import Counter
import sqlalchemy
from sqlalchemy.orm import sessionmaker
import detectlanguage
from dotenv import load_dotenv
import os
import detectlanguage

load_dotenv()

api_key = os.getenv('DETECTLANGUAGE_API_KEY')

detectlanguage.configuration.api_key = api_key

class ActivityRecommender:
    def __init__(self, data_path, table_name, host, port, db_name, username, password):
        self.activities_data = pd.read_json(data_path)
        self.city_data = pd.read_csv('/Users/jianing/Documents/Study/Recsys/Hands-On-Recommender-System/data/destination_info_new.csv', sep=';')
        # self.museum_data = pd.read_csv(museum_data_path, sep=';')
        # self.activities_data = pd.read_csv(data_path, sep=';')
        self.vectorizer = TfidfVectorizer()
        self.table_name = table_name
        # self.activities['description'] = self.activities['description'].apply(self.preprocess_text)
        # self.tfidf_matrix = self.vectorizer.fit_transform(self.activities['description'])
        self.model = KeyedVectors.load_word2vec_format('/Users/jianing/Documents/Study/Recsys/Hands-On-Recommender-System/data/GoogleNews-vectors-negative300.bin.gz',binary=True,limit=100000)
        self.database_url = f"postgresql://{username}:{password}@{host}:{port}/{db_name}"
        self.db_engine = self.connect_to_database()

    def connect_to_database(self):
        """ Connect to the database using SQLAlchemy. """
        engine = sqlalchemy.create_engine(self.database_url)
        
        try:
            with engine.connect() as connection_str:
                print('Successfully connected to the PostgreSQL database')
        except Exception as ex:
            print(f'Sorry failed to connect: {ex}')
        return engine
    
    def fetch_users_data(self, user_ids):
        """Retrieve user data from the database by user ID."""
        Session = sessionmaker(bind=self.db_engine)
        session = Session()
        print(tuple(user_ids))
        print(self.table_name)
        try:
            result = session.execute(
                sqlalchemy.text(f"SELECT * FROM public.\"{self.table_name}\" WHERE \"{self.table_name}\".\"userId\" IN :user_ids"),
                {'user_ids': tuple(user_ids)}
            ).mappings().all()  # Use mappings() to get all matching rows as dictionaries
            if result:
                return [dict(row) for row in result]  # Convert each row to a dictionary
            else:
                print(f"No data found for user ID {user_ids}")
                return None
        except Exception as ex:
            print(f"An error occurred while fetching data for user ID {user_ids}: {ex}")
            return None
        finally:
            session.close()
            
    def preprocess_text(self, text):
        """Preprocess the text by removing HTML tags, punctuation, and stopwords."""
        if isinstance(text, list):
            text = ' '.join(text)
        soup = BeautifulSoup(text, "html.parser")
        clean_text = soup.get_text(separator=" ")
        clean_text = re.sub(r'\s+', ' ', clean_text)
        text = text.lower().replace('<p>', '').replace('</p>', '').replace('</br>', '').replace('<br>', '')
        text = text.translate(str.maketrans('', '', string.punctuation))
        words = text.split()
        words = [word for word in words if word not in stopwords.words('english')]
        return ' '.join(words)

    # def calculate_similarity(self, query):
    #     """Calculate the cosine similarity of the query with the activities matrix."""
    #     query_vector = self.vectorizer.transform([query])
    #     return cosine_similarity(query_vector, self.tfidf_matrix)[0]

 
        
        return json_result
    def recommend_activities_content_based(self, user_hobbies):
        """Recommend activities based on content similarity."""
        recommended = []
        for hobby in user_hobbies:
            hobby_description = self.preprocess_text(hobby)
            similarity_scores = self.calculate_similarity(hobby_description)
            for idx, activity in self.activities.iterrows():
                if similarity_scores[idx] > 0.1:
                    recommended.append((similarity_scores[idx], activity))
        recommended.sort(reverse=True, key=lambda x: x[0])
        # for similarity_scores, activity in recommended:
        #     print(f"activity: {activity}, Similarity Score: {similarity_scores.flatten()}")
        top_recommended_activities = [activity for _, activity in recommended[:10]]
        
        # 将活动转换为字典格式
        activities_list = []
        for activity in top_recommended_activities:
            activity_dict = activity.to_dict()  # 将每个活动转换为字典
            activities_list.append(activity_dict)
        
        # 将活动列表转换为JSON格式
        json_result = json.dumps(activities_list, indent=4)
        
        return json_result
    def recommend_from_oa_data(self, user_hobbies, user_location, distance_threshold):
        """Recommend museums based on geographical distance and content similarity."""
        user_lon, user_lat = map(float, user_location.split(','))
        self.museum_data['geom_lon'], self.museum_data['geom_lat'] = zip(*self.museum_data['geometry'].str.split(',').apply(lambda x: (float(x[0]), float(x[1]))))
        self.museum_data['distance'] = self.museum_data.apply(lambda row: self.haversine(row['geom_lon'], row['geom_lat'], user_lon, user_lat), axis=1)
        filtered_data = self.museum_data[self.museum_data['distance'] <= distance_threshold]
        filtered_data['combined_text'] = filtered_data['title'].fillna('') + " " + filtered_data['shortText'].fillna('')
        filtered_data['processed_description'] = filtered_data['combined_text'].apply(lambda x: GoogleTranslator(source='auto', target='en').translate(x))
        processed_texts = self.vectorizer.fit_transform(filtered_data['processed_description'])
        hobby_description = self.preprocess_text(' '.join(user_hobbies))
        user_vector = self.vectorizer.transform([hobby_description])
        recommended = []
        for idx, row in filtered_data.iterrows():
            similarity = cosine_similarity(user_vector, processed_texts[idx:idx+1])[0][0]
            if similarity > 0.1:
                recommended.append((similarity, row))
        recommended.sort(reverse=True, key=lambda x: x[0])
        return [activity for _, activity in recommended[:10]]

    def haversine(self, lon1, lat1, lon2, lat2):
        """Calculate the haversine distance between two points."""
        # print(lon1, lat1, lon2, lat2)
        lon1, lat1, lon2, lat2 = map(np.radians, [lon1, lat1, lon2, lat2])
        dlon = lon2 - lon1
        dlat = lat2 - lat1
        a = np.sin(dlat/2)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon/2)**2
        c = 2 * np.arcsin(np.sqrt(a))
        r = 6371
        return c * r
    
    def text_to_vector(self, text):
        words = self.preprocess_text(text)
        word_vectors = [self.model[word] for word in words if word in self.model]
        if not word_vectors:
            return np.zeros(self.model.vector_size)
        return np.mean(word_vectors, axis=0)
    
    
    def get_coordinates_from_city(self, city):
        city_data = self.city_data[self.city_data['city'] == city]
        print(city_data)
        if not city_data.empty:
            longitude = float(city_data.iloc[0]['longitude'])
            latitude = float(city_data.iloc[0]['latitude'])
            print(type(longitude), type(latitude))
            return longitude, latitude
        else:
            return None, None

        
    def convert_hobbies_to_keywords(self, hobby_ids):
        hobbies_df = pd.read_csv('/Users/jianing/Documents/Study/Recsys/Hands-On-Recommender-System/data/Hobby.csv')

        hobbies_dict = pd.Series(hobbies_df.hobby.values, index=hobbies_df.hobbyId).to_dict()

        hobby_names = [hobbies_dict[id] for id in hobby_ids if id in hobbies_dict]
        # print(hobby_names)
        return hobby_names
    
    def recommend(self, city, user_hobbies, distance_threshold):
        """Recommend museums based on geographical distance and content similarity."""
        # user_lon, user_lat = map(float, user_location.split(','))
        if city in self.city_data['city'].values:
            user_lon, user_lat = self.get_coordinates_from_city(city)
            filtered_data_by_distance = pd.DataFrame()
            filtered_data_by_city = pd.DataFrame()
            self.activities_data['geometry'] = self.activities_data['geometry'].replace('', np.nan)

            # Check if geometry is available and filter by distance or city
            has_geometry = self.activities_data['geometry'].notna()
            if has_geometry.any():
                print("Geometry data available.")
                self.activities_data[['geom_lon', 'geom_lat']] = self.activities_data['geometry'].str.split(',', expand=True).astype(float)
                self.activities_data['distance'] = self.activities_data.apply(lambda row: self.haversine(row['geom_lon'], row['geom_lat'], user_lon, user_lat), axis=1)
                filtered_data_by_distance = self.activities_data[self.activities_data['distance'] <= distance_threshold]
            # else:
            #     print("No geometry data available.")

            filtered_data_by_city = self.activities_data[self.activities_data['city'] == city]

            # Combine both filtered datasets
            filtered_data = pd.concat([filtered_data_by_distance, filtered_data_by_city]).drop_duplicates().reset_index(drop=True)
            print(f"Items with geometry: {len(filtered_data_by_distance)}")
            print(f"Items without geometry: {len(filtered_data_by_city)}")

            # Combine title and shortText, translate, and vectorize
            filtered_data['combined_text'] = filtered_data['title'].fillna('') + " " + filtered_data['description'].fillna('') + filtered_data['category'].fillna('')
            filtered_data['processed_description'] = filtered_data['combined_text'].apply(lambda x: GoogleTranslator(source='auto', target='en').translate(x))
            # processed_texts = self.vectorizer.fit_transform(filtered_data['processed_description'])

            # Preprocess user hobbies and vectorize
            hobby_description = self.preprocess_text(' '.join(user_hobbies))
            user_vector = self.text_to_vector([hobby_description])

            # Calculate similarity and recommend
            recommended = []
            for idx, row in filtered_data.iterrows():
                activity_vector = self.text_to_vector(row['processed_description'])
                similarity = cosine_similarity([user_vector], [activity_vector])[0][0]
                # similarity = cosine_similarity(user_vector, processed_texts[idx:idx+1])[0][0]
                if similarity > 0.1:
                    recommended.append((similarity, row))

            recommended.sort(reverse=True, key=lambda x: x[0])
            for index in recommended:
                print(f"activity Index: {index}, Similarity Score: {similarity.flatten()[index]}") 
            
            # 去重
            seen_titles = set()
            unique_recommended = []
            for similarity, activity in recommended:
                title = activity['title']
                if title not in seen_titles:
                    seen_titles.add(title)
                    unique_recommended.append(activity)
                if len(unique_recommended) >= 10:
                    break
            
            # Convert activities to dictionary format
            activities_list = []
            for activity in unique_recommended:
                activity_dict = activity.to_dict()
                activities_list.append(activity_dict)
            print(activities_list)
            # Convert the activities list to JSON format
            json_result = json.dumps(activities_list, indent=4, ensure_ascii=False)
            # print(json_result)

        return json_result

    def clean_html(self, text):
        clean_text = re.sub(r'<.*?>', '', text)  # 使用正则表达式替换所有HTML标签
        return clean_text
    
    def recommend_activities_for_multiple_users(self, city, user_ids, distance_threshold):
        print(user_ids)

        users_data = self.fetch_users_data(user_ids)
        
        print(users_data)
    
        if not users_data:
            print(f"No data found for user IDs {user_ids}")
            return None

        
        # Combine travelStyles and hobbies
        combined_travel_styles = Counter()
        combined_hobbies = Counter()

        for user_data in users_data:
            combined_travel_styles.update(user_data['travelStyles'])
            combined_hobbies.update(user_data['hobbies'])
        print(combined_travel_styles)
        print(combined_hobbies)
        
        # Calculate combined vector
        combined_vector = np.zeros(self.model.vector_size)
        total_weight = sum(combined_travel_styles.values()) + sum(combined_hobbies.values())

        for style, count in combined_travel_styles.items():
            # print(style)
            style_vector = self.text_to_vector(style)
            combined_vector += style_vector * (count / total_weight)

        for hobby, count in combined_hobbies.items():
            # print(hobby)
            hobby_vector = self.text_to_vector(str(hobby))  # Convert hobby to string if necessary
            combined_vector += hobby_vector * (count / total_weight)
            
        if city in self.city_data['city'].values:
            user_lon, user_lat = self.get_coordinates_from_city(city)
            filtered_data_by_distance = pd.DataFrame()
            filtered_data_by_city = pd.DataFrame()
            # print("Activities data length:")
            # print(len(self.activities_data))
            self.activities_data['geometry'] = self.activities_data['geometry'].replace("", np.nan)
            # Check if geometry is available and filter by distance or city
            has_geometry = self.activities_data['geometry'].notna()
            # print("Activities with geometry:")
            # print(len(has_geometry))
            if has_geometry.any():
                print("Geometry data available.")
                non_empty_geometry_data = self.activities_data[has_geometry]

                non_empty_geometry_data[['geom_lon', 'geom_lat']] = non_empty_geometry_data['geometry'].str.split(',', expand=True).astype(float)
                # print(non_empty_geometry_data[['geom_lon', 'geom_lat']])
                non_empty_geometry_data['distance'] = non_empty_geometry_data.apply(lambda row: self.haversine(row['geom_lon'], row['geom_lat'], user_lon, user_lat), axis=1)
                filtered_data_by_distance = non_empty_geometry_data[non_empty_geometry_data['distance'] <= distance_threshold]
                # print(len(filtered_data_by_distance))
            else:
                print("No geometry data available.")

            filtered_data_by_city = self.activities_data[self.activities_data['city'] == city]

            # Combine both filtered datasets
            # print(len(filtered_data_by_city))
            filtered_data = pd.concat([filtered_data_by_distance, filtered_data_by_city]).drop_duplicates().reset_index(drop=True)
            print(f"Items with geometry: {len(filtered_data_by_distance)}")
            print(f"Items without geometry: {len(filtered_data_by_city)}")

            # Combine title and shortText, translate, and vectorize
            filtered_data['combined_text'] = filtered_data['title'].fillna('') + " " + filtered_data['description'].fillna('') + filtered_data['category'].fillna('')
            filtered_data['processed_description'] = filtered_data['combined_text'].apply(lambda x: GoogleTranslator(source='auto', target='en').translate(x))
            # processed_texts = self.vectorizer.fit_transform(filtered_data['processed_description'])

            # print("filtered_data", filtered_data)
            recommended = []
            for idx, row in filtered_data[:500].iterrows():
                activity_vector = self.text_to_vector(row['processed_description'])
                similarity = cosine_similarity([combined_vector], [activity_vector])[0][0]

                if similarity > 0.1:
                    recommended.append((similarity, row))

            recommended.sort(reverse=True, key=lambda x: x[0])
            unique_recommended = []
            seen_titles = set()
            for similarity, activity in recommended:
                if activity['title'] not in seen_titles:
                    seen_titles.add(activity['title'])
                    unique_recommended.append(activity)
                if len(unique_recommended) >= 10:
                    break

            activities_list = [activity.to_dict() for activity in unique_recommended]
            keys_to_remove = ["processed_description", "combined_text", "geom_lat", "geom_lon", "distance", "geometry"]
            for activity in activities_list:
                try:
                    if 'description' in activity:
                        # 检测语言，假设返回格式是 [{'isReliable': True, 'confidence': 12.04, 'language': 'es'}]
                        detection_result = detectlanguage.detect(activity['description'])
                        if detection_result[0]['language'] != 'en':
                            # 如果描述不是英语，并且结果是可靠的
                            if detection_result[0]['isReliable']:
                                # 进行翻译
                                translated_description = GoogleTranslator(source='auto', target='en').translate(activity['description'])
                                activity['description'] = translated_description  # 更新描述为翻译后的英文
                                activity['description'] = self.clean_html(activity['description'])
                                print(f"Translated description: {activity['description']}")
                                import ast
                                address_dict = ast.literal_eval(activity['address'])

                                # Extracting the country name
                                country_name = address_dict['countryname']

                                # Translating the country name
                                translated_country_name = GoogleTranslator(source='auto', target='en').translate(country_name)

                                # Updating the country name in the address dictionary
                                address_dict['countryname'] = translated_country_name

                                # Updating the address in the activity dictionary
                                activity['address'] = str(address_dict)
                                print(f"Translated address: {activity['address']}")

                except Exception as e:
                    print(f"Error in translation or detection: {e}")


                for key in keys_to_remove:
                    activity.pop(key, None)  # 使用 pop 方法并传入 None 作为默认值，以避免 KeyError

            
            json_result = json.dumps(activities_list, indent=4)
    

    
        return json_result