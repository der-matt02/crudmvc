import axios from "axios";

// Creando instancia de Axios
const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // Cambia esto a la URL de tu API si es diferente
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
