import { jwtDecode } from "jwt-decode";

// // Get all Users
// export function getUsers() {
//     return JSON.parse(localStorage.getItem("users")) || [];
// }

// // Save Users
// export function saveUsers(users) {
//     localStorage.setItem("users", JSON.stringify(users));
// }

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