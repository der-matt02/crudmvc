import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const UpdateUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({
    username: "",
    name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [userInput, setUserInput] = useState(userId || "");  // Si userId no está, permitir que se ingrese uno
  const navigate = useNavigate();

  // Fetch user data if userId is available
  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const response = await api.get(`/users/getUser/${userId}`);
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user", error);
        }
      };
      fetchUser();
    }
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId && userInput) {
      // Si no hay userId en la URL pero el usuario ha ingresado uno, navega a la URL correcta
      navigate(`/update/${userInput}`);
    } else {
      // Si hay userId, actualizar el usuario
      try {
        const response = await api.put(`/users/updateUser/${userId}`, user);
        console.log("User updated:", response.data);
      } catch (error) {
        console.error("Error updating user", error);
      }
    }
  };

  return (
    <div>
      <h1>Update User</h1>
      <form onSubmit={handleSubmit}>
        {!userId && (
          <div>
            <label htmlFor="userInput">Enter User ID:</label>
            <input
              type="text"
              id="userInput"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
        )}
        {userId && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <input
              type="text"
              placeholder="Name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={user.last_name}
              onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </>
        )}
        <button type="submit">{userId ? "Update User" : "Go to Update"}</button>
      </form>
    </div>
  );
};

export default UpdateUser;
