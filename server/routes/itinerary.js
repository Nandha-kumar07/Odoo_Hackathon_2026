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

// @route   POST /api/itinerary/generate/:tripId
// @desc    Generate a smart itinerary based on traveler type and destination
// @access  Private
router.post('/itinerary/generate/:tripId', auth, async (req, res) => {
    try {
        const { tripId } = req.params;

        // Fetch Trip Details
        const tripResult = await pool.query(
            'SELECT * FROM trips WHERE id = $1 AND user_id = $2',
            [tripId, req.user.id]
        );

        if (tripResult.rows.length === 0) {
            return res.status(404).json({ error: 'Trip not found or unauthorized' });
        }

        const trip = tripResult.rows[0];
        const dest = trip.destination.split(',')[0].trim();
        const type = trip.traveler_type || 'Solo';

        // Knowledge Base for Smarter Suggestions
        const KNOWLEDGE_BASE = {
            'Kyoto': {
                'Solo': [
                    { time: '09:00', title: 'Fushimi Inari Hike', desc: 'Walk through thousands of torii gates.', type: 'sightseeing', loc: 'Fushimi Inari Shrink' },
                    { time: '13:00', title: 'Nishiki Market Lunch', desc: 'Try local street food solo.', type: 'food', loc: 'Nishiki Market' },
                    { time: '15:00', title: 'Zen Meditation', desc: 'Find peace in a local temple.', type: 'art & culture', loc: 'Kennin-ji' }
                ],
                'Couple': [
                    { time: '10:00', title: 'Arashiyama Bamboo Grove', desc: 'Romantic stroll through the forest.', type: 'sightseeing', loc: 'Arashiyama' },
                    { time: '18:00', title: 'Gion Kaiseki Dinner', desc: 'Traditional multi-course dinner.', type: 'food', loc: 'Gion District' },
                    { time: '20:00', title: 'Kamogawa Riverside Walk', desc: 'Evening walk by the river.', type: 'romance', loc: 'Kamo River' }
                ],
                'Friends': [
                    { time: '11:00', title: 'Golden Pavilion Visit', desc: 'Group photos at Kinkaku-ji.', type: 'sightseeing', loc: 'Kinkaku-ji' },
                    { time: '19:00', title: 'Pontocho Alley Pub Crawl', desc: 'Explore hidden bars with friends.', type: 'food & drink', loc: 'Pontocho' }
                ],
                'Family': [
                    { time: '10:00', title: 'Kyoto Railway Museum', desc: 'Fun for kids and adults.', type: 'sightseeing', loc: 'Kyoto Railway Museum' },
                    { time: '14:00', title: 'Maruyama Park Picnic', desc: 'Space for kids to run around.', type: 'leisure', loc: 'Maruyama Park' }
                ]
            }
            // Add more as needed or use a generic generator below
        };

        const duration = Math.ceil((new Date(trip.end_date) - new Date(trip.start_date)) / (86400000)) + 1;

        for (let i = 1; i <= Math.min(duration, 7); i++) {
            const dayTitle = `Day ${i}: Exploring ${dest}`;
            const dayDesc = `A curated day for a ${type} trip focusing on ${dest}'s highlights.`;

            const dayResult = await pool.query(
                'INSERT INTO itineraries (trip_id, day_number, title, description) VALUES ($1, $2, $3, $4) RETURNING id',
                [tripId, i, dayTitle, dayDesc]
            );

            // Add Activities
            const dayDate = new Date(new Date(trip.start_date).getTime() + (i - 1) * 86400000);
            const suggestions = KNOWLEDGE_BASE[dest] ? KNOWLEDGE_BASE[dest][type] : null;

            if (suggestions && suggestions[i - 1]) {
                const activity = suggestions[i - 1];
                await pool.query(
                    'INSERT INTO activities (trip_id, title, description, activity_date, activity_time, location, activity_type, is_added) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                    [tripId, activity.title, activity.desc, dayDate, activity.time, activity.loc, activity.type, true]
                );
            } else {
                // Generic suggested activities if no specific knowledge
                const genericTitle = i % 2 === 0 ? `Must-visit Landmark in ${dest}` : `Local Food Experience in ${dest}`;
                const genericType = i % 2 === 0 ? 'sightseeing' : 'food';
                const genericLoc = `${dest} City Center`;
                await pool.query(
                    'INSERT INTO activities (trip_id, title, description, activity_date, activity_time, location, activity_type, is_added) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                    [tripId, genericTitle, `Automatic suggestion for ${type} travelers in ${dest}.`, dayDate, '10:00', genericLoc, genericType, true]
                );
            }
        }

        res.json({ success: true, message: 'Itinerary generated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
