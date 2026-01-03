const express = require("express");
const pool = require("../db");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

// @route   GET /api/expenses/trip/:tripId
// @desc    Get all expenses for a trip
// @access  Private
router.get("/trip/:tripId", authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT e.* FROM expenses e
       JOIN trips t ON e.trip_id = t.id
       WHERE e.trip_id = $1 AND t.user_id = $2
       ORDER BY e.expense_date DESC`,
            [req.params.tripId, req.user.id]
        );
        res.json({ success: true, expenses: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// @route   POST /api/expenses
// @desc    Add a new expense
// @access  Private
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { trip_id, category, amount, description, expense_date } = req.body;

        if (!trip_id || !category || !amount || !expense_date) {
            return res.status(400).json({ error: "Please provide all required fields" });
        }

        // Verify trip belongs to user
        const tripCheck = await pool.query(
            "SELECT * FROM trips WHERE id = $1 AND user_id = $2",
            [trip_id, req.user.id]
        );

        if (tripCheck.rows.length === 0) {
            return res.status(404).json({ error: "Trip not found" });
        }

        const result = await pool.query(
            `INSERT INTO expenses (trip_id, category, amount, description, expense_date) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [trip_id, category, amount, description, expense_date]
        );

        res.status(201).json({ success: true, expense: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// @route   GET /api/expenses/summary/:tripId
// @desc    Get expense summary by category for a trip
// @access  Private
router.get("/summary/:tripId", authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT category, SUM(amount) as total
       FROM expenses e
       JOIN trips t ON e.trip_id = t.id
       WHERE e.trip_id = $1 AND t.user_id = $2
       GROUP BY category`,
            [req.params.tripId, req.user.id]
        );
        res.json({ success: true, summary: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
