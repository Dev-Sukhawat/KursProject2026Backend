import express from "express";
import { supabase } from "../config/supabaseClient.js";
import logger from "../utils/logger.js";

const router = express.Router();

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