import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { supabase } from "../config/supabaseClient.js";

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

        res.status(201).json({
            message: "User Created",
            user: { id: data[0].id, name: data[0].full_name, email: data[0].email }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "All fields are required" });

    const formattedEmail = email.toLowerCase().trim();

    try {
        const { data: user, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('email', formattedEmail)
            .single();

        if (error || !user) return res.status(401).json({ error: "Wrong email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Wrong email or password" });

        const token = jwt.sign(
            { id: user.id, name: user.full_name, email: user.email, role: user.role },
            supabaseJWT,
            { expiresIn: '1h' }
        );
        // console.log(token, user); // Check what we have in tokens

        res.json({ token, user: { id: user.id, name: user.full_name, role: user.role } });
    } catch (error) {
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
        res.status(200).json(data);
    } catch (err) {
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
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CREATE ROOM
router.post("/rooms", async (req, res) => {
    const { name, type, capacity, available } = req.body;
    try {
        const { data, error } = await supabase.from('rooms').insert([{ name, type, capacity, available }]).select();
        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (err) {
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
        res.json(data[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE ROOM
router.delete("/rooms/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { error } = await supabase.from('rooms').delete().eq('id', id);
        if (error) throw error;
        res.json({ message: "Room deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// BOOKINGS CRUD
// ==========================================

// READ ALL
router.get("/bookings", async (req, res) => {
    try {
        const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: true });
        if (error) throw error;
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CREATE BOOKING
router.post("/bookings", async (req, res) => {
    const { user_id, room_id, start_date, end_date } = req.body;
    try {
        const { data, error } = await supabase.from('bookings').insert([{ user_id, room_id, start_date, end_date }]).select();
        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (err) {
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
        res.json(data[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE BOOKING
router.delete("/bookings/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { error } = await supabase.from('bookings').delete().eq('id', id);
        if (error) throw error;
        res.json({ message: "Booking cancelled" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;