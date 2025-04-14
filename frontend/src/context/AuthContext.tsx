// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

interface AuthContextType {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await api.post('/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log(response.data); // Para revisar qué retorna el backend

      const jwt = response.data.access_token;
      setToken(jwt);
      localStorage.setItem('token', jwt);
      api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
      navigate('/');
    } catch (error) {
      console.error('Login error: ', error);
      throw new Error('Credenciales inválidas');
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
