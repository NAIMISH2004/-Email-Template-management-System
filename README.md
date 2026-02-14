Company Email Template Manager
  A full-stack MERN application that allows users to create, manage, preview, and store email templates with dynamic placeholders like {{name}}, {{email}}, and {{company}}.

Tech Stack
1. Frontend
    1. React (Vite)
    2. Axios

2. Backend
    1. Node.js
    2. Express.js
    3. MongoDB
    4. Mongoose
    5. dotenv
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   ├── controller/
│   │   └── templateController.js
│   ├── models/
│   │   └── Template.js
│   ├── routes/
│   │   └── templates.js
│   ├── server.js
│   └── app.js
│
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TemplateForm.jsx
    │   │   └── Preview.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   └── main.jsx

Features
1. Create Email Templates
2. Use Dynamic Placeholders:
{{name}}
{{email}}
{{company}}
3. Preview Template Before Saving
4. Store Templates in MongoDB
5. REST API for Template CRUD operations
6. Clean UI using React

Installation & Setup
1. Clone the Repository
2. Backend Setup
   1. cd backend
   2. npm install
   3. Setup Environment Variables
      PORT=8000
      MONGO_URI=your_mongodb_connection_string
   4. Start Server
      node server.js
3. Backend Setup
   1. cd Frontend
   2. npm install
   3. npm run dev
