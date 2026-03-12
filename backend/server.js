import express from "express";
import cors from "cors";
import { supabase } from "./config/supabaseClient.js";
import authRoutes from "./routes/auth.js"

const app = express();
app.use(express.json()); // Essential for receiving POST data

const CorsOptions = {
    origin: ["http://localhost:5173"]
};

const port = 8080;
app.use(cors(CorsOptions));

// 1. GET Real Bookings from the Database
app.get("/api", (reg, res) => {
    res.send(`Server is running on http://localhost:${port}`)
})

app.use("/api/auth", authRoutes)

app.get("/api/bookings", async (req, res) => {
    try {
        // We use a JOIN to get the user name and room name, just like in your JSON
        const bookings = await supabase`
            SELECT
                b.id,
                b.user_id as "userId",
                p.full_name as "userName",
                b.room_id as "roomId",
                r.name as "roomName",
                b.start_date as "startDate",
                b.end_date as "endDate",
                b.status
            FROM bookings b
            JOIN profiles p ON b.user_id = p.id
            JOIN rooms r ON b.room_id = r.id
        `;

        res.json({ bookings });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Could not fetch bookings" });
    }
});

// 2. GET all Rooms
// app.get("/api/rooms", async (req, res) => {
//     try {
//         const { data: rooms, error } = await supabase
//             .from('rooms')
//             .select('*');

//         if (error) {
//             return res.status(400).json({ error: error.message });
//         }
//         res.json(rooms);
//         console.log(rooms);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});