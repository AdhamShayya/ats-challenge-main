# ats-challenge-main

## Project Overview
The ATS Challenge project is designed to help candidates prepare for interviews by generating personalized questions based on their CV and the job description. It also provides an AI-powered evaluation of the candidate's performance during a mock interview.


#### Question Generation
The AI prompt for question generation is designed to create actionable questions based on the job description and CV. The questions are categorized into technical, behavioral, and situational sections to cover all aspects of the interview.


#### Performance Evaluation
The AI prompt for performance evaluation is designed to provide a comprehensive assessment of the candidate's performance. It uses the transcript, job description, CV, and response timings to generate scores and a summary.


#### Parsing Process
in the CVService.ts it is checking if the doc is pdf it uses pdf-parse library to parse it to string, and if it is word then it uses mammoth to extract the raw text, else it uses file.buffer. 

## Setup Instructions
1. Clone the repository:
    cd ats-challenge-main
    npm install
    npm run dev

    cd ..
    cd ats-backend
    npm install
    npm run dev

2. Create a .env file in the ats-backend and add the following:
    OPENAI_API_KEY=your_openai_api_key 
    PORT=5000
    MONGO_URL=mongodb://adham:adham_1234@ac-ygyhzhd-shard-00-00.pnh1k7m.mongodb.net:27017,ac-ygyhzhd-shard-00-01.pnh1k7m.mongodb.net:27017,ac-ygyhzhd-shard-00-02.pnh1k7m.mongodb.net:27017/?replicaSet=atlas-119963-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0