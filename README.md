# 🤖 AI-Powered TPM Coach — Santanu Majumdar Resume

An interactive resume website with an AI-powered 1:1 TPM coaching assistant, built with Node.js + Express + Claude API.

## Features

- **AI Coach** — Real Claude-powered 1:1 TPM coaching (career, interviews, OKRs, salary)
- **AI Tools** — Analyze Job Fit, Ask the Resume, Cover Letter, Interview Simulator, ProgramPilot
- **Orbit Chatbot** — Resume Q&A assistant
- **Animated resume** — Full dark luxury design with particle background

## Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/YOUR_USERNAME/tpm-coach.git
cd tpm-coach
npm install
```

### 2. Set Environment Variables
```bash
cp .env.example .env
# Edit .env and add your Anthropic API key:
# ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Get your API key at: https://console.anthropic.com

### 3. Run
```bash
npm start
# or for development with auto-reload:
npm run dev
```

Open http://localhost:3000

---

## Deploy to Render (Free)

1. Push to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variable:** `ANTHROPIC_API_KEY` = your key
5. Deploy → copy your `.onrender.com` URL

## Deploy to Railway

```bash
npm install -g @railway/cli
railway login
railway init
railway up
railway variables set ANTHROPIC_API_KEY=sk-ant-your-key-here
```

## Deploy to Vercel (Serverless)

Add `vercel.json` (already included) and:
```bash
npm install -g vercel
vercel
# Set env var in Vercel dashboard: ANTHROPIC_API_KEY
```

---

## Project Structure

```
tpm-coach/
├── server.js          # Express backend + Anthropic proxy
├── package.json       
├── .env.example       # Copy to .env and add your API key
├── .gitignore         
├── vercel.json        # Vercel deployment config
├── README.md          
└── public/
    └── index.html     # Full resume + AI Coach frontend
```

## How the AI Coach Works

1. User clicks **🤖 AI Coach** in the nav
2. Sends message → `POST /api/coach` (your server)
3. Server adds the system prompt + calls Anthropic API securely
4. Returns Claude's response to the browser
5. API key stays server-side — never exposed to browser

---

Built by Santanu Majumdar · [topmate.io/santanumajumdar](https://topmate.io/santanumajumdar)
