import React, { useState, useEffect, FormEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';

interface FormData {
  username: string;
  password?: string; // se exige en creación, opcional en edición
}

const UserFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({ username: '', password: '' });

  useEffect(() => {
    if (isEdit) {
      // Si estamos editando, cargar los datos del usuario desde el backend
      api.get(`/users/${id}`)
        .then(response => {
          // Suponiendo que el backend retorna al menos { id, username }
          setFormData({ username: response.data.username });
        })
        .catch(error => {
          console.error('Error al cargar el usuario:', error);
        });
    }
  }, [isEdit, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        // En edición, se hace PUT
        await api.put(`/users/${id}`, formData);
      } else {
        // En creación, se hace POST
        await api.post('/users', formData);
      }
      navigate('/users');
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
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
      <p>
        <Link to="/">← Volver al Menú Principal</Link>
      </p>
    </div>
  );
};

export default UserFormPage;
