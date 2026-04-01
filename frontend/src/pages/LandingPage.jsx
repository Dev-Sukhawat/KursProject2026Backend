import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import Header from "../components/homepage/header";
import Intro from "../components/homepage/intro";
import Why from "../components/homepage/why";
import Starter from "../components/homepage/starter";
import Footer from "../components/footer/footer";

function Home() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(() => {
    const msg = sessionStorage.getItem("redirectMessage");
    sessionStorage.removeItem("redirectMessage"); // clear it after reading
    return msg || null;
  });

  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      navigate(user.role === "admin" ? "/admin" : "/user");
    }
  }, [navigate]);

  return (
    <>
      {message && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-3 rounded-lg text-sm text-center shadow-md whitespace-nowrap">
          ⚠️ {message}
        </div>
      )}
      <Header />
      <Intro />
      <Why />
      <Starter />
      <Footer />
    </>
  );
}

export default Home;
