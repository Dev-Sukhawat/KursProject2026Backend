import { logoutUser } from "../components/services/authService";

function User() {
  return (
    <>
      <h1>Du har kommit till user</h1>
      <button onClick={logoutUser}>logout</button>
    </>
  );
}

export default User;
