import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      <h1>Du har kommit till Admin</h1>
      <button onClick={handleLogout}>logout</button>
    </>
  );
}

export default Admin;
