## 0. Prepare your environment and test data

#### Data

Create a data folder and save these csv files in flask_api.py:

destination_new_info.csv: [destination_new_info](https://drive.google.com/file/d/13THnVEEofrJTY2U-9Piaq41GgbRFayGg/view?usp=drive_link)

merged_data.csv: [merged_data](https://drive.google.com/file/d/1v9xC9gSwIkAMeEvhtYTh5xqEqCaAOTK8/view?usp=drive_link)



#### Environment

```
conda create --name recsys
conda activate recsys
conda install -c conda-forge scikit-surprise
conda install numpy pandas matplotlib scikit-learn plotly seaborn
```

Add the environment to jupyter notebook, then select the `recsys` kernel.

```
conda install ipykernel
python -m ipykernel install --user --name=recsys
```

## 1. Recommendation Algorithm

### 1.1 Content-Based Method

The Content-Based method is an information retrieval and recommendation technique based on content analysis. When processing English paragraphs, the core idea of the Content-Based method is to analyze the content features of the paragraphs by extracting and comparing keywords or phrases within the content to achieve information classification, retrieval, and recommendation.

#### Working Principle



1. **Text Representation**: First, transform the paragraphs into a processable text representation. Common methods include Bag of Words (BoW), Term Frequency-Inverse Document Frequency (TF-IDF), etc. here, we use word2vec:

- Word2Vec is a method proposed by Google to convert words into vectors. It embeds words into a high-dimensional vector space so that words with similar semantics are close to each other in the vector space, thereby capturing semantic relationships between words. In our Content-Based method, Word2Vec is utilized to calculate vector representations of words and paragraphs, enhancing the semantic understanding of the content.

2. **Feature Extraction**: Extract key features (keywords, phrases) from the paragraphs. This can be achieved through natural language processing (NLP) techniques such as part-of-speech tagging, named entity recognition, etc.

3. **Similarity Calculation**: Calculate the similarity between paragraphs using methods such as cosine similarity or Euclidean distance. The higher the similarity, the more similar the content of the paragraphs.

4. **Information Retrieval/Recommendation**: Rank or recommend relevant paragraphs to the user based on similarity.


### 1.2 Singular Value Decomposition (SVD)

SVD is a matrix factorization technique used in collaborative filtering to decompose the user-item interaction matrix into three matrices, which helps in capturing the latent factors representing users and items. By reducing the dimensionality, SVD can identify patterns and relationships within the data, even if the matrix is sparse.

**Example**: In a travel recommendation system, SVD can be used to decompose the user-destination rating matrix. This allows the system to identify hidden factors such as a user's preference for beach destinations or cultural sites. Based on these factors, the system can recommend destinations that align with the user's latent preferences, even if the user has not previously interacted with those destinations.

### 1.3 K-Nearest Neighbors (KNN)

KNN is a simple, instance-based learning algorithm that can be used for both classification and regression tasks. In the context of collaborative filtering, KNN can be used to identify the closest users or items based on a similarity metric (such as cosine similarity or Euclidean distance).

**Example**: In a travel recommendation system, KNN can be used to find users who have similar travel preferences. If a target user likes hiking and historical tours, KNN can identify other users with similar interests and recommend destinations or activities that these similar users have rated highly, such as hiking trails in national parks or historical city tours.

### 1.4 Two-Tower Model

The Two-Tower Model is an advanced recommendation system architecture designed to handle large-scale data and capture complex interactions between users and items. It uses two separate neural networks (towers) to process user and item data, respectively, and then combines the outputs to generate recommendations.

#### Advantages

- Effectively captures user-item interactions and can handle large datasets.
- Flexible and scalable, suitable for various types of recommendation tasks.

#### Disadvantages

- Requires a significant amount of data to train effectively.
- Computationally intensive, both in terms of training and inference.

Due to insufficient data, the Two-Tower Model approach has been abandoned for this project. The lack of sufficient user-item interaction data makes it impractical to train a reliable model. Therefore, alternative methods such as Content-Based and Word2Vec have been prioritized.


## 2. City Recommendation

we recommends city based on users' past behavior and preferences. 

### 2.1 Features

**User Information:**

- **Age (age):** `User.age`
- **Gender (gender):** `User.gender`
- **Occupation (occupation):** `User.occupation`
- **Hobby (hobbies):** `User.hobbies`

**Historical Travel Records:**

- **Travel Destination (destination):** `PreviousTrip.destination`
- **Travel Keywords (keywords):** `KeywordsOfPreviousTrip.keyword`
- **Travel Ratings (rating):** `PreviousTrip.rating`




## 2. Activity Recommendation

we use content-based approaches, it require a great deal of information about the characteristics of the project itself, rather than using user information and feedback.


### 3.1 Features

#### User Features


#### Destination Features

**Basic Information:**

- **Destination Name (destination):** `Destination.destination`

**Keywords:**

- **Destination Keywords (keywords):** `KeywordsOfDestination.keyword`

#### Activity Features

**Basic Information:**

- **Activity Location (location):** `Activity.location`
- **Activity Cost (cost):** `Activity.cost`
- **Opening Hours (openingHours):** `Activity.openingHours`
- **Reachable with Public Transport (reachableWithPublicTransport):** `Activity.reachableWithPublicTransport`
- **Activity Ratings (rating):** `Activity.rating`

**Geographic Coordinates:**

- **Longitude (longitudeCoordinates):** `Activity.longitudeCoordinates`
- **Latitude (latitudeCoordinates):** `Activity.latitudeCoordinates`


