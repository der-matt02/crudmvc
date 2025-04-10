import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the User Management System</h1>
      <nav>
        <ul>
          <li>
            <Link to="/users">View Users</Link>
          </li>
          <li>
            <Link to="/create">Create User</Link>
          </li>
          <li>
            <Link to="/update">Update User</Link>
          </li>
          <li>
            <Link to="/delete">Delete User</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
