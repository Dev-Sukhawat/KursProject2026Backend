import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import Header from "../components/homepage/header";
import NotFound from "../components/404/NotFound";
import Footer from "../components/footer/footer";

function NotFoundPage() {
  return (
    <>
      <NotFound />
      <Footer />
    </>
  );
}

export default NotFoundPage;
