import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';  // cliente Axios ya configurado

const RegisterPage: React.FC = () => {
  // Estados locales para los campos del formulario
  const [name, setName] = useState<string>('');               // Nombre (opcionalmente nombre de usuario)
  const [email, setEmail] = useState<string>('');             // Email
  const [password, setPassword] = useState<string>('');       // Contraseña
  const [confirmPassword, setConfirmPassword] = useState<string>(''); // Confirmación de contraseña

  const navigate = useNavigate();

  // Maneja el envío del formulario
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Validaciones básicas antes de enviar
    if (!name || !email || !password || !confirmPassword) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }
    // Validar formato de email usando expresión regular simple
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, ingrese un email con formato válido.');
      return;
    }
    // Validar coincidencia de contraseñas
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    try {
      // Preparar datos para la API. El backend espera 'username' y 'password'.
      const newUserData = {
        username: email,
        password: password
      };
      // Llamar al endpoint POST /users/ (create_user) para registrar el usuario
      await api.post('/users', newUserData);
      alert('Usuario registrado con éxito. Ahora puede iniciar sesión.');
      // Redirigir al formulario de login después de registro exitoso
      navigate('/login');
    } catch (error: any) {
      console.error('Error al registrar el usuario:', error);
      // Si el username/email ya existe o hay otro error
      if (error.response && error.response.status === 400) {
        alert('El email ya está registrado por otro usuario.');
      } else {
        alert('Ocurrió un error al registrar. Inténtelo de nuevo.');
      }
    }
  };

  return (
    <div>
      <h2>Registro de Nuevo Usuario</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <div>
          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>

      {/* Enlace a iniciar sesión si ya tiene cuenta */}
      <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
    </div>
  );
};

export default RegisterPage;
