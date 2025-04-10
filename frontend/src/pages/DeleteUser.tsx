import { useState } from "react";
import api from "../services/api";

const DeleteUser = () => {
  const [userId, setUserId] = useState<number | string>("");

  const handleDelete = async () => {
    try {
      await api.delete(`/users/deleteUser/${userId}`);
      console.log("User deleted");
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div>
      <h1>Delete User</h1>
      <input
        type="number"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete User</button>
    </div>
  );
};

export default DeleteUser;
