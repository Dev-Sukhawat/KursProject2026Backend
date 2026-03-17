import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import Header from "../components/homepage/header";
import Intro from "../components/homepage/intro";
import Why from "../components/homepage/why";
import Starter from "../components/homepage/starter";
import Footer from "../components/footer/footer";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      navigate(user.role === "admin" ? "/admin" : "/user");
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Intro />
      <Why />
      <Starter />
      <Footer />
    </>
  );
}

export default Home;
