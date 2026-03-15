import { useNavigate } from "react-router-dom";
import NavButton from "../ui/navbar/NavButton";
import { getCurrentUser, logoutUser } from "../services/authService";
import {
  LogOut,
  LayoutDashboard,
  Calendar,
  User,
  Settings,
} from "lucide-react";

export default function Navbar({ children }) {
  const navigate = useNavigate();

  const user = getCurrentUser();
  const isAdmin = user?.role === "admin";

  // Om ingen användare → visa bara innehåll
  if (!user) {
    return <>{children}</>;
  }

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo + Navigation */}
            <div className="flex items-center gap-8">
              <h1
                onClick={() => navigate(isAdmin ? "/admin" : "/user")}
                className="text-xl text-primary font-semibold cursor-pointer"
              >
                CoWork
              </h1>

              <nav className="hidden md:flex gap-2 ">
                {isAdmin ? (
                  <>
                    <NavButton
                      icon={<LayoutDashboard size={16} />}
                      label="Dashboard"
                      className="cursor-pointer"
                      onClick={() => navigate("/admin")}
                    />
                    <NavButton
                      icon={<Settings size={16} />}
                      label="Rooms"
                      onClick={() => navigate("/admin/rooms")}
                    />
                    <NavButton
                      icon={<User size={16} />}
                      label="Users"
                      onClick={() => navigate("/admin/users")}
                    />
                    <NavButton
                      icon={<Calendar size={16} />}
                      label="Bookings"
                      onClick={() => navigate("/admin/bookings")}
                    />
                  </>
                ) : (
                  <>
                    <NavButton
                      icon={<LayoutDashboard size={16} />}
                      label="Dashboard"
                      onClick={() => navigate("/user")}
                    />
                    <NavButton
                      icon={<Calendar size={16} />}
                      label="Book Room"
                      onClick={() => navigate("/book")}
                    />
                    <NavButton
                      icon={<Calendar size={16} />}
                      label="My Bookings"
                      onClick={() => navigate("/my-bookings")}
                    />
                    <NavButton
                      icon={<User size={16} />}
                      label="Profile"
                      onClick={() => navigate("/profile")}
                    />
                  </>
                )}
              </nav>
            </div>

            {/* User Info + Logout */}
            <div className="flex items-center gap-4">
              <div className="text-sm hidden sm:block">
                {isAdmin ? (
                  <>
                    Admin:
                    <span className="ml-2 text-primary capitalize font-medium">
                      ({user.name} )
                    </span>
                  </>
                ) : (
                  <span className="ml-2 font-medium capitalize ">
                    {user.name}
                  </span>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-md text-destructive cursor-pointer hover:border-destructive/50 hover:bg-destructive/5 transition "
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">{children}</main>
    </div>
  );
}