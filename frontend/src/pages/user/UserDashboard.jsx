import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import Dashbord from "../../components/user/Dashborad";

function UserDashboard() {
  return (
    <>
      <Navbar>
        <Dashbord />
      </Navbar>
      <Footer />
    </>
  );
}

export default UserDashboard;
