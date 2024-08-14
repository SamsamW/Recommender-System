# Hands-On-Recommender-System

### Introduction

Welcome to the Personalized Travel Recommendation System! 
Our platform is designed to help users discover their dream travel 
destinations and activities by leveraging their unique interests 
and preferences. Whether you are an adventurer seeking thrilling 
experiences, a culture enthusiast eager to explore historical 
landmarks, or someone looking for a relaxing getaway, our system 
is tailored to provide personalized recommendations that suit your 
travel desires.

### Key Features
1. Travel Companion Search: Find travel companions who share similar interests and preferences to make your journey more enjoyable and memorable.
2. Personalized Recommendations: Receive customized travel destination and activity suggestions based on your individual profile and preferences.
3. Group Travel Planning: Create and optimize group travel plans by considering the collective interests and needs of all members.
4. User Profiles: Maintain detailed user profiles that capture travel interests, preferences, past travel experiences, and demographic information to enhance recommendation accuracy.

Our recommendation system utilizes content-based and collaborative 
filtering algorithms to match users with the most relevant travel 
options. By analyzing user behavior and preferences, we ensure that 
each recommendation is tailored to provide a unique and satisfying 
travel experience.

### Requirements ✔️

#### Functional Requirements
- User Profiles:
  - Allow users to create profiles (Sign-Up)
  - Allow users to change their profile information
  - Allow users to add and rate previous trips
  - Login and Logout

- Recommendation Engine:
  - Allow users to create groups and invite friends to join
  - Allow group members to fill out a questionnaire about their travel interests
  - Recommend personalized travel destinations and activities based on user profiles ans questionnaires
  
- Travel Companion Matching:
  - Allow users to make a search request for travel companions based on travel interests and
  preferences
  - Match the users and create and recommend a shared trip


  #### Non-Functional Requirements
  - Performance:
    - Provide recommendations and search results within a reasonable timeframe
    - Be scalable to accommodate a growing user base
  - Security:
    - Protect user privacy (Log In)
    - Implement secure communication protocols for user interactions
  - Usability:
    - User-friendly and intuitive for all users



### Ideas for the future
- Include more APIs for a bigger variety of activities and destinations
- Provide a chat function for trip members to communicate with eachother
- Create exploration pages for destinations and activities
- Roadtrip feature


## How to test the application by yourself


To build the application in development mode, you need following programs installed on your machine:
* [Node.js](https://nodejs.org/en/)
* [yarn v4](https://yarnpkg.com/getting-started/install)

First, please set all necessary environment variables in the `.env` file. You can use the `.env.example` file as a template.

Then you need to connect to a database (for example for postgres you can use [docker](https://hub.docker.com/_/postgres))

After that run the following commands:

```bash
yarn install
prisma generate
prisma db push
```

To start the next server finally run:

```bash
yarn run dev
```

For the recommender specific README go to /recommendations