import React, { useState } from 'react';
import { User } from '../types/userTypes';

interface Props {
  onSubmit: (user: Omit<User, 'id'>) => void;
  initialData?: Omit<User, 'id'>;
}

const UserForm: React.FC<Props> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || { name: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) setFormData({ name: '', email: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <input
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Nombre"
        required
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
        required
      />
      <button type="submit">{initialData ? 'Actualizar' : 'Crear'}</button>
    </form>
  );
};

export default UserForm;