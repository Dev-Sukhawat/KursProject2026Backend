# Coworking Space Booking Platform (Kurs Project 2026)

A high-performance, full-stack booking platform designed for Coworking Spaces. This application allows users to register, log in, and reserve workspaces or conference rooms in real-time. It features a modern decoupled architecture with a Node.js/Express backend and a React/Vite frontend.

---

## 📂 Repository Structure

### 🏗️ Backend (`/backend`)
The server-side application manages data persistence, real-time events, and security.
* **`server.js`**: Core entry point for the Express application.
* **`config/`**: Configuration for **Supabase** (Database).
* **`middleware/`**: Custom logic for **Auth** (JWT validation) and Role-Based Access Control (RBAC).
* **`routes/`**: Modular API endpoints for Auth, Rooms, and Bookings.
* **`utils/`**: Helper functions for **Socket.io** (real-time updates) and **Winston** (logging).

### 💻 Frontend (`/frontend`)
A high-performance Single Page Application (SPA) built with React and Vite.
* **`src/pages/`**: Main views for Admin Management and User Dashboards.
* **`src/components/`**: Modular components for Admin controls, User forms, and UI elements.
* **`src/context/`**: Global state management for Data and Real-time Notifications.
* **`src/services/`**: API abstraction layer (Axios) and Socket.io client initialization.

---

## 🚀 Tech Stack

* **Backend:** Node.js with Express.js.
* **Frontend:** React (Vite) with Context API.
* **Database:** **Supabase (PostgreSQL)**.
* **Authentication:** JWT (JSON Web Tokens) and bcrypt.
* **Real-time Communication:** WebSocket via **Socket.io** for instant notifications.
* **Database Security:** Advanced PostgreSQL constraints to prevent overlapping bookings.

---

## ✨ Functional Requirements

### 1. User Roles
* **Standard User:** Register, login, view personal bookings, and manage own reservations.
* **Administrator:** Manage rooms, view all system-wide users/bookings, and handle account management.

### 2. Core Functionality
* **Authentication:** Secure identity management via JWT.
* **Room Management:** Admins define Name, Capacity, and Type (workspace/conference).
* **Booking Validation:** The system utilizes a PostgreSQL `EXCLUDE` constraint to ensure no two active bookings overlap for the same room.
* **Notifications:** Real-time updates push status changes to the frontend via WebSockets.

---

## 📡 API Specification

### Authentication
* `POST /register` - Register a new user profile.
* `POST /login` - Login and receive a JWT token.

### Room Management (Admin Only)
* `POST /rooms` - Create a new room.
* `GET /rooms` - Fetch all rooms.
* `PUT /rooms/:id` - Update room details.
* `DELETE /rooms/:id` - Delete a room.

### Bookings
* `POST /bookings` - Create a new booking (validated by DB constraints).
* `GET /bookings` - Fetch user's bookings (User) or all bookings (Admin).
* `PUT /bookings/:id` - Update booking status or time.
* `DELETE /bookings/:id` - Cancel or remove a booking.

## 🗄️ Database Schema (PostgreSQL)

### `profiles`
| Column | Type | Default |
| :--- | :--- | :--- |
| `id` | UUID | `gen_random_uuid()` |
| `full_name` | Text | Required |
| `email` | Text | Required |
| `role` | Text | 'user' |
| `created_at` | timestamptz | '(now() AT TIME ZONE 'utc')' |

### `rooms`
| Column | Type | Default |
| :--- | :--- | :--- |
| `id` | UUID | `gen_random_uuid()` |
| `name` | Text | Required |
| `type` | Text | Required |
| `capacity` | Integer | Required |
| `available` | Boolean | `true` |

### `bookings`
| Column | Type | Default |
| :--- | :--- | :--- |
| `id` | UUID | `gen_random_uuid()` |
| `user_id` | UUID | FK to `profiles.id` |
| `room_id` | UUID | FK to `rooms.id` |
| `start_date` | TIMESTAMPTZ | Required |
| `end_date` | TIMESTAMPTZ | Required |
| `status` | Text | 'active' |

> **Note:** This table includes a `no_overlapping_bookings` constraint using GIST and `tstzrange` to prevent double-bookings automatically at the database level.

---

## 🛠️ Installation & Setup

### 1. Backend
```bash
cd backend
npm install
# Configure .env with SUPABASE_URL and SUPABASE_KEY
npm start
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

---
© 2026 dev-sukhawat
