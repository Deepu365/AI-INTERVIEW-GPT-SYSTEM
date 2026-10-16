# AI Interview GPT 🎯

AI Interview GPT is an AI-powered interview preparation platform designed to help students and job seekers practice mock interviews, improve their answers, and build confidence for technical and HR interviews.

## 🚀 Features

- **AI Mock Interviews:** Practice interview questions with AI assistance.
- **Interview Reports:** Review interview performance and feedback.
- **Resume Support:** Features for working with resumes during interview preparation.
- **User Authentication:** Sign-up and account access.
- **Interactive Interface:** User-friendly frontend for interview practice.
- **Database Integration:** PostgreSQL support for storing application data.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js
- **Database:** PostgreSQL
- **Database ORM:** Drizzle ORM
- **Package Manager:** pnpm
- **Version Control:** Git and GitHub

## 📁 Project Structure

```text
AI-INTERVIEW-GPT/
├── artifacts/
│   ├── api-server/       # Backend API
│   └── interview-gpt/    # Frontend application
├── lib/
│   └── db/               # Database schema and configuration
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

## ⚙️ Prerequisites

Install the following before running the project:

- Node.js
- pnpm
- PostgreSQL
- Git

## 💻 Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Deepu365/AI-INTERVIEW-GPT.git
cd AI-INTERVIEW-GPT
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Configure the required environment variables in the appropriate `.env` files. Set your PostgreSQL connection string using `DATABASE_URL`.

Example:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/interviewdb
PORT=8080
```

Replace `YOUR_PASSWORD` with your local PostgreSQL password. Never commit real passwords or API keys to GitHub.

### 4. Start the backend

Open a terminal and run:

```bash
cd artifacts/api-server
```

In PowerShell, configure the environment variables:

```powershell
$env:DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/interviewdb"
$env:PORT="8080"
pnpm run start
```

### 5. Start the frontend

Open a second terminal:

```bash
cd artifacts/interview-gpt
npm run dev
```

Open the local URL displayed in the terminal.

> Note: Available scripts and required environment variables may vary depending on the project configuration.

## 🎯 Project Objective

The goal of AI Interview GPT is to make interview preparation more accessible through AI-assisted practice, structured feedback, and a convenient web interface.

## 🔮 Future Enhancements

- Real-time AI interview conversations
- Personalized feedback and performance analytics
- More technical and HR interview categories
- Resume-based question generation
- Interview progress tracking

## 👩‍💻 Author

**Deepika Pamoti**

GitHub: [@Deepu365](https://github.com/Deepu365)

## 📄 License

Add a suitable open-source license if you intend to distribute this project under one.
