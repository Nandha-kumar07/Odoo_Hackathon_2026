const { Pool } = require("pg");
require("dotenv").config();
const fs = require("fs");

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false },
});

async function setupDatabase() {
    try {
        console.log("🔄 Setting up database...");

        // Read and execute schema.sql
        const schema = fs.readFileSync("./schema.sql", "utf8");
        await pool.query(schema);

        console.log("✅ Database tables created successfully!");
        console.log("✅ Sample data inserted!");
        console.log("\n📝 You can now:");
        console.log("   1. Start the server: npm run dev");
        console.log("   2. Test login with: alex@globetrotter.com / password123");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error setting up database:", error.message);
        process.exit(1);
    }
}

setupDatabase();
