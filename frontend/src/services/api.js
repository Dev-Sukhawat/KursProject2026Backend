const API_BASE_URL = "http://localhost:8080/api";

export const authService = {
  // Registrera
  async register(fullName, email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name: fullName, password: password, role: "user", email: email }),
    });
    return this.handleResponse(response);
  },

  // Logga in
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await this.handleResponse(response);

    // Spara JWT-token i localStorage
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    return data;
  },

  // Hjälpmetod för att hantera fel
  async handleResponse(response) {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Något gick fel");
    }
    return data;
  }
};