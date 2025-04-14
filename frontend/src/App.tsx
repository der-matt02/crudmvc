// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UsersListPage from './pages/UsersListPage';
import UserFormPage from './pages/UserFormPage';

function App() {
  return (
    <Routes>
      {/* Ruta pública para el login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersListPage />} />
        <Route path="/users/new" element={<UserFormPage />} />
        <Route path="/users/:id/edit" element={<UserFormPage />} />
      </Route>
    </Routes>
  );
}

export default App;
