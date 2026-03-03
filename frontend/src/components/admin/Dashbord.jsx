import Header from "./Dashborad/header";
import Stats from "./Dashborad/stats_cards";

function Dashbord() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Header />
      <Stats />
    </div>
  );
}

export default Dashbord;
