import json
from openai import OpenAI

messages = [
    {"role": "system", "content": "You are a helpful data generated assistant that helps me with build json dataset of travel recommendation system!"},
]


existing_data = []
for i in range(7):
    messages.append({"role": "user", "content": "Please generate 150 pieces json dataset, search for sights and activities in Zürich with these 16 categories [Viewpoint, Museum ,City tour, Restaurant, Cafe, Leisure activity, Wellness, Cable car, Building and monument, Religious building, Waterfall, Coast and beach, Gorge, Glacier, Lake, Cave], the features needed for each activity are [ title String, description String, address String, website String, openingHours String, price Int, duration Int, reachablePublicTransport Bool, category], please try to search for real sights and events, sights and events within the 50km radius of the city can be added. Please help to generate a total of 150 pieces of json dataset by categories! For example, the number of restaurants, viewpoints, and Leisure activities is rightfully greater than cave. keep generate until 150 pieces data"})
    completion = client.chat.completions.create(model="gpt-4o", messages=messages)
    answer = completion.choices[0].message.content
    print('System:', answer)
    with open('/Users/jianing/Documents/Study/Recsys/Hands-On-Recommender-System/recommendations/Zürich_travel_data.txt', 'a', encoding='utf-8') as f:
        f.write(answer + '\n')
    
    messages.append({"role": "system", "content": answer})
    # user_input = input('User:')
    messages.append({"role": "user", "content": "continue, generate more items, keep generate until 150 pieces data and try to use real data and no repeat"})
    # messages.append({"role": "system", "content": answer})
