// src/pages/UserFormPage.tsx
import React, { useState, useEffect, FormEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';

interface FormData {
  username: string;
  password?: string;
}

const UserFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const [formData, setFormData] = useState<FormData>({ username: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      // Cargar los datos existentes del usuario para editar
      api.get(`/users/${id}`)
        .then(response => {
          setFormData({ username: response.data.username });
        })
        .catch(error => {
          console.error('Error al cargar datos del usuario', error);
        });
    }
  }, [isEdit, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/users/${id}`, formData);
      } else {
        await api.post('/users', formData);
      }
      navigate('/users');
    } catch (error) {
      console.error('Error al guardar el usuario', error);
      alert('Error al guardar el usuario');
    }
  };

  return (
    <div>
      <h2>{isEdit ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        {/* Se solicita la contraseña solo al crear; si se edita puede ser opcional */}
        {!isEdit && (
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <button type="submit">Guardar</button>
        <button type="button" onClick={() => navigate('/users')}>Cancelar</button>
      </form>
      <p><Link to="/">← Volver al Menú</Link></p>
    </div>
  );
};

export default UserFormPage;
