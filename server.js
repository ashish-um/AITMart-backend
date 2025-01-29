require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const listingRoutes = require("./routes/listings");

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/listings", listingRoutes); // Listing routes

// Health check endpoint
app.get("/", (req, res) => {
  res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Campus Marketplace</title>
          <style>
            body { 
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              font-family: Arial, sans-serif;
              background: #f0f2f5;
            }
            .status {
              padding: 2rem;
              background: white;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="status">
            <h1>🚀 Server is running</h1>
            <p>Campus Marketplace API</p>
            <p>Try <a href="/api/listings">/api/listings</a></p>
          </div>
        </body>
      </html>
    `);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
