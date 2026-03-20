import express from "express";
import { supabase } from "../config/supabaseClient.js";
import logger from "../utils/logger.js";
import {io} from "../server.js";

const router = express.Router();

// ==========================================
// ROOMS CRUD
// ==========================================

// READ ALL
router.get("/", async (req, res) => {
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
router.post("/", async (req, res) => {
    const { name, type, capacity, available } = req.body;
    try {
        const { data, error } = await supabase.from('rooms').insert([{ name, type, capacity, available }]).select();
        if (error) throw error;
        logger.info(`Room created: ${data[0].name}`);
        io.emit("room:created", data[0]);
        res.status(201).json(data[0]);
    } catch (err) {
        logger.error(`Failed to create room - ${err.message}`);
        res.status(500).json({ error: err.message });
    }
});

// UPDATE ROOM
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const { data, error } = await supabase.from('rooms').update(updates).eq('id', id).select();
        if (error) throw error;
        logger.info(`Room updated: ${id}`);
        io.emit("room:updated", data[0]);
        res.json(data[0]);
    } catch (err) {
        logger.error(`Failed to update room - ${err.message}`);
        res.status(500).json({ error: err.message });
    }
});

// DELETE ROOM
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { error } = await supabase.from('rooms').delete().eq('id', id);
        if (error) throw error;
        logger.info(`Room deleted: ${id}`);
        io.emit("room:deleted", {id});
        res.json({ message: "Room deleted" });
    } catch (err) {
        logger.error(`Failed to delete room - ${err.message}`);
        res.status(500).json({ error: err.message });
    }
});

export default router;