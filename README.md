<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Store Ratings Web Application</title>

<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    font-family:Segoe UI,Arial,sans-serif;
    background:#eef2f7;
    color:#333;
    line-height:1.7;
}

header{
    background:linear-gradient(135deg,#2563eb,#1d4ed8);
    color:white;
    padding:50px 20px;
    text-align:center;
}

header h1{
    font-size:42px;
    margin-bottom:10px;
}

header p{
    font-size:18px;
    opacity:.95;
}

.container{
    width:90%;
    max-width:1100px;
    margin:40px auto;
}

.card{
    background:#fff;
    padding:30px;
    border-radius:12px;
    margin-bottom:25px;
    box-shadow:0 8px 20px rgba(0,0,0,.08);
}

h2{
    color:#2563eb;
    margin-bottom:15px;
    border-bottom:2px solid #2563eb;
    padding-bottom:8px;
}

h3{
    margin-top:20px;
    color:#374151;
}

ul{
    margin-left:25px;
}

li{
    margin:8px 0;
}

.badges{
    margin-top:20px;
}

.badge{
    display:inline-block;
    background:#2563eb;
    color:white;
    padding:8px 16px;
    border-radius:30px;
    margin:5px;
    font-size:14px;
}

.grid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
    gap:20px;
}

.tech{
    background:#f8fafc;
    padding:20px;
    border-radius:10px;
    border-left:5px solid #2563eb;
}

pre{
    background:#1f2937;
    color:#fff;
    padding:15px;
    border-radius:8px;
    overflow:auto;
}

code{
    background:#eef2ff;
    padding:2px 5px;
    border-radius:4px;
}

footer{
    text-align:center;
    padding:30px;
    color:#777;
}
</style>

</head>

<body>

<header>

<h1>⭐ Store Ratings Web Application</h1>

<p>
Full Stack Intern Coding Challenge
</p>

<div class="badges">
<span class="badge">React</span>
<span class="badge">Express.js</span>
<span class="badge">Node.js</span>
<span class="badge">PostgreSQL</span>
<span class="badge">JWT</span>
</div>

</header>

<div class="container">

<div class="card">

<h2>Project Overview</h2>

<p>
Store Ratings is a full-stack web application that enables users to browse registered stores,
submit ratings between 1 and 5, and access role-based dashboards. The application follows
secure authentication practices and implements role-based authorization for Administrators,
Store Owners, and Normal Users.
</p>

</div>

<div class="card">

<h2>Features</h2>

<h3>👨‍💼 System Administrator</h3>

<ul>
<li>Secure Login</li>
<li>Dashboard with total Users, Stores and Ratings</li>
<li>Create and manage Users</li>
<li>Create and manage Stores</li>
<li>Search, Filter and Sort records</li>
<li>View user details</li>
<li>Logout</li>
</ul>

<h3>👤 Normal User</h3>

<ul>
<li>User Registration</li>
<li>Secure Login</li>
<li>Browse Stores</li>
<li>Search Stores</li>
<li>Submit Ratings</li>
<li>Modify Ratings</li>
<li>Update Password</li>
<li>Logout</li>
</ul>

<h3>🏪 Store Owner</h3>

<ul>
<li>Secure Login</li>
<li>View Store Average Rating</li>
<li>View Users who Rated the Store</li>
<li>Update Password</li>
<li>Logout</li>
</ul>

</div>

<div class="card">

<h2>Technology Stack</h2>

<div class="grid">

<div class="tech">
<h3>Frontend</h3>
<p>React.js<br>Vite<br>React Router<br>Axios</p>
</div>

<div class="tech">
<h3>Backend</h3>
<p>Node.js<br>Express.js</p>
</div>

<div class="tech">
<h3>Database</h3>
<p>PostgreSQL</p>
</div>

<div class="tech">
<h3>Security</h3>
<p>JWT Authentication<br>bcrypt Password Hashing</p>
</div>

</div>

</div>

<div class="card">

<h2>Project Structure</h2>

<pre>
store-ratings-app/
│
├── backend/
│
├── frontend/
│
├── .gitignore
│
└── README.md
</pre>

</div>

<div class="card">

<h2>Local Setup</h2>

<h3>Backend</h3>

<pre>
cd backend
npm install
npm run seed
npm run dev
</pre>

<h3>Frontend</h3>

<pre>
cd frontend
npm install
npm run dev
</pre>

<p>
The application runs locally using the Express backend and Vite development server.
</p>

</div>

<div class="card">

<h2>Environment Variables</h2>

<pre>
DATABASE_URL=&lt;your_database_url&gt;
JWT_SECRET=&lt;your_secret_key&gt;
ADMIN_NAME=&lt;admin_name&gt;
ADMIN_EMAIL=&lt;admin_email&gt;
ADMIN_PASSWORD=&lt;admin_password&gt;
</pre>

<p>
Sensitive credentials are intentionally excluded from this repository.
</p>

</div>

<div class="card">

<h2>Validation Rules</h2>

<ul>
<li>Name: 20–60 characters</li>
<li>Address: Maximum 400 characters</li>
<li>Email: Standard email validation</li>
<li>Password: 8–16 characters with at least one uppercase letter and one special character</li>
</ul>

</div>

<div class="card">

<h2>Security Features</h2>

<ul>
<li>JWT Authentication</li>
<li>Password Hashing using bcrypt</li>
<li>Role-Based Access Control</li>
<li>Protected API Routes</li>
<li>Parameterized SQL Queries</li>
<li>Environment Variable Configuration</li>
</ul>

</div>

<div class="card">

<h2>Assignment Information</h2>

<p>
This project was developed as part of a Full Stack Intern Coding Challenge.
It demonstrates secure authentication, user management, store management,
role-based authorization, rating functionality, filtering, sorting, and
PostgreSQL database integration using modern full-stack development practices.
</p>

</div>

</div>

<footer>

<p>
Developed for the Full Stack Intern Coding Challenge
</p>

<p>
© 2026 Store Ratings Web Application
</p>

</footer>

</body>
</html>
