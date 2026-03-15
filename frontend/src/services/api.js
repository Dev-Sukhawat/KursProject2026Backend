const API_BASE_URL = "http://localhost:8080/api/auth";

// Helper function for retrieving headers with token
const getHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

// Helper method for handling responses and errors centrally
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Något gick fel vid API-anropet");
  }
  return data;
};

export const authService = {
  // Registrera
  async register(fullName, email, password) {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name: fullName, email, password }),
    });
    return handleResponse(response);
  },

  // Logga in
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await handleResponse(response);

    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    return data;
  }
};

// Users-services (CRUD)
export const usersService = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/users`, { headers: getHeaders() });
    return handleResponse(response);
  },
  async update(id, updates) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });
    return handleResponse(response);
  },
  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return handleResponse(response);
  }
};

export const roomService = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/rooms`, { headers: getHeaders() });
    return handleResponse(response);
  },
  async create(roomData) {
    const response = await fetch(`${API_BASE_URL}/rooms`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(roomData),
    });
    return handleResponse(response);
  },
  async update(id, updates) {
    const response = await fetch(`${API_BASE_URL}/rooms/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });
    return handleResponse(response);
  },
  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/rooms/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return handleResponse(response);
  }
};

// Boknings-services (CRUD)
export const bookingService = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/bookings`, { headers: getHeaders() });
    return handleResponse(response);
  },
  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      headers: getHeaders()
    });
    return handleResponse(response);
  },
  async create(bookingData) {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(bookingData),
    });
    return handleResponse(response);
  },
  async update(id, updates) {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });
    return handleResponse(response);
  },
  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return handleResponse(response);
  }
};