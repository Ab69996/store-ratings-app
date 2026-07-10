import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import { useAuth } from './context/AuthContext.jsx';

import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import UpdatePassword from './pages/UpdatePassword.jsx';
import UserStores from './pages/UserStores.jsx';
import StoreOwnerDashboard from './pages/StoreOwnerDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminUsers from './pages/AdminUsers.jsx';
import AdminUserDetail from './pages/AdminUserDetail.jsx';
import AdminStores from './pages/AdminStores.jsx';
import AdminAddUser from './pages/AdminAddUser.jsx';
import AdminAddStore from './pages/AdminAddStore.jsx';

function HomeRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  if (user.role === 'store_owner') return <Navigate to="/store-owner/dashboard" replace />;
  return <Navigate to="/stores" replace />;
}

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/update-password" element={
            <PrivateRoute allowedRoles={['admin', 'user', 'store_owner']}><UpdatePassword /></PrivateRoute>
          } />

          {/* Normal user */}
          <Route path="/stores" element={
            <PrivateRoute allowedRoles={['user']}><UserStores /></PrivateRoute>
          } />

          {/* Store owner */}
          <Route path="/store-owner/dashboard" element={
            <PrivateRoute allowedRoles={['store_owner']}><StoreOwnerDashboard /></PrivateRoute>
          } />

          {/* Admin */}
          <Route path="/admin/dashboard" element={
            <PrivateRoute allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>
          } />
          <Route path="/admin/users" element={
            <PrivateRoute allowedRoles={['admin']}><AdminUsers /></PrivateRoute>
          } />
          <Route path="/admin/users/:id" element={
            <PrivateRoute allowedRoles={['admin']}><AdminUserDetail /></PrivateRoute>
          } />
          <Route path="/admin/stores" element={
            <PrivateRoute allowedRoles={['admin']}><AdminStores /></PrivateRoute>
          } />
          <Route path="/admin/add-user" element={
            <PrivateRoute allowedRoles={['admin']}><AdminAddUser /></PrivateRoute>
          } />
          <Route path="/admin/add-store" element={
            <PrivateRoute allowedRoles={['admin']}><AdminAddStore /></PrivateRoute>
          } />

          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
      </main>
    </>
  );
}
