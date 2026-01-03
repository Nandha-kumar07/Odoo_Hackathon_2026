const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// Get all activities for the authenticated user (across all trips)
router.get('/', auth, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT a.*, t.name as trip_name FROM activities a JOIN trips t ON a.trip_id = t.id WHERE t.user_id = $1 ORDER BY activity_date, activity_time',
            [req.user.id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get all activities for a trip
router.get('/trips/:tripId/activities', auth, async (req, res) => {
    try {
        const { tripId } = req.params;

        // Check if trip belongs to user
        const tripCheck = await pool.query(
            'SELECT * FROM trips WHERE id = $1 AND user_id = $2',
            [tripId, req.user.id]
        );

        if (tripCheck.rows.length === 0) {
            return res.status(404).json({ error: 'Trip not found or unauthorized' });
        }

        const result = await pool.query(
            'SELECT * FROM activities WHERE trip_id = $1 ORDER BY activity_date, activity_time',
            [tripId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add an activity to a trip
router.post('/trips/:tripId/activities', auth, async (req, res) => {
    try {
        const { tripId } = req.params;
        const { title, description, activity_date, activity_time, location, price, activity_type, is_added } = req.body;

        // Check if trip belongs to user
        const tripCheck = await pool.query(
            'SELECT * FROM trips WHERE id = $1 AND user_id = $2',
            [tripId, req.user.id]
        );

        if (tripCheck.rows.length === 0) {
            return res.status(404).json({ error: 'Trip not found or unauthorized' });
        }

        const newActivity = await pool.query(
            'INSERT INTO activities (trip_id, title, description, activity_date, activity_time, location, price, activity_type, is_added) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [tripId, title, description, activity_date, activity_time, location, price || 0, activity_type, is_added || false]
        );

        res.json(newActivity.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update an activity
router.put('/activities/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, activity_date, activity_time, location, price, activity_type, is_added } = req.body;

        // Verify ownership via trip
        const activityCheck = await pool.query(
            'SELECT a.* FROM activities a JOIN trips t ON a.trip_id = t.id WHERE a.id = $1 AND t.user_id = $2',
            [id, req.user.id]
        );

        if (activityCheck.rows.length === 0) {
            return res.status(404).json({ error: 'Activity not found or unauthorized' });
        }

        const updatedActivity = await pool.query(
            'UPDATE activities SET title = $1, description = $2, activity_date = $3, activity_time = $4, location = $5, price = $6, activity_type = $7, is_added = $8 WHERE id = $9 RETURNING *',
            [title, description, activity_date, activity_time, location, price, activity_type, is_added, id]
        );

        res.json(updatedActivity.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete an activity
router.delete('/activities/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;

        // Verify ownership
        const activityCheck = await pool.query(
            'SELECT a.* FROM activities a JOIN trips t ON a.trip_id = t.id WHERE a.id = $1 AND t.user_id = $2',
            [id, req.user.id]
        );

        if (activityCheck.rows.length === 0) {
            return res.status(404).json({ error: 'Activity not found or unauthorized' });
        }

        await pool.query('DELETE FROM activities WHERE id = $1', [id]);
        res.json({ message: 'Activity deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
