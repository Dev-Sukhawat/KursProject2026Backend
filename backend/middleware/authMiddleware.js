import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { log } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const supabaseJWT = process.env.SUPABASE_JWT_SECRET;

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ error: "Ingen token hittades" });

    jwt.verify(token, supabaseJWT, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Ogiltig token" });
        req.user = decoded;
        next();
    });
};

export const requireRole = (role) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
    }
    if (req.user.role !== role) {
        return res.status(403).json({ error: "Access denied" });
    }
    next();
};