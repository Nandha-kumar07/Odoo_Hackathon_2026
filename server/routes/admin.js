const express = require("express");
const pool = require("../db");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

// @route   GET /api/admin/stats
// @desc    Get platform statistics
// @access  Private (In real app, Admin only)
router.get("/stats", authMiddleware, async (req, res) => {
    try {
        // 1. Basic Stats
        const usersCount = await pool.query("SELECT COUNT(*) FROM users");
        const tripsCount = await pool.query("SELECT COUNT(*) FROM trips");
        const totalBudget = await pool.query("SELECT SUM(budget) FROM trips");
        const expensesSum = await pool.query("SELECT SUM(amount) FROM expenses");

        // 2. Popular Destinations
        const popularDestinations = await pool.query(`
            SELECT destination as name, COUNT(*) as count 
            FROM trips 
            GROUP BY destination 
            ORDER BY count DESC 
            LIMIT 5
        `);

        // 3. Growth Data (Last 6 months)
        const growthData = await pool.query(`
            SELECT 
                TO_CHAR(created_at, 'Mon') as month,
                COUNT(*) as count
            FROM users
            WHERE created_at > NOW() - INTERVAL '6 months'
            GROUP BY TO_CHAR(created_at, 'Mon'), DATE_TRUNC('month', created_at)
            ORDER BY DATE_TRUNC('month', created_at)
        `);

        // 4. Activity Data (Trips per month)
        const activityData = await pool.query(`
            SELECT 
                TO_CHAR(created_at, 'Mon') as month,
                COUNT(*) as count
            FROM trips
            WHERE created_at > NOW() - INTERVAL '6 months'
            GROUP BY TO_CHAR(created_at, 'Mon'), DATE_TRUNC('month', created_at)
            ORDER BY DATE_TRUNC('month', created_at)
        `);

        res.json({
            success: true,
            stats: {
                totalUsers: parseInt(usersCount.rows[0].count),
                totalTrips: parseInt(tripsCount.rows[0].count),
                totalRevenue: parseFloat(totalBudget.rows[0].sum || 0),
                totalExpenses: parseFloat(expensesSum.rows[0].sum || 0),
                activeNow: Math.floor(Math.random() * 20) + 5, // Mocking "Active Now"
            },
            popularDestinations: popularDestinations.rows,
            growth: growthData.rows,
            activity: activityData.rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
