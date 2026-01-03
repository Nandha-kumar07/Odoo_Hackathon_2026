require('dotenv').config();
const pool = require('./db');

async function migrate() {
    try {
        await pool.query('ALTER TABLE trips ADD COLUMN traveler_type VARCHAR(50);');
        console.log('Migration successful: traveler_type added to trips table.');
        process.exit(0);
    } catch (err) {
        if (err.code === '42701') {
            console.log('Column traveler_type already exists.');
            process.exit(0);
        }
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

migrate();
