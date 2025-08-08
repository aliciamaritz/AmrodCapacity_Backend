const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const { Pool } = require("pg");

// PostgreSQL connection via Railway environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Test route for DB
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ dbTime: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection failed." });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("Hello from AmrodCapacity backend!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

