import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import Booking from "../../components/admin/Booking";

export default function BookingManagement() {
  return (
    <>
      <Navbar>
        <Booking />
      </Navbar>
      <Footer />
    </>
  );
}
