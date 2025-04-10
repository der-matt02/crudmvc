import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UsersList from "./pages/UserList";
import CreateUser from "./pages/CreateUser";
import UpdateUser from "./pages/UpdateUser";
import DeleteUser from "./pages/DeleteUser";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/update" element={<UpdateUser />} />
        <Route path="/update/:userId" element={<UpdateUser />} />
        <Route path="/delete" element={<DeleteUser />} />
      </Routes>
    </Router>
  );
};

export default App;
