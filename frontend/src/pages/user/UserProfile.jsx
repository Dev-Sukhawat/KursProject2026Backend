import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import Profile from "../../components/user/UserProfile";

function UserProfile() {
  return (
    <>
      <Navbar>
        <Profile />
      </Navbar>
      <Footer />
    </>
  );
}

export default UserProfile;
