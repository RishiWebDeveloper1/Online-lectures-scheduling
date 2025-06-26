# 🎓 Online Lecture Scheduling – Admin & Instructor Panel (MERN Stack)

This is a full-stack web app where an admin can add courses, schedule lectures, assign instructors, and make sure no instructor is double-booked on the same date.  
Instructors can log in and see their assigned lectures with course details.

Built with **MERN stack** and deployed on **Render (backend)** + **Vercel (frontend)**.

---

## 🚀 Live Links

- **Frontend (React)**: [https://online-lectures-scheduling.vercel.app](https://online-lectures-scheduling.vercel.app)  
- **Backend (API)**: [https://online-lectures-scheduling.onrender.com](https://online-lectures-scheduling.onrender.com)

---

## 🔐 Login Details

| Role       | Username | Password |
|------------|----------|----------|
| Admin      | admin    | 123      |
| Instructor | rahul    | 123      |

---

## 🧠 Tech Stack

- React (Frontend)
- Node.js + Express (Backend)
- MongoDB + Mongoose (Database)
- Axios (API calls)
- Tailwind CSS (UI styling)

---

## 📘 Features

### ✅ Admin Panel
- Add instructors (dummy)
- Create courses with name, level, description, and image
- Add lectures to courses with date & instructor
- Automatically prevents instructor from being assigned two lectures on same date
- View all courses and lectures

### ✅ Instructor Panel
- Instructor can log in
- See their assigned lectures by course name & date

---

### 🗂️ Folder Structure (Main Parts)
/backend
├── models/
└── index.js

/frontend
├── pages/
├── components/
├── api/
└── App.js

---

## 🔗 Routes & API Endpoints

### 🛠️ Backend Routes (Express)
| Method | Endpoint                       | Description                             |
|--------|--------------------------------|-----------------------------------------|
| GET    | `/api/users?role=instructor`   | Get list of instructors                 |
| POST   | `/api/courses`                 | Add a new course                        |
| GET    | `/api/courses`                 | Get all courses                         |
| POST   | `/api/lectures`                | Add lecture to course (date clash check)|
| GET    | `/api/lectures/instructor/:id` | Get lectures by instructor              |

---

### Links
-/login
-/admin/addCourse
-/admin/addLecture
-/admin/addUser
-/admin/viewCourse
-/admin/viewLecture
-/user/viewCourse
-/user/viewLecture

---

## 💾 Database Dump

- You can find the DB dump here:  
  [GitHub Dump Folder](https://github.com/RishiWebDeveloper1/Online-lectures-scheduling/tree/main/dump/onlineLectures)

---

## 👤 Author

**Rishi Vishwakarma**  
GitHub: [@RishiWebDeveloper1](https://github.com/RishiWebDeveloper1)

---
