import express from "express";
import connectDB from "./db.js";
import bookRouter from "./routers/books.routes.js";
import userRouter from "./routers/user.routes.js";
import adminRouter from "./routers/admin.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// User routes
app.use("/api", userRouter); // Use the user router for user routesz
app.use("/api", bookRouter); // Use the book router for book routes
app.use("/api", adminRouter); // Use the admin router for admin routes

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "API is healthy" });
});

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
