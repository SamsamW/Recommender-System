import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.neighbors import NearestNeighbors
from scipy.sparse.linalg import svds
import numpy as np
from gensim.models import Word2Vec,KeyedVectors
from sklearn.metrics.pairwise import cosine_similarity
import os
import gzip
import shutil
import sqlalchemy
from sqlalchemy.orm import sessionmaker
import ast
import re
class CityRecommender:
    def __init__(self, city_data_path, table_name, host, port, db_name, username, password):
        self.city_data = pd.read_csv(city_data_path, sep=';')
        # print(self.city_data)
        self.vectorizer = TfidfVectorizer()
        # self.city_vectors1 = self.vectorizer.fit_transform(self.city_data['keywords'])
        self.table_name = table_name
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

    def fetch_user_data(self, user_id):
        """Retrieve user data from the database by user ID."""
        Session = sessionmaker(bind=self.db_engine)
        session = Session()
        try:
            result = session.execute(
                sqlalchemy.text(f"SELECT * FROM public.\"{self.table_name}\" WHERE \"{self.table_name}\".\"userId\" = :user_id"),
                {'user_id': user_id}
            ).fetchone()
            if result is not None:
                return result._asdict()  # Use _asdict() to convert the result row to a dictionary
            else:
                print(f"No data found for user ID {user_id}")
                return None
        except Exception as ex:
            print(f"An error occurred while fetching data for user ID {user_id}: {ex}")
            return None
        finally:
            session.close()
        
    # def fetch_user_data(self, user_id):
    #     """Retrieve user data from the database by user ID."""
    #     Session = sessionmaker(bind=self.db_engine)
    #     session = Session()
    #     try:
    #         result = session.execute(
    #             sqlalchemy.text("SELECT * FROM public.\"GroupQuestionaire\" WHERE \"GroupQuestionaire\".\"userId\" = :user_id"),
    #             {'user_id': user_id}
    #         ).fetchone()
    #         if result is not None:
    #             return result._asdict()  # Use _asdict() to convert the result row to a dictionary
    #         else:
    #             print(f"No data found for user ID {user_id}")
    #             return None
    #     except Exception as ex:
    #         print(f"An error occurred while fetching data for user ID {user_id}: {ex}")
    #         return None
    #     finally:
    #         session.close()
            
    def get_userid_by_matchQuestionaireId(self, MatchQuestionaireId):
        """Retrieve user data from the database by user ID."""
        Session = sessionmaker(bind=self.db_engine)
        session = Session()
        try:
            result = session.execute(
                sqlalchemy.text("SELECT \"userId\" FROM public.\"MatchQuestionaire\" WHERE \"MatchQuestionaire\".\"MatchQuestionaireId\" = :MatchQuestionaireId"),
                {'MatchQuestionaireId': MatchQuestionaireId}
            ).fetchone()
            if result is not None:
                return result._asdict()  # Use _asdict() to convert the result row to a dictionary
            else:
                print(f"No data found for MatchQuestionaire ID {MatchQuestionaireId}")
                return None
        except Exception as ex:
            print(f"An error occurred while fetching data for MatchQuestionaire ID {MatchQuestionaireId}: {ex}")
            return None
        finally:
            session.close()

    def get_matchQuestionaireIds_by_userids(self, user_ids):
        """Retrieve user data from the database by user ID."""
        Session = sessionmaker(bind=self.db_engine)
        session = Session()
        try:
            result = session.execute(
                sqlalchemy.text("SELECT \"MatchQuestionaireId\" FROM public.\"MatchQuestionaire\" WHERE \"MatchQuestionaire\".\"userId\" IN :user_ids"),
                {'user_ids': tuple(user_ids)}
            ).mappings().all()  # Use mappings() to get all matching rows as dictionaries
            if result:
                return [dict(row) for row in result]  # Convert each row to a dictionary
            else:
                print(f"No data found for MatchQuestionaire ID {user_ids}")
                return None
        except Exception as ex:
            print(f"An error occurred while fetching data for MatchQuestionaire ID {user_ids}: {ex}")
            return None
        finally:
            session.close()
             
    def get_user_ids_by_trip_id_GroupQuestionaire(self, trip_id):
        """ Get a list of user IDs associated with a given trip ID. """
        Session = sessionmaker(bind=self.db_engine)
        session = Session()
        try:
            result = session.execute(
                sqlalchemy.text("SELECT \"userId\" FROM public.\"GroupQuestionaire\" WHERE \"GroupQuestionaire\".\"tripId\" = :trip_id"),
                {'trip_id': trip_id}
            ).fetchall()
            # print(result)
            user_ids = [item[0] for item in result]
            return user_ids
        except Exception as ex:
            print(f"Error retrieving user IDs for trip ID {trip_id}: {ex}")
            return []
        finally:
            session.close()
            
    def get_groupQuestionaireIds_by_trip_id(self, trip_id):
        """ Get a list of user IDs associated with a given trip ID. """
        Session = sessionmaker(bind=self.db_engine)
        session = Session()
        try:
            result = session.execute(
                sqlalchemy.text("SELECT \"groupQuestionaireId\" FROM public.\"GroupQuestionaire\" WHERE \"GroupQuestionaire\".\"tripId\" = :trip_id"),
                {'trip_id': trip_id}
            ).fetchall()
            print(result)
            groupQuestionaireId = [item[0] for item in result]
            return groupQuestionaireId
        except Exception as ex:
            print(f"Error retrieving user IDs for trip ID {trip_id}: {ex}")
            return []
        finally:
            session.close()
            

    def vectorize_cities(self):
        """Generate vectors for each city by averaging word vectors of its keywords."""
        city_vectors = []  # Initialize an empty list to store the city vectors
        
        # print(self.city_data['keywords'])
        print(type(self.city_data))
        # Iterate over each city's keywords
        for keywords in self.city_data['keywords']:
            # Convert string representation of list to actual list (if necessary)
            if isinstance(keywords, str):
                keywords = ast.literal_eval(keywords)
            
            # Filter valid keywords and collect their vectors
            valid_vectors = [self.model[word] for word in keywords if word in self.model]

            # Compute the average vector if there are any valid vectors, else use zero vector
            if valid_vectors:
                average_vector = np.mean(valid_vectors, axis=0)
            else:
                average_vector = np.zeros(self.model.vector_size)

            # Append the average vector to the list
            city_vectors.append(average_vector)

        # Convert list of vectors to a numpy array
        return np.array(city_vectors)
    
    def vectorize_cities_with_description(self):
        """Generate vectors for each city by averaging word vectors of its keywords and keywords_description."""
        city_vectors = []  # Initialize an empty list to store the city vectors
        
        # Iterate over each city's keywords and keywords_description
        for keywords, keywords_description in zip(self.city_data['keywords'], self.city_data['keywords_description']):
            # Convert string representation of list to actual list (if necessary)
            if isinstance(keywords, str):
                keywords = ast.literal_eval(keywords)
            # print(keywords)
            if isinstance(keywords_description, str):
                # Extract keywords from description using regular expression
                keywords_description_list = re.findall(r'"(.*?)"', keywords_description)
            # print(keywords_description_list)
            # Combine keywords and keywords_description
            combined_keywords = keywords + keywords_description_list
            # print(combined_keywords)

            # Filter valid keywords and collect their vectors
            valid_vectors = [self.model[word] for word in combined_keywords if word in self.model]

            # Compute the average vector if there are any valid vectors, else use zero vector
            if valid_vectors:
                average_vector = np.mean(valid_vectors, axis=0)
            else:
                average_vector = np.zeros(self.model.vector_size)

            # Append the average vector to the list
            city_vectors.append(average_vector)

        # Convert list of vectors to a numpy array
        return np.array(city_vectors)
    
    def convert_hobbies_to_keywords(self, hobby_ids):
        hobbies_df = pd.read_csv('/Users/jianing/Documents/Study/Recsys/Hands-On-Recommender-System/data/Hobby.csv')

        hobbies_dict = pd.Series(hobbies_df.hobby.values, index=hobbies_df.hobbyId).to_dict()

        hobby_names = [hobbies_dict[id] for id in hobby_ids if id in hobbies_dict]
        # print(hobby_names)
        return hobby_names
    
    def preprocess_user_input(self, user_data):
        """Convert user data to vector using Word2Vec model."""
        # print(user_data['travelStyles'])
        
        user_preferences = (", ".join([
            ", ".join(user_data['travelStyles']),
            ", ".join(self.convert_hobbies_to_keywords(user_data['hobbies']))
        ])).lower().split(', ')
        
        print(user_preferences)
        
        user_vector = np.mean([
            self.model[word] for word in user_preferences if word in self.model
        ] or [np.zeros(300)], axis=0)  # 注意向量大小与预训练模型保持一致
        
        # print(user_vector)
        print(user_vector.shape)
        user_vector = self.adjust_by_ratings(user_vector, user_data)
        
        return user_vector.reshape(1, -1)
    
    def adjust_by_ratings(self, user_vector, user_data):
        """ Adjust the user vector based on the ratings provided for specific cities. """
        ratings = [user_data['destinationRating1'], user_data['destinationRating2'], user_data['destinationRating3']]
        cities = [user_data['destination1'], user_data['destination2'], user_data['destination3']]
        city_vectors = self.vectorize_cities_with_description()
        for rating, city in zip(ratings, cities):
            city_index = self.city_data[self.city_data['city'] == city].index
            if not city_index.empty:
                city_vector = city_vectors[city_index.item(), :]
                # Weight the city vector by the user's rating and add to user vector
                user_vector += (rating / 5) * city_vector  # Assume ratings are out of 5
        return user_vector

    def cosine_sim_recommendations(self, user_vector, top_n=6):
        city_vectors = self.vectorize_cities_with_description()
        # city_vectors = self.vectorize_cities()
        # print(user_vector.shape)
        # print(city_vectors.shape)
        similarity_scores = cosine_similarity(user_vector, city_vectors)
        top_city_indices = np.argsort(similarity_scores.flatten())[-top_n:][::-1]
        # Print each top city index with its corresponding similarity score
        for index in top_city_indices:
            print(f"City Index: {index}, Similarity Score: {similarity_scores.flatten()[index]}")
        return self.city_data.iloc[top_city_indices]

    def knn_recommendations(self, user_vector, k=3):
        
        knn = NearestNeighbors(n_neighbors=k, metric='cosine')
        knn.fit(self.city_vectors1)
        distances, indices = knn.kneighbors(user_vector)
        return self.city_data.iloc[indices.flatten()]

    def svd_recommendations(self, user_index, k=50, top_n=3):
        rating_matrix = np.random.rand(len(self.city_data), len(self.city_data))  # This should be your actual user-city rating matrix
        user_ratings_mean = np.mean(rating_matrix, axis=1)
        matrix_demeaned = rating_matrix - user_ratings_mean.reshape(-1, 1)
        U, sigma, Vt = svds(matrix_demeaned, k=k)
        sigma = np.diag(sigma)
        all_user_predicted_ratings = np.dot(np.dot(U, sigma), Vt) + user_ratings_mean.reshape(-1, 1)
        predictions = pd.DataFrame(all_user_predicted_ratings, columns=self.city_data['city'])
        sorted_user_predictions = predictions.iloc[user_index].sort_values(ascending=False)
        return sorted_user_predictions.head(top_n)

    def recommend(self, user_data, method='content', user_index=None, k=3, top_n=6):
        user_vector = self.preprocess_user_input(user_data)
        if method == 'content':
            return self.cosine_sim_recommendations(user_vector, top_n)
        elif method == 'knn':
            return self.knn_recommendations(user_vector, k)
        elif method == 'svd':
            if user_index is None:
                raise ValueError("User index must be provided for SVD recommendations.")
            return self.svd_recommendations(user_index, k, top_n)
        else:
            raise ValueError("Method not recognized. Use 'content', 'knn', or 'svd'.")

    def recommend_for_group(self, users_id):
        """Generate recommendations for a group of users based on their collective data."""
        # Convert user IDs to user data
        all_recommendations = []
        for user_id in users_id:
            print(f"Processing recommendations for user ID: {user_id}")
            user_data = self.fetch_user_data(user_id)
            print(user_data)

            recommendations = self.recommend(user_data)
            if not recommendations.empty:
                # print(type(recommendations))
                print(recommendations)
                all_recommendations.append(set(recommendations['city']))  # Store as set for easy intersection
                # print(type(all_recommendations))
            else:
                print(f"No recommendations found for user ID: {user_id}")
  

        # Find common recommendations across all users
        if all_recommendations:
            common_city = set(all_recommendations[0]).intersection(*all_recommendations[1:])
            common_recommendations = self.city_data[self.city_data['city'].isin(common_city)]
            common_recommendations = common_recommendations.drop(columns=['latitude', 'longitude'])
    
            print("Common recommendations for the group:", common_recommendations)
            return common_recommendations.to_json(orient='records', indent=4)
        else:
            print("No common recommendations could be found.")
            return []
