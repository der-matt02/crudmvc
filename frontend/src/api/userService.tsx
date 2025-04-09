import { User } from '../types/userTypes';

const API_URL = '/api/users';

export const userService = {
  getAll: async (): Promise<User[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al obtener usuarios');
    return await response.json();
  },
  create: async (user: Omit<User, 'id'>): Promise<User> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error('Error al crear usuario');
    return await response.json();
  },
  update: async (id: number, user: Partial<User>): Promise<User> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error('Error al actualizar usuario');
    return await response.json();
  },
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Error al eliminar usuario');
  },
};