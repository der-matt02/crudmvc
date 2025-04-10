# 🧩 User Management CRUD App

A full-stack CRUD (Create, Read, Update, Delete) application built using modern web technologies. It allows the creation, viewing, updating, and deletion of user records through a clean and responsive UI.

## 📄 Description

This is a simple but complete MVC CRUD application for managing users, built as a full-stack project using **React + TypeScript** on the frontend and **FastAPI** on the backend. It demonstrates solid software architecture with a focus on clean code, type safety, and modularity.

### ✨ Features

- Full CRUD functionality (Create, Read, Update, Delete) for users  
- Frontend built with **React + Vite + TypeScript**  
- Backend built with **FastAPI + Pydantic + SQLAlchemy**  
- Uses **SQLite** as a lightweight and portable database  
- Project dependencies managed with **npm** and **miniconda**  
- Unit tests implemented with **Vitest**

## 📚 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Challenges and Improvements](#challenges-and-improvements)

## ⚙️ Installation

> Prerequisites:  
> - Node.js & npm  
> - Miniconda (Python 3.11+ environment recommended)  
> - Git

### 🔧 Backend Setup

1. Clone the repository:
git clone https://github.com/der-matt02/crudmvc.git
cd your-crud-project

2. Create a conda environment and activate it:
conda create -n usercrud python=3.11
conda activate usercrud

3. Install Python dependencies:
pip install -r backend/requirements.txt

4. Run the backend:
cd backend
uvicorn main:app --reload

### 🌐 Frontend Setup

1. Navigate to the frontend directory:
cd frontend

2. Install frontend dependencies:
npm install

3. Start the development server:
npm run dev

---

## 🧪 Usage

Once both servers are running:

- Visit http://localhost:5173 to access the frontend.
- API is available at http://localhost:8000.

You can:
- Create new users
- View user list
- Edit existing users
- Delete users

## 🛠 Technologies Used

**Frontend**  
- React  
- TypeScript  
- Vite  
- Vitest (for testing)

**Backend**  
- FastAPI  
- Pydantic  
- SQLAlchemy  
- SQLite

**Environment/Tooling**  
- npm  
- Miniconda  
- Git

## 🚧 Challenges and Improvements

### ✅ Challenges Faced

- Integrating CORS between FastAPI and React during development  
- Structuring the project to follow proper MVC separation  
- Type safety between backend and frontend models  

### 🌱 Future Improvements

- Add authentication and authorization  
- Implement pagination and filtering for the user list  
- Add Docker support for easier deployment
- Change to a Docker container with a MySQL database
- Switch to PostgreSQL or MySQL for production use  

