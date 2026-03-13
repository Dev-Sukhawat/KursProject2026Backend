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

router.post("/register", async (req, res) => {
    const { full_name, password, email, role="user" } = req.body;

    try {
        const {data: existingUser} = await supabase
            .from('profiles')
            .select('email')
            .eq('email', email)
            .single();

            if (existingUser) {
            return res.status(409).json({error: "A user with this email already exists use another email or password" })
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const { data, error } = await supabase
            .from('profiles')
            .insert([
                {
                    full_name: full_name,
                    password: hashedPassword,
                    role: role,
                    email: email,
                }
            ])
            .select();

        if (error) {
            console.error("Supabase Error:", error);
            return res.status(400).json({ error: error.message });
        };
        res.status(201).json({
            message: "User Create",
            user: { id: data[0].id, name: data[0].full_name, email: data[0].email }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const { data: user, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('username', username)
            .single();

        if (error || !user) {
            return res.status(401).json({ error: "Fel användarnamn eller lösenord" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Fel användarnamn eller lösenord" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            supabaseJWT,
            { expiresIn: '1h' }
        );

        res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router
