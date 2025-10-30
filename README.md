# 🏋️‍♂️ ExerLytix – AI-Powered Fitness Analytics Platform

ExerLytix is a full-stack fitness analytics web application that automatically tracks user exercises, calculates calories, and visualizes real-time workout insights.  
The system removes manual data entry by capturing real exercise data and presenting meaningful analytics through an interactive dashboard.

---

## 🚀 Key Features
- JWT-based user authentication
- Automatic exercise tracking using webcam (Computer Vision)
- Real-time reps & calorie calculation
- Interactive dashboard with charts & analytics
- Daily & historical workout tracking
- BMI calculator
- AI-assisted meal planner
- MySQL-based persistent storage
- Optimized backend with batching & in-memory accumulation

---

## 🖼️ Screenshots

### Home Screen
<img width="1920" height="1080" alt="Screenshot (751)" src="https://github.com/user-attachments/assets/67dc688d-9808-44a0-b5e0-76e44a875a9b" />

### Login & Registration
<img width="1920" height="1080" alt="Screenshot (754)" src="https://github.com/user-attachments/assets/06dc05fd-1636-4ec2-ab9c-9a10a9c1540e" />

<img width="1920" height="1080" alt="Screenshot (760)" src="https://github.com/user-attachments/assets/b371d4a7-f137-4b3c-b8d3-a61279df547c" />

<img width="1920" height="1080" alt="Screenshot (756)" src="https://github.com/user-attachments/assets/5b11b600-4d35-410d-bdc4-14fd0764be78" />

<img width="1920" height="1080" alt="Screenshot (758)" src="https://github.com/user-attachments/assets/ebbda52e-147a-4170-add2-b36ee5f14b7a" />



### Main Dashboard (Live Calories & Reps)
<img width="1920" height="1080" alt="Screenshot (763)" src="https://github.com/user-attachments/assets/09a0bffd-9fab-495c-bd26-fc5386ce578a" />

### Exercise Reps Counter Model Screen
<!-- SCREENSHOT HERE -->

### Charts & Analytics
<img width="1920" height="1080" alt="Screenshot (764)" src="https://github.com/user-attachments/assets/66a9139a-4db5-445c-9b25-d1cc795d3d96" />

<img width="1920" height="1080" alt="Screenshot (765)" src="https://github.com/user-attachments/assets/7efbb9c8-73f5-46d2-944d-0baf4d0cdb4d" />


### BMI & Meal Planner

<img width="1920" height="1080" alt="Screenshot (767)" src="https://github.com/user-attachments/assets/27a7230d-e254-4bd1-81da-12e8db6fe2d7" />

<img width="1920" height="1080" alt="Screenshot (768)" src="https://github.com/user-attachments/assets/2cdb7ba4-5754-4006-876b-94f812546189" />

<img width="1920" height="1080" alt="Screenshot (769)" src="https://github.com/user-attachments/assets/09b75511-66cf-4885-b937-b65153ce9327" />

---

## 🏗️ System Architecture

The project is divided into three main components:

### Frontend (React.js)
- User interface
- Live counters & charts
- Form handling & validations

### Backend (Spring Boot + MySQL)
- Authentication & authorization (JWT)
- REST APIs
- Database operations
- Analytics & aggregation logic

### Exercise Engine (Python + MediaPipe)
- Webcam access
- Pose detection
- Repetition counting
- Calorie estimation

All components communicate via REST APIs.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- Tailwind CSS
- Axios
- React Router
- Recharts
- React Hook Form
- React Icons

### Backend
- Java 21
- Spring Boot
- Spring Security + JWT
- Spring Data JPA
- MySQL
- Maven

### Python / AI
- Python
- OpenCV
- MediaPipe
- NumPy
- Pandas
- Flask
- Flask-CORS

---

## Project Structure
ExerLytix/
├── frontend/
├── backend/
├── python-server/
└── README.md


---

## ⚙️ Project Setup

### Clone the Repository
```bash
git clone https://github.com/imtiyazahamad703/exerlytix-ai-personal-trainer.git


### Frontend Setup
cd frontend
npm install
npm install react react-dom
npm install react-router-dom
npm install recharts
npm install axios
npm install react-hook-form
npm install react-icons
npm install -D tailwindcss postcss autoprefixer

### Backend Setup (Spring Boot)
**Prerequisites**:
JDK 21
MySQL Database
Eclipse / IntelliJ IDEA
### Steps:
Open Eclipse
File → Import → Existing Maven Project
Select the backend folder
Right click project → Maven → Update Project → Select All → OK

**Update application.properties**:
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD

### Python Server Setup
**Prerequisites**
**Install Required Packages**:
Python
pip install opencv-python
pip install mediapipe
pip install numpy
pip install pandas
pip install Flask
pip install flask-cors

### How to Run the Project:
**Step 1: Run Spring Boot Backend**
Run ExerLytixApplication.java
Package: com.immutech.ExerLytix

**Step 2: Run Python Server**
python server.py

**Step 3: Run Frontend**
cd frontend
npm run dev

---
**Author**
Imtiyaz Ahamad
Full Stack Developer
📍 India
📧 imtiyazahamad703@gmail.com
