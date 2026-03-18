import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { supabase } from "../config/supabaseClient.js";
import logger from "../utils/logger.js";

const router = express.Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const supabaseJWT = process.env.SUPABASE_JWT_SECRET

// ==========================================
// AUTH & USERS (Create & Read)
// ==========================================

router.post("/register", async (req, res) => {
    const { full_name, password, email, role = "user" } = req.body;

    if (!full_name || !email || !password) {
        logger.warn("Register attempt with missing fields");
        return res.status(400).json({ error: "All fields are required" });
    }

    const formattedEmail = email.toLowerCase().trim();
    const formattedName = full_name.toLowerCase().trim();
    const formattedRole = role.toLowerCase().trim();

    try {
        const { data: existingUser } = await supabase
            .from('profiles')
            .select('email')
            .eq('email', formattedEmail)
            .maybeSingle();

        if (existingUser) {
            logger.warn(`Register failed - email already exists: ${formattedEmail}`);
            return res.status(409).json({ error: "A user with this email already exists" })
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const { data, error } = await supabase
            .from('profiles')
            .insert([{
                full_name: formattedName,
                password: hashedPassword,
                role: formattedRole,
                email: formattedEmail,
            }])
            .select();

        if (error) throw error;

        logger.info(`New user registered: ${formattedEmail}`);
        res.status(201).json({
            message: "User Created",
            user: { id: data[0].id, name: data[0].full_name, email: data[0].email }
        });
    } catch (error) {
        logger.error(`Register failed - ${error.message}`);
        res.status(500).json({ error: error.message });
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        logger.warn("Login attempt with missing fields");
        return res.status(400).json({ error: "All fields are required" });
    }

    const formattedEmail = email.toLowerCase().trim();

    try {
        const { data: user, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('email', formattedEmail)
            .single();

        if (error || !user) {
            logger.warn(`Login failed - user not found: ${formattedEmail}`);
            return res.status(401).json({ error: "Wrong email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            logger.warn(`Login failed - incorrect password: ${formattedEmail}`);
            return res.status(401).json({ error: "Wrong email or password" });
        }

        const token = jwt.sign(
            { id: user.id, name: user.full_name, email: user.email, role: user.role },
            supabaseJWT,
            { expiresIn: '1h' }
        );

        logger.info(`User logged in: ${formattedEmail}`);
        res.json({ token, user: { id: user.id, name: user.full_name, role: user.role } });
    } catch (error) {
        logger.error(`Login failed - ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// Profiles (Users) CRUD
// ==========================================
router.get("/users", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('role', 'user')
            .order('full_name', { ascending: true });
        if (error) throw error;
        logger.info(`Fetched ${data.length} users`);
        res.status(200).json(data);
    } catch (err) {
        logger.error(`Failed to fetch users - ${err.message}`);
        res.status(500).json({ error: err.message });
    }
});




// ==========================================
// ROOMS CRUD
// ==========================================

// READ ALL
router.get("/rooms", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('rooms')
            .select('*')
            .order('capacity', { ascending: true });
        if (error) throw error;
        logger.info(`Fetched ${data.length} rooms`);
        res.status(200).json(data);
    } catch (err) {
        logger.error(`Failed to fetch rooms - ${err.message}`);
        res.status(500).json({ error: err.message });
    }
});

// CREATE ROOM
router.post("/rooms", async (req, res) => {
    const { name, type, capacity, available } = req.body;
    try {
        const { data, error } = await supabase.from('rooms').insert([{ name, type, capacity, available }]).select();
        if (error) throw error;
        logger.info(`Room created: ${data[0].name}`);
        res.status(201).json(data[0]);
    } catch (err) {
        logger.error(`Failed to create room - ${err.message}`);
        res.status(500).json({ error: err.message });
    }
});

// UPDATE ROOM
router.put("/rooms/:id", async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const { data, error } = await supabase.from('rooms').update(updates).eq('id', id).select();
        if (error) throw error;
        logger.info(`Room updated: ${id}`);
        res.json(data[0]);
    } catch (err) {
        logger.error(`Failed to update room - ${err.message}`);
        res.status(500).json({ error: err.message });
    }
});

// DELETE ROOM
router.delete("/rooms/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { error } = await supabase.from('rooms').delete().eq('id', id);
        if (error) throw error;
        logger.info(`Room deleted: ${id}`);
        res.json({ message: "Room deleted" });
    } catch (err) {
        logger.error(`Failed to delete room - ${err.message}`);
        res.status(500).json({ error: err.message });
    }
});




// ==========================================
// BOOKINGS CRUD
// ==========================================

// READ ALL
router.get("/bookings", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('bookings')
            .select(`
                id,
                status,
                start_date,
                end_date,
                user_id,
                room_id,
                created_at,
                profiles (full_name),
                rooms (name)
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        logger.info(`Fetched ${data.length} bookings`);

        // Flatten the data
        const formatted = data.map(({ profiles, rooms, start_date, end_date, ...rest }) => ({
            ...rest,
            userName: profiles?.full_name || "Unknown User",
            roomName: rooms?.name || "Unknown Room",
            startDate: start_date,
            endDate: end_date,
        }));

        res.json(formatted);
    } catch (err) {
        logger.error(`Failed to fetch bookings - ${err.message}`);
        res.status(500).json({ error: err.message });
    }
});

// CREATE BOOKING
router.post("/bookings", async (req, res) => {
    const { user_id, room_id, start_date, end_date } = req.body;
    try {
        const { data, error } = await supabase
            .from('bookings')
            .insert([{
                user_id,
                room_id,
                start_date: new Date(start_date).toISOString(),
                end_date: new Date(end_date).toISOString(),
                status: 'active'
            }])
            .select()
            .single();

        if (error) {
            if (error.message.includes("no_overlapping_bookings")) {
                logger.warn(`Booking conflict for room: ${room_id}`);
                return res.status(409).json({ error: "Room is already booked for this time." });
            }
            throw error;
        }
        logger.info(`Booking created: ${data.id}`);
        res.status(201).json(data);
    } catch (err) {
        logger.error(`Failed to create booking - ${err.message}`);
        res.status(500).json({ error: err.message });
    }
});

// Read specific booking
router.get("/bookings/availability", async (req, res) => {
    const { roomId, startDate, endDate, excludeId } = req.query;

    if (!roomId || !startDate || !endDate) {
        logger.warn("Availability check missing params");
        return res.status(400).json({ error: "roomId, startDate and endDate are required" });
    }

    try {
        let query = supabase
            .from("bookings")
            .select("id, start_date, end_date")
            .eq("room_id", roomId)
            .eq("status", "active");

        // Only exclude if provided (for edit bookings)
        if (excludeId) {
            query = query.neq("id", excludeId);
        }

        const { data, error } = await query;
        if (error) throw error;

        const hasOverlap = data.some(
            (b) =>
                new Date(startDate) < new Date(b.end_date) &&
                new Date(endDate) > new Date(b.start_date),
        );

        logger.info(`Availability check for room ${roomId}: ${!hasOverlap ? "available" : "unavailable"}`);
        res.json({ available: !hasOverlap });
    } catch (err) {
        logger.error(`Availability check failed: ${err.message}`, { err });
        res.status(500).json({ error: err.message });
    }
});

// READ specific booking via ID
router.get("/bookings/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const { data, error } = await supabase
            .from('bookings')
            .select(`
                id,
                status,
                start_date,
                end_date,
                user_id,
                room_id,
                profiles (full_name, email),
                rooms (name, type)
            `)
            .eq('user_id', userId);

        if (error) throw error;
        if (!data) return res.status(404).json({ error: "Inga bokningar hittades" });

        const formatted = data.map(({ profiles, rooms, start_date, end_date, ...rest }) => ({
            ...rest,
            userName: profiles?.full_name || "Unknown User",
            userEmail: profiles?.email || "Unknown Email",
            roomName: rooms?.name || "Unknown Room",
            startDate: new Date(start_date).toISOString(),
            endDate: new Date(end_date).toISOString(),
        }));

        logger.info(`Fetched ${formatted.length} bookings for user ${userId}`);
        res.status(200).json(formatted);
    } catch (err) {
        logger.error(`Failed to fetch bookings for user ${userId}: ${err.message}`, { err });
        res.status(500).json({ error: err.message });
    }
});

// UPDATE BOOKING
router.put("/bookings/:id", async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const { data, error } = await supabase
            .from('bookings')
            .update(updates)
            .eq('id', id)
            .select();
        if (error) throw error;

        const formatted = data.map(bookings => ({
            ...bookings,
            userName: bookings.profiles?.full_name || "Unknown User",
            roomName: bookings.rooms?.name || "Unknown Room",
            startDate: bookings.start_date,
            endDate: bookings.end_date
        }));

        logger.info(`Booking updated: ${id}`);
        res.json(formatted);
    } catch (err) {
        logger.error(`Failed to update booking ${id} - ${err.message}`, { err });
        res.status(500).json({ error: err.message });
    }
});

// DELETE BOOKING
router.delete("/bookings/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { error } = await supabase.from('bookings').delete().eq('id', id);
        if (error) throw error;
        logger.info(`Booking cancelled: ${id}`);
        res.json({ message: "Booking cancelled" });
    } catch (err) {
        logger.error(`Failed to cancel booking ${id}: ${err.message}`, { err });
        res.status(500).json({ error: err.message });
    }
});

export default router;