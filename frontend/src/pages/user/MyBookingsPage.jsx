import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import MyBooking from "../../components/user/MyBooking";

function MyBookingsPage() {
  return (
    <>
      <Navbar>
        <MyBooking />
      </Navbar>
      <Footer />
    </>
  );
}

export default MyBookingsPage;
