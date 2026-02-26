import { useNavigate } from "react-router-dom";

function User() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      <h1>Du har kommit till user</h1>
      <button onClick={handleLogout}>logout</button>
    </>
  );
}

export default User;
