// src/pages/UsersListPage.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

interface User {
  id: number;
  username: string;
  // añade otros campos si es necesario
}

const UsersListPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error al cargar usuarios', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Desea eliminar este usuario?')) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      console.error('Error al eliminar usuario', error);
    }
  };

  return (
    <div>
      <h2>Listado de Usuarios</h2>
      <button><Link to="/users/new">Crear Usuario</Link></button>
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>
                <Link to={`/users/${user.id}/edit`}>Editar</Link>{' '}
                <button onClick={() => handleDelete(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p><Link to="/">← Volver al Menú</Link></p>
    </div>
  );
};

export default UsersListPage;
