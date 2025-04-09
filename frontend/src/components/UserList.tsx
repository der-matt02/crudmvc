import React, { useState, useEffect } from 'react';
import { userService } from '../api/userService';
import { User } from '../types/userTypes';
import UserForm from './UserForm';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await userService.getAll();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar usuarios');
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleCreate = async (user: Omit<User, 'id'>) => {
    try {
      await userService.create(user);
      const updatedUsers = await userService.getAll();
      setUsers(updatedUsers);
    } catch (err) {
      setError('Error al crear usuario');
    }
  };

  const handleUpdate = async (id: number, user: Partial<User>) => {
    try {
      const updatedUser = await userService.update(id, user);
      setUsers(users.map(u => u.id === id ? updatedUser : u));
      setEditingUser(null);
    } catch (err) {
      setError('Error al actualizar usuario');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Eliminar usuario?')) {
      try {
        await userService.delete(id);
        setUsers(users.filter(user => user.id !== id));
      } catch (err) {
        setError('Error al eliminar usuario');
      }
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1>CRUD de Usuarios</h1>
      <UserForm onSubmit={handleCreate} />

      <h2>Lista de Usuarios</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map(user => (
          <li key={user.id} style={{
            padding: '10px',
            margin: '5px 0',
            background: '#f5f5f5',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <div>
              <strong>{user.name}</strong> - {user.email}
            </div>
            <div>
              <button onClick={() => setEditingUser(user)} style={{ marginRight: '8px' }}>
                Editar
              </button>
              <button onClick={() => handleDelete(user.id)} style={{ background: '#ff4444', color: 'white' }}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingUser && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
            <h3>Editar Usuario</h3>
            <UserForm
              initialData={{ name: editingUser.name, email: editingUser.email }}
              onSubmit={(data) => handleUpdate(editingUser.id, data)}
            />
            <button
              onClick={() => setEditingUser(null)}
              style={{ marginTop: '10px', width: '100%' }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;