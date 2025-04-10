import axios from "axios";

// Creando instancia de Axios
const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // cambiar esto si se cambia de back
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
