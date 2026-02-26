import { logoutUser } from "../components/services/authService";

function Admin() {
  return (
    <>
      <h1>Du har kommit till Admin</h1>
      <button onClick={logoutUser}>logout</button>
    </>
  );
}

export default Admin;
