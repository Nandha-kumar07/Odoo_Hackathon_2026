require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for the hackathon
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Test API
app.get("/", (req, res) => {
  res.send("GlobeTrotter Backend API 🚀");
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/trips", require("./routes/trips"));
app.use("/api", require("./routes/activities")); // Note: activities route handles /trips/:id/activities and /activities/:id
app.use("/api", require("./routes/itinerary")); // Note: itinerary route handles /trips/:id/itinerary and /itinerary/:id
app.use("/api/expenses", require("./routes/expenses"));
app.use("/api/search", require("./routes/search"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/posts", require("./routes/posts"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
