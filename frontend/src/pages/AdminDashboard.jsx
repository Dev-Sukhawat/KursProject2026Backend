import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import Dashbord from "../components/admin/Dashbord";

function AdminDashboard() {
  return (
    <>
      <Navbar>
        <Dashbord />
      </Navbar>
      <Footer />
    </>
  );
}

export default AdminDashboard;
