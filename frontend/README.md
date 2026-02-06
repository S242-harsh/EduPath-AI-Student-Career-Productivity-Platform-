📘 EduPath AI – Student Career & Productivity Platform

EduPath AI is a modern React-based student productivity and career guidance platform.
It helps students plan daily tasks, track progress, explore career paths after 12th, and build discipline using smart tools like Todo lists, Pomodoro focus, reports, and career roadmaps.

✨ Features
🧭 Career Guidance

Arts / Humanities career guide

Commerce career guide

Science (PCM / PCB) career guide

Law / Defence / Government career guide

All Streams (Any 12th) career options

Visual career roadmap cards

🧠 Productivity Tools

Daily Todo List (add / edit / delete / filter)

Task completion tracking

Focus Timer (Pomodoro-based)

Progress percentage & streak

Daily Productivity Report (Export PDF + Share)

👤 User System

Landing Page

Login / Sign Up (UI-based, backend-ready)

Profile management (name, city, age, career goal, interests)

Persistent data using localStorage

🎨 UI / UX

Tailwind CSS based modern dark UI

Sidebar + Header layout

Smooth animations

Mobile-friendly design

Single-page app without React Router (custom view system)

🛠 Tech Stack

Frontend: React (CRA)

Styling: Tailwind CSS

Icons: lucide-react

State Management: React Hooks (useState, useReducer, useMemo)

Persistence: localStorage

Testing: React Testing Library + Jest

Build Tool: react-scripts

📂 Project Structure
edupath-ai/
│
├── public/
│   ├── index.html
│   └── manifest.json
│
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── views/
│   │   ├── LandingPage.jsx
│   │   ├── Auth.jsx
│   │   ├── Dashboard.jsx
│   │   ├── TodoList.jsx
│   │   ├── Progress.jsx
│   │   ├── Report.jsx
│   │   ├── Profile.jsx
│   │   ├── CareerRoadmap.jsx
│   │   ├── CareerStreamCards.jsx
│   │   ├── ArtsDetails.jsx
│   │   ├── CommerceDetails.jsx
│   │   ├── ScienceDetails.jsx
│   │   ├── LawDetails.jsx
│   │   └── AllStreamsDetails.jsx
│   │
│   ├── constants/
│   │   └── index.js
│   │
│   ├── App.js
│   ├── index.js
│   ├── index.css
│   ├── App.test.js
│   ├── setupTests.js
│   └── reportWebVitals.js
│
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── .gitignore
└── README.md

🚀 Getting Started
1️⃣ Clone the repository
git clone https://github.com/your-username/edupath-ai.git
cd edupath-ai

2️⃣ Install dependencies
npm install

3️⃣ Start development server
npm start


App will run on
👉 http://localhost:3000

🧪 Running Tests
npm test

🏗 Build for Production
npm run build

🧠 Application Flow

Landing Page → Get Started

Auth (Login / Signup)

Dashboard

Tasks

Focus Timer

Progress

Career Roadmap

Choose stream

Explore detailed career guides

Profile

Set career goal & interests

Report

Daily productivity summary

Export / Share

🔐 Data Storage

User profile → localStorage

Tasks & progress → localStorage

App state auto-restores on refresh

📈 Future Enhancements

Backend integration (Node.js / Firebase)

AI-based career recommendations

Authentication with JWT / OAuth

Cloud sync

Mobile app (React Native)

Admin panel

👨‍💻 Author

Shani Kumar Payasi
B.Tech CSE | Full-Stack Developer (Aspirant)
📍 India

📄 License

This project is for learning & portfolio purposes.
You are free to modify and extend it.