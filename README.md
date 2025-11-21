# Collaborative Text Editor with AI Assistant

## 📋 Project Overview
This project is a full-stack web application that delivers a **Google Docs-like collaborative editing experience** enhanced with **AI-powered writing assistance**. It allows multiple users to edit documents simultaneously in real-time, see each other's cursors, and leverage Google Gemini AI for grammar checking, summarization, and text completion.

The application is built to demonstrate modern web development practices, including real-time communication via WebSockets, secure authentication, and integration with Large Language Models (LLMs).

## 🚀 Key Features

### ✍️ Real-time Collaboration
- **Multi-user Editing**: Multiple users can edit the same document at the same time without conflicts.
- **Live Cursors**: See exactly where other users are typing in real-time.
- **Instant Sync**: Changes are propagated instantly to all connected clients using Socket.io.

### 🤖 AI Writing Assistant (Powered by Google Gemini)
- **Grammar & Style Check**: Get instant feedback on your writing mechanics.
- **Content Summarization**: Generate concise summaries of your documents.
- **Smart Auto-completion**: Let AI finish your sentences or generate new content ideas.
- **Text Enhancement**: Improve clarity and tone with a single click.

### 🛡️ Security & Management
- **Secure Authentication**: JWT-based signup and login system.
- **Document Management**: Create, rename, and manage your personal library of documents.
- **Role-Based Access**: Secure backend API ensuring users can only access documents they are authorized for.

## 🛠️ Tech Stack
- **Frontend**: React.js, Vite, TailwindCSS, Quill.js (Rich Text Editor)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Real-time**: Socket.io
- **AI**: Google Gemini API (Generative AI)

## Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas)
- Google Gemini API Key

## Quick Start (Local Development)

### 1. Setup Backend
1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file based on `.env.example`:
    ```bash
    cp .env.example .env
    ```
4.  Update `.env` with your **Google Gemini API Key** and **MongoDB URI**.
5.  Start the server:
    ```bash
    npm run dev
    ```
    The server will run on `http://localhost:5000`.

### 2. Setup Frontend
1.  Open a new terminal and navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open `http://localhost:5173` (or the port shown in terminal) in your browser.



## Deployment
See [DEPLOYMENT.md](./DEPLOYMENT.md) for instructions on deploying to AWS EC2.
