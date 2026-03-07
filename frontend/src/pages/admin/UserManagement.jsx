import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import User from "../../components/admin/User";

export default function UserManagement() {
  return (
    <>
      <Navbar>
        <User />
      </Navbar>
      <Footer />
    </>
  );
}
