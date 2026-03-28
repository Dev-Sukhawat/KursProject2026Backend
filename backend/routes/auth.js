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
            .select('id, full_name, email, role, password')
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

export default router;