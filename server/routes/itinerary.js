const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// Get itinerary days for a trip
router.get('/trips/:tripId/itinerary', auth, async (req, res) => {
    try {
        const { tripId } = req.params;

        // Check trip ownership
        const tripCheck = await pool.query(
            'SELECT * FROM trips WHERE id = $1 AND user_id = $2',
            [tripId, req.user.id]
        );

        if (tripCheck.rows.length === 0) {
            return res.status(404).json({ error: 'Trip not found or unauthorized' });
        }

        const result = await pool.query(
            'SELECT * FROM itineraries WHERE trip_id = $1 ORDER BY day_number',
            [tripId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add an itinerary day
router.post('/trips/:tripId/itinerary', auth, async (req, res) => {
    try {
        const { tripId } = req.params;
        const { day_number, title, description } = req.body;

        const tripCheck = await pool.query(
            'SELECT * FROM trips WHERE id = $1 AND user_id = $2',
            [tripId, req.user.id]
        );

        if (tripCheck.rows.length === 0) {
            return res.status(404).json({ error: 'Trip not found or unauthorized' });
        }

        const newDay = await pool.query(
            'INSERT INTO itineraries (trip_id, day_number, title, description) VALUES ($1, $2, $3, $4) RETURNING *',
            [tripId, day_number, title, description]
        );

        res.json(newDay.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update itinerary day
router.put('/itinerary/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { day_number, title, description } = req.body;

        const itinCheck = await pool.query(
            'SELECT i.* FROM itineraries i JOIN trips t ON i.trip_id = t.id WHERE i.id = $1 AND t.user_id = $2',
            [id, req.user.id]
        );

        if (itinCheck.rows.length === 0) {
            return res.status(404).json({ error: 'Itinerary day not found or unauthorized' });
        }

        const updated = await pool.query(
            'UPDATE itineraries SET day_number = $1, title = $2, description = $3 WHERE id = $4 RETURNING *',
            [day_number, title, description, id]
        );

        res.json(updated.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete itinerary day
router.delete('/itinerary/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;

        const itinCheck = await pool.query(
            'SELECT i.* FROM itineraries i JOIN trips t ON i.trip_id = t.id WHERE i.id = $1 AND t.user_id = $2',
            [id, req.user.id]
        );

        if (itinCheck.rows.length === 0) {
            return res.status(404).json({ error: 'Itinerary day not found or unauthorized' });
        }

        await pool.query('DELETE FROM itineraries WHERE id = $1', [id]);
        res.json({ message: 'Itinerary day deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
