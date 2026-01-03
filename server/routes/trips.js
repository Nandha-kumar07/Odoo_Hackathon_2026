const express = require("express");
const pool = require("../db");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

// @route   GET /api/trips
// @desc    Get all trips for logged-in user
// @access  Private
router.get("/", authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM trips WHERE user_id = $1 ORDER BY created_at DESC",
            [req.user.id]
        );
        res.json({ success: true, trips: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// @route   GET /api/trips/:id
// @desc    Get single trip by ID
// @access  Private
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM trips WHERE id = $1 AND user_id = $2",
            [req.params.id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Trip not found" });
        }

        res.json({ success: true, trip: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// @route   POST /api/trips
// @desc    Create a new trip
// @access  Private
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { name, destination, start_date, end_date, budget, image_url } = req.body;

        if (!name || !destination || !start_date || !end_date) {
            return res.status(400).json({ error: "Please provide all required fields" });
        }

        const result = await pool.query(
            `INSERT INTO trips (user_id, name, destination, start_date, end_date, budget, image_url, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [req.user.id, name, destination, start_date, end_date, budget || 0, image_url, "planning"]
        );

        res.status(201).json({ success: true, trip: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// @route   PUT /api/trips/:id
// @desc    Update a trip
// @access  Private
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { name, destination, start_date, end_date, budget, status, image_url } = req.body;

        const result = await pool.query(
            `UPDATE trips 
       SET name = COALESCE($1, name), 
           destination = COALESCE($2, destination),
           start_date = COALESCE($3, start_date),
           end_date = COALESCE($4, end_date),
           budget = COALESCE($5, budget),
           status = COALESCE($6, status),
           image_url = COALESCE($7, image_url)
       WHERE id = $8 AND user_id = $9 RETURNING *`,
            [name, destination, start_date, end_date, budget, status, image_url, req.params.id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Trip not found" });
        }

        res.json({ success: true, trip: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// @route   DELETE /api/trips/:id
// @desc    Delete a trip
// @access  Private
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(
            "DELETE FROM trips WHERE id = $1 AND user_id = $2 RETURNING *",
            [req.params.id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Trip not found" });
        }

        res.json({ success: true, message: "Trip deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
