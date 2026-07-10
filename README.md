<div align="center">

# ⭐ Store Ratings Web Application

### Full Stack Intern Coding Challenge

<p>
A full-stack web application that enables users to browse registered stores, submit ratings (1–5), and provides secure role-based access for <strong>System Administrators</strong>, <strong>Store Owners</strong>, and <strong>Normal Users</strong>.
</p>

<p>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">
<img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white">
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge">
<img src="https://img.shields.io/badge/License-Educational-blue?style=for-the-badge">
</p>

</div>

---

# 📖 Project Overview

Store Ratings is a full-stack web application developed as part of a **Full Stack Intern Coding Challenge**.

The application allows users to browse registered stores, submit ratings between **1 and 5**, and access different features based on their assigned roles.

It follows modern web development practices including secure authentication, role-based authorization, server-side validation, and relational database design.

---

# ✨ Features

## 👨‍💼 System Administrator

- Secure Login
- Dashboard
  - Total Users
  - Total Stores
  - Total Ratings
- Add Users
- Add Stores
- Manage Users
- Manage Stores
- View User Details
- Search Users & Stores
- Filter Records
- Sort Records
- Logout

---

## 👤 Normal User

- User Registration
- Secure Login
- Browse Stores
- Search Stores
- Submit Ratings
- Modify Ratings
- View Overall Ratings
- Update Password
- Logout

---

## 🏪 Store Owner

- Secure Login
- View Average Store Rating
- View Users who Rated Store
- Update Password
- Logout

---

# 🛠 Tech Stack

| Category | Technologies |
|-----------|--------------|
| Frontend | React.js, Vite, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| Authentication | JWT, bcrypt |
| API Testing | Postman |

---

# 📁 Project Structure

```text
store-ratings-app/
│
├── backend/
│   ├── src/
│   │   ├── db/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.js
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

# 🚀 Local Setup

## Backend

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example`.

Initialize the database:

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev
```

---

## Frontend

Open a new terminal.

```bash
cd frontend
npm install
npm run dev
```

The application will be available on the local Vite development server.

---

# 🔐 Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
DATABASE_URL=<your_database_connection_string>

JWT_SECRET=<your_secret_key>

ADMIN_NAME=<admin_name>

ADMIN_EMAIL=<admin_email>

ADMIN_PASSWORD=<admin_password>
```

Sensitive credentials are intentionally excluded from this repository.

---

# ✅ Form Validations

| Field | Validation |
|--------|------------|
| Name | 20–60 characters |
| Address | Maximum 400 characters |
| Email | Standard Email Format |
| Password | 8–16 characters with at least one uppercase letter and one special character |
| Rating | Integer value between 1 and 5 |

Validation is implemented on both the frontend and backend.

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Role-Based Authorization
- Protected API Routes
- Server-side Validation
- Client-side Validation
- Environment Variables
- Parameterized SQL Queries
- Secure Password Update

---

# 📊 Assignment Requirement Checklist

| Requirement | Status |
|-------------|:------:|
| User Registration | ✅ |
| User Login | ✅ |
| JWT Authentication | ✅ |
| Role-Based Authorization | ✅ |
| Administrator Dashboard | ✅ |
| Store Owner Dashboard | ✅ |
| Store Management | ✅ |
| User Management | ✅ |
| Rating System | ✅ |
| Rating Update | ✅ |
| Search Functionality | ✅ |
| Filter Functionality | ✅ |
| Sorting Functionality | ✅ |
| Password Update | ✅ |
| PostgreSQL Integration | ✅ |
| React Frontend | ✅ |
| Express Backend | ✅ |

---

# 📷 Screenshots

You can include screenshots here for demonstration.

Suggested screenshots:

- Login Page
- Registration Page
- Administrator Dashboard
- User Management
- Store Listing
- Rating Submission
- Store Owner Dashboard

---

# 🚀 Future Improvements

- Email Verification
- Password Reset
- Profile Management
- Store Images
- Pagination
- Dashboard Analytics
- Docker Support
- Unit Testing
- Integration Testing
- CI/CD Pipeline

---

# 📖 Assignment Information

This project was developed as part of a **Full Stack Intern Coding Challenge**.

The project demonstrates:

- Full Stack Development
- Secure Authentication
- Role-Based Authorization
- PostgreSQL Database Design
- RESTful API Development
- Store Rating System
- Dashboard Analytics
- Search, Filter & Sorting
- Responsive React Frontend


# 📄 License

This project is intended solely for **educational and assignment evaluation purposes**.

---

<div align="center">

### ⭐ Thank you for reviewing this project!

Built with ❤️ using **React • Express.js • PostgreSQL**

</div>
