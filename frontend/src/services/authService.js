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

        // Just return null - let ProtectedRoute handle the redirect + message
        if (decoded.exp < currentTime) {
            localStorage.removeItem("token");
            return null;
        }

        return decoded;
    } catch {
        localStorage.removeItem("token");
        return null;
    }
}