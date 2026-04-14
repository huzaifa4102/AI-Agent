# 🤖 AI Agent — DS Technologies Pvt. Limited

> An intelligent AI-powered sales and client management agent that communicates with clients over **WhatsApp** and **Slack**, handles queries, creates tasks in **Trello**, saves data to **MongoDB**, and sends automated emails — all built with the **MERN Stack**.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [How It Works](#how-it-works)
- [API Endpoints](#api-endpoints)
- [Dashboard](#dashboard)
- [Integrations](#integrations)

---

## 📖 Overview

The **DS Technologies AI Agent** is a fully automated client communication system. It acts as a senior sales consultant that talks to clients over WhatsApp and Slack, answers queries about company services, negotiates pricing, collects client details, and automatically triggers a full lead management pipeline — creating Trello tasks, saving to MongoDB, and sending professional emails to both the client and the company.

---

## ✨ Features

- 💬 **WhatsApp Integration** — Receive and reply to client messages via Twilio Sandbox
- 🟣 **Slack Integration** — AI bot works in direct messages and channel mentions
- 🤖 **AI Brain (Groq + Llama 3.3 70B)** — Fast, free, and intelligent responses
- 🧠 **Conversation Memory** — Remembers full chat history per client
- 🎯 **Smart Lead Detection** — Detects when a client confirms interest automatically
- 📋 **Trello Integration** — Auto-creates task cards when a lead is confirmed
- 📧 **Dual Email System** — Sends professional confirmation email to client + lead alert to company
- 🗄️ **MongoDB Database** — Saves all clients, projects, and conversations
- 📊 **React Dashboard** — View all clients, projects, and stats in real time
- 🔄 **Project Status Updates** — Update project status directly from the dashboard
- 💰 **Sales Negotiation** — AI handles pricing objections and offers discounts
- 🔐 **Secure** — All API keys stored in environment variables

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| AI Model | Groq API — Llama 3.3 70B (Free) |
| WhatsApp | Twilio Sandbox |
| Slack | Slack Bolt SDK + Socket Mode |
| Task Management | Trello API |
| Email | Nodemailer + Gmail SMTP |
| Tunnel | ngrok (for local development) |

---

## 📁 Project Structure

```
ai-agent/
│
├── backend/
│   ├── server.js                    # Entry point
│   ├── .env                         # Environment variables (not in GitHub)
│   ├── package.json
│   │
│   ├── routes/
│   │   ├── agent.route.js           # Chat API routes
│   │   ├── whatsapp.route.js        # Twilio webhook route
│   │   └── dashboard.route.js       # Dashboard API routes
│   │
│   ├── controllers/
│   │   ├── agent.controller.js      # Chat controller
│   │   ├── whatsapp.controller.js   # WhatsApp message handler
│   │   └── dashboard.controller.js  # Dashboard data controller
│   │
│   ├── services/
│   │   ├── agent.service.js         # AI brain — Groq + intent detection
│   │   ├── groq.service.js          # Groq API calls
│   │   ├── whatsapp.service.js      # Twilio send message
│   │   ├── slack.service.js         # Slack app instance
│   │   ├── slack.listener.js        # Slack event listeners
│   │   ├── trello.service.js        # Trello card creation
│   │   ├── email.service.js         # Nodemailer email sending
│   │   └── history.service.js       # Shared conversation history
│   │
│   └── models/
│       ├── Client.js                # MongoDB client schema
│       ├── Project.js               # MongoDB project schema
│       └── Conversation.js          # MongoDB conversation schema
│
└── frontend/
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── pages/
        │   └── Dashboard.jsx        # Main dashboard page
        └── components/
            ├── ChatWindow.jsx       # Chat UI component
            └── MessageBubble.jsx    # Message bubble component
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:

- Node.js v18 or above
- npm
- Git
- ngrok (for WhatsApp webhook in development)

### Step 1 — Clone the Repository

```bash
git clone https://github.com/huzaifa4102/AI-Agent.git
cd AI-Agent
```

### Step 2 — Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3 — Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Step 4 — Set Up Environment Variables

Create a `.env` file inside the `backend/` folder and add all required keys (see [Environment Variables](#environment-variables) section below).

### Step 5 — Run the Project

You need **3 terminals** running at the same time:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 3 — ngrok (for WhatsApp):**
```bash
cd path/to/ngrok
.\ngrok.exe http 5000
```

Then paste the ngrok URL in your Twilio Sandbox settings:
```
https://your-ngrok-url.ngrok-free.app/api/whatsapp/webhook
```
---

## ⚙️ How It Works

### Client Sends a WhatsApp or Slack Message

```
Client messages → Twilio/Slack → Your Express backend → Groq AI → Reply sent back
```

### Full Lead Confirmation Flow

```
1. Client chats with AI agent
2. AI gives quote, handles objections, negotiates
3. Client agrees to proceed
4. AI asks for name, email and phone number
5. AI detects confirmation → triggers pipeline:
   ├── Saves client to MongoDB
   ├── Saves project to MongoDB
   ├── Creates Trello card in New Leads list
   ├── Sends confirmation email to client
   └── Sends lead alert email to company
6. Dashboard updates automatically
```

---

## 📡 API Endpoints

### Agent
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/agent/chat` | Send message to AI agent |

### WhatsApp
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/whatsapp/webhook` | Twilio webhook for incoming messages |

### Dashboard
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/dashboard/stats` | Get total clients, projects, leads |
| GET | `/api/dashboard/clients` | Get all clients |
| GET | `/api/dashboard/projects` | Get all projects |
| PATCH | `/api/dashboard/projects/:id` | Update project status |

---

## 📊 Dashboard

The React dashboard is available at `http://localhost:5173` and includes:

- **Overview Tab** — Stats cards showing total clients, new leads, active and completed projects
- **Clients Tab** — Full table of all clients with name, email, channel, status and date
- **Projects Tab** — All projects with live status update dropdown (New → In Progress → Completed)

---

## 🔗 Integrations

### WhatsApp via Twilio
- Sign up free at twilio.com
- Use the WhatsApp Sandbox for testing
- Join sandbox by sending `join ten-second` to `+14155238886`
- Sandbox membership lasts 72 hours — rejoin anytime

### Slack via Bolt SDK
- Create app at api.slack.com/apps
- Enable Socket Mode — no public URL needed
- Add slash commands `/newchat` and `/history`
- Bot responds to direct messages and @mentions

### Trello
- Get API key from trello.com/power-ups/admin
- Get token from the authorization URL
- Get List ID from your board's API endpoint

### MongoDB Atlas
- Free M0 cluster at mongodb.com/atlas
- Allow access from anywhere in Network Access
- Use mobile hotspot if office network blocks port 27017

### Groq AI
- Free API at console.groq.com
- Uses Llama 3.3 70B model
- No credit card required

---

## 👨‍💻 Author

**Ali Huzaifa Ibrar**
DS Technologies Pvt. Limited

---

## 📄 License

This project is private and built for internal use at DS Technologies Pvt. Limited.
