// src/pages/HomePage.tsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  const auth = useContext(AuthContext);
  return (
    <div>
      <h2>Menú Principal</h2>
      <ul>
        <li><Link to="/users">Gestionar Usuarios</Link></li>
      </ul>
      {auth && <button onClick={auth.logout}>Cerrar Sesión</button>}
    </div>
  );
};

export default HomePage;
