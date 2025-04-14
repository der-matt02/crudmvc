// src/services/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000' // Asegúrate de que coincida con la URL de tu backend
});
