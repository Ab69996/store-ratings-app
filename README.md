<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Store Ratings Web Application</title>

<style>
body{
    margin:0;
    font-family:Segoe UI,Arial,sans-serif;
    background:#f4f6f9;
    color:#333;
}

.container{
    width:90%;
    max-width:1000px;
    margin:40px auto;
    background:#fff;
    padding:40px;
    border-radius:10px;
    box-shadow:0 10px 25px rgba(0,0,0,.1);
}

h1{
    color:#2563eb;
    text-align:center;
}

h2{
    color:#1e40af;
    border-bottom:2px solid #2563eb;
    padding-bottom:6px;
    margin-top:35px;
}

h3{
    color:#374151;
    margin-top:20px;
}

ul{
    line-height:1.8;
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

.badge{
    display:inline-block;
    background:#2563eb;
    color:#fff;
    padding:6px 12px;
    margin:5px;
    border-radius:20px;
    font-size:14px;
}

.footer{
    margin-top:40px;
    text-align:center;
    color:#666;
    font-size:14px;
}
</style>

</head>

<body>

<div class="container">

<h1>⭐ Store Ratings Web Application</h1>

<p>
A full-stack web application developed as part of a <strong>Full Stack Intern Coding Challenge</strong>.
The application enables users to browse stores, submit ratings (1–5), and provides secure role-based access for
System Administrators, Store Owners, and Normal Users.
</p>

<div>
<span class="badge">React</span>
<span class="badge">Express.js</span>
<span class="badge">Node.js</span>
<span class="badge">PostgreSQL</span>
<span class="badge">JWT</span>
</div>

<h2>📌 Features</h2>

<h3>👨‍💼 System Administrator</h3>

<ul>
<li>Secure Login</li>
<li>Dashboard displaying Users, Stores and Ratings</li>
<li>Add, View and Manage Users</li>
<li>Add and Manage Stores</li>
<li>View User Details</li>
<li>Search, Filter and Sort Records</li>
<li>Logout</li>
</ul>

<h3>👤 Normal User</h3>

<ul>
<li>User Registration</li>
<li>Login</li>
<li>Browse Stores</li>
<li>Search Stores</li>
<li>Submit Ratings</li>
<li>Update Ratings</li>
<li>Update Password</li>
<li>Logout</li>
</ul>

<h3>🏪 Store Owner</h3>

<ul>
<li>Secure Login</li>
<li>View Store Average Rating</li>
<li>View Customers who Rated Store</li>
<li>Update Password</li>
<li>Logout</li>
</ul>

<h2>🛠 Technology Stack</h2>

<ul>
<li><strong>Frontend:</strong> React.js, Vite, React Router, Axios</li>
<li><strong>Backend:</strong> Node.js, Express.js</li>
<li><strong>Database:</strong> PostgreSQL</li>
<li><strong>Authentication:</strong> JWT, bcrypt</li>
</ul>

<h2>📁 Project Structure</h2>

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

<h2>🚀 Local Setup</h2>

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
The application runs locally using the Vite development server and Express backend.
</p>

<h2>🔐 Environment Variables</h2>

<p>Create a <code>.env</code> file from <code>.env.example</code>.</p>

<pre>
DATABASE_URL=
JWT_SECRET=
ADMIN_NAME=
ADMIN_EMAIL=
ADMIN_PASSWORD=
</pre>

<p><strong>Note:</strong> Sensitive credentials are intentionally excluded from this repository.</p>

<h2>✅ Validation Rules</h2>

<ul>
<li>Name: 20–60 characters</li>
<li>Address: Maximum 400 characters</li>
<li>Email: Standard email validation</li>
<li>Password: 8–16 characters with at least one uppercase letter and one special character</li>
</ul>

<h2>🔒 Security Features</h2>

<ul>
<li>JWT Authentication</li>
<li>Password Hashing (bcrypt)</li>
<li>Role-Based Access Control</li>
<li>Protected API Routes</li>
<li>Parameterized SQL Queries</li>
<li>Environment Variable Configuration</li>
</ul>

<h2>📷 Screenshots</h2>

<p>
Screenshots of the application interface can be added here for reference.
</p>

<h2>📖 Assignment Information</h2>

<p>
This project was developed as part of a Full Stack Intern Coding Challenge using Express.js, React.js, and PostgreSQL. The application demonstrates secure authentication, role-based authorization, store management, user management, and rating functionality following best development practices.
</p>

<h2>📄 License</h2>

<p>
This project is intended solely for educational and assignment evaluation purposes.
</p>

<div class="footer">
© 2026 Store Ratings Web Application
</div>

</div>

</body>
</html>