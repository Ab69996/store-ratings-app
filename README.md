# Store Ratings Platform

A full-stack web application for submitting and managing ratings for registered stores, with role-based access for administrators, store owners, and regular users.

## Overview

Store Ratings Platform provides a single authentication system with three distinct user roles, each with a tailored dashboard and permission set. Users can discover stores, submit 1–5 star ratings, and update them at any time. Store owners can track feedback on their store, and administrators manage the full catalog of users and stores from a central admin console.

## Project Highlights

- Role-Based Authentication
- JWT Authorization
- Store Rating System (1–5)
- PostgreSQL Relational Database
- RESTful API Design
- Search, Filtering & Sorting
- Form Validation
- Secure Password Hashing
  
## Features

**System Administrator**
- Dashboard with platform-wide metrics (total users, stores, ratings)
- Create new users of any role (Admin, Normal User, Store Owner)
- Create and assign stores to store owners
- View, filter, and sort user and store listings by name, email, address, and role
- Inspect individual user details, including computed rating for store owners

**Normal User**
- Self-service registration and login
- Browse and search stores by name and address
- Submit and update a 1–5 star rating per store
- View both the store's overall rating and their own submitted rating
- Update their password

**Store Owner**
- View the list of users who rated their store
- View their store's average rating
- Update their password

## Tech Stack

| Layer      | Technology                                   |
|------------|-----------------------------------------------|
| Frontend   | React 18, React Router, Axios, Vite           |
| Backend    | Node.js, Express.js                           |
| Database   | PostgreSQL                                    |
| Auth       | JWT (JSON Web Tokens), bcrypt password hashing |
| Validation | express-validator                             |

## Architecture

```
store-ratings-app/
├── backend/
│   └── src/
│       ├── db/            # Connection pool and schema definition
│       ├── middleware/     # JWT verification and role-based access control
│       ├── routes/         # auth, admin, stores, store-owner endpoints
│       └── utils/          # Shared validators and DB seed script
└── frontend/
    └── src/
        ├── components/    # Navbar, route guards, shared UI elements
        ├── context/        # Authentication state provider
        └── pages/          # Role-specific views (dashboards, listings, forms)
```

### Data Model

- **users** — id, name, email, hashed password, address, role (`admin` / `user` / `store_owner`)
- **stores** — id, name, email, address, owner_id (FK → users)
- **ratings** — id, user_id (FK), store_id (FK), rating (1–5), unique per (user, store)

### API Summary

| Method | Endpoint                     | Access        | Description                          |
|--------|-------------------------------|---------------|--------------------------------------|
| POST   | `/api/auth/signup`            | Public        | Register a normal user               |
| POST   | `/api/auth/login`              | Public        | Authenticate and receive a JWT       |
| PUT    | `/api/auth/password`           | Authenticated | Update own password                  |
| GET    | `/api/admin/dashboard`         | Admin         | Platform-wide metrics                |
| POST   | `/api/admin/users`              | Admin         | Create a user of any role            |
| POST   | `/api/admin/stores`             | Admin         | Create a store                       |
| GET    | `/api/admin/users`               | Admin         | List/filter/sort users               |
| GET    | `/api/admin/users/:id`           | Admin         | User detail view                     |
| GET    | `/api/admin/stores`              | Admin         | List/filter/sort stores              |
| GET    | `/api/stores`                    | Normal User   | Browse/search stores with ratings    |
| POST   | `/api/stores/:id/rating`         | Normal User   | Submit or update a rating            |
| GET    | `/api/store-owner/dashboard`     | Store Owner   | Ratings received and average rating  |

## Validation Rules

- **Name:** 20–60 characters
- **Address:** up to 400 characters
- **Password:** 8–16 characters, at least one uppercase letter and one special character
- **Email:** standard email format

Validation is enforced on both the client and server; the server is the source of truth.

## Getting Started

### Prerequisites
- Node.js (LTS)
- PostgreSQL (local instance or a hosted provider)

### Backend

```bash
cd backend
npm install
Create a `.env` file using the provided `.env.example` and configure the required environment variables.
npm run seed             # creates tables and a default admin account
npm run dev
```

### Frontend

```bash
cd frontend
npm install
Create a `.env` file using the provided `.env.example` and configure the required environment variables.
npm run dev
```

The frontend runs on `http://localhost:5173` and communicates with the backend on `http://localhost:5000` by default.

## Security Notes

- Passwords are hashed with bcrypt before storage.
- Authentication is stateless via signed JWTs with an 8-hour expiry.
- All role-restricted endpoints are protected by middleware that validates both the token and the user's role.
- Environment files containing secrets are excluded from version control.

## License

This project is provided for demonstration and evaluation purposes.
