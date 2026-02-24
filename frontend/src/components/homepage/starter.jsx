import { useState } from "react";

export default function AuthSection() {
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <section
      className="bg-gradient-to-b from-background to-accent/20 py-20"
      id="auth-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join hundreds of professionals who trust CoWork for their workspace
            needs
          </p>
        </div>

        {/* Card Container */}
        <div className="max-w-md mx-auto">
          {/* Tabs */}
          <div className="bg-gray-200 p-1 rounded-full grid grid-cols-2 mb-6">
            <button
              onClick={() => setActiveTab("login")}
              className={`py-2 text-sm font-medium rounded-full transition ${
                activeTab === "login"
                  ? "bg-white shadow text-black"
                  : "text-gray-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`py-2 text-sm font-medium rounded-full transition ${
                activeTab === "register"
                  ? "bg-white shadow text-black"
                  : "text-gray-600"
              }`}
            >
              Register
            </button>
          </div>

          {/* Card */}
          <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
            {activeTab === "login" && (
              <>
                <h3 className="text-xl font-semibold mb-1">
                  Login to your account
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Enter your credentials to access the platform
                </p>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      className="w-full rounded-md bg-gray-100 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="w-full rounded-md bg-gray-100 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-md font-medium transition"
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </button>

                  <div className="text-sm text-gray-600 text-center mt-4 p-4 bg-blue-50 rounded-md">
                    <p className="font-medium mb-1">Demo credentials:</p>
                    <p>User: any email/password</p>
                    <p>Admin: admin@cowork.com / admin123</p>
                  </div>
                </form>
              </>
            )}

            {activeTab === "register" && (
              <>
                <h3 className="text-xl font-semibold mb-1">
                  Create an account
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Sign up to start booking spaces
                </p>

                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                      className="w-full rounded-md bg-gray-100 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                      className="w-full rounded-md bg-gray-100 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full rounded-md bg-gray-100 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-md font-medium transition"
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
