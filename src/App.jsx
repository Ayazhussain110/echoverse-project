import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute';

import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';

import Home from './components/common/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import StudentDashboard from './components/student/StudentDashboard';
import FacultyDashboard from './components/faculty/FacultyDashboard';
import AdminDashboard from './components/admin/AdminDashboard';

import { loadUser } from './redux/slices/authSlice';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>

        {/* 🔷 Main Layout (Navbar visible) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* 🔷 Auth Layout (No Navbar) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* 🔷 Protected Student */}
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route element={<MainLayout />}>
            <Route path="/student/*" element={<StudentDashboard />} />
          </Route>
        </Route>

        {/* 🔷 Protected Faculty */}
        <Route element={<ProtectedRoute allowedRoles={['faculty']} />}>
          <Route element={<MainLayout />}>
            <Route path="/faculty/*" element={<FacultyDashboard />} />
          </Route>
        </Route>

        {/* 🔷 Protected Admin */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route element={<MainLayout />}>
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Route>
        </Route>

        {/* 🔷 Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </div>
  );
}

export default App;