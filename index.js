import express from "express";
import { createUser } from "./controllers/user.js";
import connectDB from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// User route
app.post("/api/users", createUser);

// Start server with database connection
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
