# 👥 User Management App

## 📖 Project Description
This is a full-stack User Management web application with secure user authentication and full CRUD (Create, Read, Update, Delete) operations on user profiles. Built with a React + TypeScript + Vite frontend and a FastAPI + SQLAlchemy + Pydantic backend, the project follows MVC architecture and uses SQLite as the database.

## ✨ Features
- 🔐 Secure login (JWT authentication, bcrypt hashing)
- 📋 User CRUD operations
- 🎨 Responsive UI with React, TypeScript, and Vite
- ⚡ RESTful API built with FastAPI and automatic documentation
- 🗄️ SQLite database with SQLAlchemy ORM
- ♻️ MVC architecture in frontend and backend

## 📑 Table of Contents
- [Project Description](#project-description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Frontend-Backend Integration](#frontend-backend-integration)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Challenges and Future Improvements](#challenges-and-future-improvements)

## 💻 Technologies Used

### 🖥️ Frontend
- React
- TypeScript
- Vite
- Axios
- React Router

### ⚙️ Backend
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn
- Passlib (bcrypt)
- JWT tokens (PyJWT)

### 🗄️ Database
- SQLite (`usuarios.db`)

### 🔧 Tooling
- Node.js & npm
- Miniconda
- PyCharm Ultimate
- Git

## 🔗 Frontend-Backend Integration
- Axios for API calls (React → FastAPI)
- JWT authentication with secure endpoints
- React Router protected routes
- FastAPI configured for CORS

## 🛠️ Installation

### 🐍 Backend Setup
Clone repository and navigate to backend:
```bash
git clone your_repo_url
cd backend
```
Create and activate environment:
```bash
conda create -n usermgr-env python=3.10
conda activate usermgr-env
```
Install backend dependencies:
```bash
pip install fastapi uvicorn sqlalchemy pydantic passlib[bcrypt] PyJWT
```
Run backend server:
```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```
### ⚛️ Frontend Setup
Navigate to frontend and install dependencies:
cd frontend
npm install

Run frontend server:
npm run dev

## ▶️ Usage
- Frontend: http://localhost:5173
- Backend API Docs (Swagger): http://localhost:8000/docs
- Manage users after logging in (create initial user via API or UI).

## ✅ Testing
- Perform manual testing via the user interface and API documentation.
- Consider adding automated tests (pytest for backend endpoints, Vitest or Cypress for frontend integration).

## 🚀 Deployment

### Frontend
Build static files for production:
npm run build

Deploy via static file hosting services or integrate with backend deployment.

### Backend
Run the application in production with Gunicorn and Uvicorn:
pip install gunicorn uvicorn[standard]
gunicorn app:app -w 4 -k uvicorn.workers.UvicornWorker

Deploy to cloud services like Heroku, AWS, Azure, or containerize with Docker for easier management.

## 🔑 Environment Variables
- SECRET_KEY: JWT secret key (ensure secure storage for production).
- SQLALCHEMY_DATABASE_URL: Database connection URL configuration (SQLite is default).
- VITE_API_URL: Frontend variable to configure the API URL.
- PORT: Optional configuration of server port.

## 🔮 Challenges and Future Improvements
- Improved security measures (refresh tokens, use of HttpOnly cookies).
- Addition of user roles and permissions for more granular access control.
- Enhanced UI/UX with responsive designs and user-friendly interfaces.
- Comprehensive automated testing coverage for backend and frontend.
- Improved error handling and clearer user feedback mechanisms.
- Continuous Integration and Continuous Deployment (CI/CD) pipeline.
- Docker containerization for consistent deployment environments.
- Database upgrade from SQLite to PostgreSQL or MySQL for better scalability in production.
