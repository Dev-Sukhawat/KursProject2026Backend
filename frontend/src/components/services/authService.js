// Get all Users
export function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

// Save Users
export function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// Logout funktion
export function logoutUser() {
    localStorage.removeItem("user");
    window.location.href = "/";
}

// Get current logged in user
export function getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
}

// Login funktion
export function loginUser(email, password) {
    const users = getUsers();

    const existingUser = users.find((user) => user.email === email);

    if (!existingUser) {
        return { success: false, message: "User does not exist. Please register first." };
    }

    if (existingUser.password !== password) {
        return { success: false, message: "Incorrect password." };
    }

    localStorage.setItem("user", JSON.stringify(existingUser));

    return { success: true, user: existingUser };
}

// Register funktion
export function registerUser(name, email, password) {
    const users = getUsers();

    const userExists = users.find((user) => user.email === email);

    if (userExists) {
        return { success: false, message: "User already exists. Please login." };
    }

    const newUser = {
        name,
        email,
        password,
        role: "user",
    };

    users.push(newUser);
    saveUsers(users);

    localStorage.setItem("user", JSON.stringify(newUser));

    return { success: true, user: newUser };
}