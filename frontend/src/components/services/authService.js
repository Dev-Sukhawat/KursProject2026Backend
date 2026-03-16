import { jwtDecode } from "jwt-decode";

// Logout funktion
export function logoutUser() {
    localStorage.removeItem("token");
    window.location.href = "/";
}

// Get current logged in user
export function getCurrentUser() {
    const token = localStorage.getItem("token");

    if (!token) return null;

    try {
        const decoded = jwtDecode(token);

        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            localStorage.removeItem("token");
            return null;
        }

        return decoded;
    } catch (error) {
        return null;
    }
}