import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk.corpus import stopwords
import string
import json
from deep_translator import GoogleTranslator
import sys
import numpy as np
import pandas as pd
from ftfy import fix_text
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


# 下载停用词表
nltk.download('stopwords')

# 示例用户数据
user_data = {
    'hobbies': ["Hiking", "Nature Walks", "Museum Visits"],
    'travelStyles': ["Adventure", "Cultural"],
    'budget': 200
}

# 从JSON文件加载活动数据
with open('./gpt_data/Amsterdam_travel_data.json') as f:
    activities_data = json.load(f)
    
# 从JSON文件加载活动数据
# with open('./add_city_data/city_result_museum.json') as f:
#     museum_data = json.load(f)

# 创建活动DataFrame
activities = pd.DataFrame(activities_data)
# museum_data = pd.DataFrame(museum_data)

pd.set_option('display.max_colwidth', None)
pd.set_option('display.max_columns', None)

# museum_data_df = museum_data[['title', 'homepage', 'address', 'city', 'businessHours', 'shortText', 'geometry', 'ranking', 'countryCode']]
museum_data_df = pd.read_csv("./filtered_data/museum_data.csv",sep=';')


def preprocess_text(text):
    if isinstance(text, list):
        text = ' '.join(text)
    text = text.lower().replace('<p>', '').replace('</p>', '').replace('</br>', '').replace('<br>', '')
    text = text.translate(str.maketrans('', '', string.punctuation))
    words = text.split()
    words = [word for word in words if word not in stopwords.words('english')]
    return ' '.join(words)


activities['processed_description'] = activities['description'].apply(preprocess_text)


descriptions = activities['processed_description']
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(descriptions)

# sys.exit(0)


def calculate_similarity(query, matrix):
    query_vector = vectorizer.transform([query])
    similarities = cosine_similarity(query_vector, matrix)
    return similarities[0]

# 推荐活动基于内容过滤
def recommend_activities_content_based(user_hobbies, activities):
    recommended = []
    for hobby in user_hobbies:
        hobby_description = preprocess_text(hobby)
        similarity_scores = calculate_similarity(hobby_description, tfidf_matrix)
        for idx, activity in activities.iterrows():
            if similarity_scores[idx] > 0.1:
                recommended.append((similarity_scores[idx], activity))
    recommended.sort(reverse=True, key=lambda x: x[0])
    top_activities = recommended[:10]  # 取相似度最高的前5个活动
    
    return [activity for _, activity in top_activities]

    
def haversine(lon1, lat1, lon2, lat2):
    # 将经纬度转换成弧度
    lon1, lat1, lon2, lat2 = map(np.radians, [lon1, lat1, lon2, lat2])

    # Haversine公式
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = np.sin(dlat/2)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon/2)**2
    c = 2 * np.arcsin(np.sqrt(a))

    # 地球平均半径，单位公里
    r = 6371
    return c * r


def clean_result(data):
    df = pd.DataFrame(data)
    # Drop unwanted columns
    columns_to_drop = ['city', 'Unnamed: 9', 'Unnamed: 10', 'Unnamed: 11', 'geom_lon', 'geom_lat', 'combined_text']
    df.drop(columns=columns_to_drop, inplace=True)
    # Fix encoding issues
    string_columns = df.select_dtypes(include=['object']).columns
    # Apply fix_text only to string columns
    df[string_columns] = df[string_columns].applymap(fix_text)
    json_result = df.to_json(orient='records', force_ascii=False, indent=4)
    return json_result

def recommend_from_oa_data(user_hobbies, museum_data_df, user_location, distance_threshold):
    # 用户位置和距离阈值（单位公里）
    user_lon, user_lat = map(float, user_location.split(','))

    # 首先根据距离进行过滤
    museum_data_df['geom_lon'], museum_data_df['geom_lat'] = zip(*museum_data_df['geometry'].str.split(',').apply(lambda x: (float(x[0]), float(x[1]))))
    museum_data_df['distance'] = museum_data_df.apply(lambda row: haversine(row['geom_lon'], row['geom_lat'], user_lon, user_lat), axis=1)
    filtered_museum_data_df = museum_data_df[museum_data_df['distance'] <= distance_threshold]

    
    # 数据预处理
    filtered_museum_data_df['title'] = filtered_museum_data_df['title'].fillna('').astype(str)
    filtered_museum_data_df['shortText'] = filtered_museum_data_df['shortText'].fillna('').astype(str)
    filtered_museum_data_df['combined_text'] = filtered_museum_data_df['title'] + " " + filtered_museum_data_df['shortText']
    filtered_museum_data_df['processed_description'] = filtered_museum_data_df['combined_text'].apply(preprocess_text)
    filtered_museum_data_df = filtered_museum_data_df.reset_index(drop=True)
    filtered_museum_data_df['processed_description'] = filtered_museum_data_df['combined_text'].apply(
        lambda x: GoogleTranslator(source='auto', target='en').translate(x)
    )

    # 向量化处理
    vectorizer = TfidfVectorizer()
    processed_texts = vectorizer.fit_transform(filtered_museum_data_df['processed_description'])
    hobby_description = preprocess_text(' '.join(user_hobbies))
    user_vector = vectorizer.transform([hobby_description])

    recommended = []
    # 遍历过滤后的DataFrame，并计算相似度
    for idx, row in filtered_museum_data_df.iterrows():
        similarity = cosine_similarity(user_vector, processed_texts[idx:idx+1])[0][0]
        if similarity > 0.1:
            recommended.append((similarity, row))

    # 根据相似度排序并返回前10个
    recommended.sort(reverse=True, key=lambda x: x[0])
    top_activities = [activity for _, activity in recommended[:10]]
    return top_activities



def recommend_activities_context_based(user_travel_styles, user_budget, activities):
    recommended = []
    travel_styles = " ".join(user_travel_styles)
    travel_styles_processed = preprocess_text(travel_styles)
    for idx, activity in activities.iterrows():
        if activity['price'] <= user_budget:
            activity_description = preprocess_text(activity['description'])
            similarity = cosine_similarity(vectorizer.transform([travel_styles_processed]), vectorizer.transform([activity_description]))[0][0]
            if similarity > 0.1:
                recommended.append((similarity, activity))
    recommended.sort(reverse=True, key=lambda x: x[0])
    top_activities = recommended[:10]  # 取相似度最高的前5个活动
    
    return [activity for _, activity in top_activities]

# 混合推荐活动
def recommend_activities_hybrid(user_data, activities):
    content_recommendations = recommend_activities_content_based(user_data['hobbies'], activities)
    context_recommendations = recommend_activities_context_based(user_data['travelStyles'], user_data['budget'], activities)
    
    # 结合两种推荐结果，去重并按相似度排序
    combined_recommendations = {activity['title']: activity for activity in content_recommendations + context_recommendations}
    return list(combined_recommendations.values())


location = "5.289311,46.284122"
distance_threshold = 50  # 100公里

top_museums = recommend_from_oa_data(user_data['hobbies'], museum_data_df, location, distance_threshold)
print(clean_result(top_museums))
