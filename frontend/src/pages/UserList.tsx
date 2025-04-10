import { useEffect, useState } from "react";
import api from "../services/api";

interface User {
  id: number;
  username: string;
  name: string;
  last_name: string;
  email: string;
}

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users/getUsers");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - {user.name} {user.last_name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
