
#### AI in Consumer Experiences: Personalized, Transparent, and Delightful Interactions

##  Introduction
In today’s campus life, retail, media, and travel services, users face overwhelming choices. Recommendations are often generic, opaque, or fail to consider individual budgets and preferences, resulting in low engagement and trust. At the same time, campus clubs, teams, and creators struggle to produce consistent, high-quality content for events, campaigns, or services.
AI in Consumer Experiences aims to solve these challenges by providing personalized, explainable, and budget-aware AI tools for users, while enabling creators to deliver high-quality content efficiently.


##  Problem Statement
Consumers and students often face generic, confusing, or opaque experiences in retail, media, travel, and campus services. Systems rarely explain recommendations, consider personal budgets, or adapt to individual preferences, making decision-making harder and less trustworthy. There is a need for AI-powered, transparent, and personalized tools that help users make informed choices, plan efficiently, and engage meaningfully while supporting creators in producing consistent, relevant content.

## Objectives
Deliver personalized recommendations for campus services, events, travel, and content.
Enable explainable AI with “Why this?” reasoning for trust.
Incorporate budget and preference constraints for smarter decisions.
Assist creators, clubs, and teams with AI-assisted content creation.
Prevent filter bubbles and promote discovery and engagement.

## Proposed Solution
The proposed solution is a multi-functional AI platform with the following features:

#  Explainable Recommenders
Suggest canteens, events, media, or services with reasoning for each recommendation.

Users see why a choice is suggested, improving trust and engagement.

# Conversational Assistants

Chat-based AI agents to help with booking, shopping, or planning.

Incorporates budgets, time constraints, and personal preferences.

# Smart Travel & Campus Planners

Optimizes schedules for campus events, travel, and daily activities.

Balances time, cost, accessibility, and interests.


# Creator Tools
AI-assisted content creation for clubs, teams, and campus events.

Ensures on-brand, high-quality media production with minimal effort.

#  Feedback Loops

Collects user feedback to improve recommendations.

Encourages content discovery and avoids over-personalization or filter bubbles.

#  System Architecture

The system consists of three main layers:

User Layer: Students, campus users, or consumers interact via web or mobile app.

Application Layer: Handles recommendations, planning, content tools, and feedback management.

AI Engine Layer: Contains ML models for recommendations, NLP for chat, generative AI for content, and privacy & ethics modules.

Diagram:
<img width="802" height="675" alt="image" src="https://github.com/user-attachments/assets/843e69a5-b49a-48b2-9958-803e4ebb5d2b" />



  

# Unique Selling Proposition (USP)
Explainable AI: Recommendations show reasoning (“Why this?”).

Budget-Aware & Personalized: Suggestions tailored to preferences and constraints.

All-in-One Platform: Combines planning, recommendations, and content creation.

Discovery & Feedback: Prevents filter bubbles, encourages exploration.

Creator Tools: Enables clubs/teams to produce high-quality content efficiently.


#  Use Case Diagram
<img width="1178" height="479" alt="image" src="https://github.com/user-attachments/assets/25c0ac23-1f5d-45d8-8c86-f79f9dec407b" />

                
#  Sequence Diagram
<img width="729" height="720" alt="image" src="https://github.com/user-attachments/assets/366d47b9-f67f-403d-b77a-adeff07d1e3f" />


#  Benefits
Stakeholder
Benefits
Students / Users
Personalized recommendations, explainable suggestions, optimized planning, better decision-making.
Clubs / Teams / Creators
AI-assisted media creation, consistent branding, efficient content production, higher engagement.
Campus Administrators
Increased participation in events, better feedback, improved student satisfaction.
Service Providers (canteens, travel services)
Insights into preferences, higher engagement, targeted recommendations.


#  Expected Outcomes
Users make informed, enjoyable decisions quickly.

Increased engagement in campus events, services, and media.

Clubs and teams produce high-quality content efficiently.\

Ethical AI usage ensures trust, fairness, and transparency.


🛠️ Installation & Setup
Follow these steps to set up the environment and run the AI in Consumer Experiences platform.

1. Prerequisites
Ensure you have the following installed:

Node.js (v16 or higher)

MySQL (for the database)

npm (comes with Node.js)

2. Clone the Repository
```
git clone https://github.com/Gouthamvaishnav11/AMD-HACKTHON.git
cd AMD-HACKTHON
```
3. Backend Configuration
Navigate to the server directory and install the necessary dependencies for the API and database management.
```
cd server
npm init -y
npm install express cors body-parser jsonwebtoken bcryptjs sequelize mysql2 dotenv

```
Note: Create a .env file in the server folder and add your database credentials (DB_HOST, DB_USER, DB_PASSWORD).

🚀 Running the Application
To run the full-stack application, you will need to open two separate terminals.

Terminal 1: Backend (Server)
This handles the AI engine logic, recommendations, and database connections.

```
cd server
node index.js
```

Terminal 2: Frontend (Client)
This launches the user interface where students and creators interact with the platform.

Bash
# Navigate to the root or frontend folder
```
npm run dev
```

# Conclusion
AI in Consumer Experiences bridges the gap between students seeking personalized, trustworthy guidance and creators aiming to deliver high-quality content. By combining explainable recommendations, conversational planning, smart scheduling, and AI-assisted content creation, this platform creates delightful, efficient, and ethical consumer experiences across campus life, retail, media, and travel.
