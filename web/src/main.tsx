import React from 'react';
import { Navbar } from 'components';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login, Register } from 'pages/auth';

const Main = () => (
  <div className="flex flex-col justify-center gap-4">
    <Navbar />
    <Routes>
      <Route path="auth">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Route>
    </Routes>
  </div>
);

export default Main;
