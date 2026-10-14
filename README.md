# JobFit AI

> An AI interview coach. Upload your resume, paste a job description, and get a personalized interview prep report plus a resume tailored to that job, generated with Google Gemini.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Gemini](https://img.shields.io/badge/Google-Gemini-4285F4?logo=google&logoColor=white)

---

## ✨ Features

- **Resume + JD analysis**: upload your resume (PDF, up to 3 MB), add a short self-description, and paste the job description.
- **Match score**: a 0–100 score showing how well your profile fits the role.
- **Likely technical questions**, each with the interviewer's intent and how to answer it.
- **Behavioral questions**, with the same intent-and-approach breakdown.
- **Skill gap detection**: missing skills, each rated low, medium or high.
- **Day-by-day preparation plan** with a focus area and tasks for each day.
- **Tailored resume PDF**: an ATS-friendly, 1–2 page resume rewritten for the target job and rendered to PDF with Puppeteer.
- **Authentication**: register/login with JWT in HTTP-only cookies, plus a token blacklist on logout.
- **Report history**: every report you generate is saved to your account.

## 🛠 Tech Stack

| Layer    | Tech |
|----------|------|
| Frontend | React 19, Vite, React Router 7, Axios, SCSS |
| Backend  | Node.js, Express 5, Multer, pdf-parse, Puppeteer |
| AI       | Google Gemini (`@google/genai`) with Zod-validated structured JSON output |
| Database | MongoDB + Mongoose |
| Auth     | JWT, bcryptjs, cookie-parser |

## 📁 Project Structure

```
.
├── Backend/
│   ├── server.js                 # Entry point (port 3000)
│   └── src/
│       ├── app.js                # Express app, CORS, routes
│       ├── config/database.js    # MongoDB connection
│       ├── controllers/          # auth + interview controllers
│       ├── middlewares/          # JWT auth, file upload (multer)
│       ├── models/               # User, InterviewReport, Blacklist
│       ├── routes/               # /api/auth, /api/interview
│       └── services/ai.service.js# Gemini prompts + PDF generation
└── Frontend/
    └── src/
        ├── features/auth/        # Login, Register, auth context
        └── features/interview/   # Home (input form), Interview (report view)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/jobfit-ai.git
cd jobfit-ai
```

### 2. Backend

```bash
cd Backend
npm install
cp .env.example .env   # then fill in your values
npm run dev
```

The API runs at `http://localhost:3000`.

### 3. Frontend

```bash
cd Frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## 🔐 Environment Variables (`Backend/.env`)

| Variable               | Description |
|------------------------|-------------|
| `MONGO_URI`            | MongoDB connection string |
| `JWT_SECRET`           | Any long random string, used to sign JWTs |
| `GOOGLE_GENAI_API_KEY` | Your Google Gemini API key |

## 📡 API Reference

### Auth: `/api/auth`

| Method | Endpoint    | Access  | Description |
|--------|-------------|---------|-------------|
| POST   | `/register` | Public  | Register a new user |
| POST   | `/login`    | Public  | Log in with email and password |
| GET    | `/logout`   | Public  | Clear the cookie and blacklist the token |
| GET    | `/get-me`   | Private | Get the current user |

### Interview: `/api/interview`

| Method | Endpoint                           | Access  | Description |
|--------|------------------------------------|---------|-------------|
| POST   | `/`                                | Private | Generate a report (multipart: `resume`, `jobDescription`, `selfDescription`) |
| GET    | `/`                                | Private | List all of the user's reports |
| GET    | `/report/:interviewId`             | Private | Get one report |
| POST   | `/resume/pdf/:interviewReportId`   | Private | Download a tailored resume as a PDF |

## 🗺 Roadmap

- [ ] Move the API base URL and CORS origin into environment variables for deployment
- [ ] Add a mock-interview mode with live AI follow-up questions
- [ ] Track progress through the preparation plan
- [ ] Deploy (Vercel for the frontend + Render/Railway for the backend)
