import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Rate limiting setup
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Adjust based on your traffic
    message: "Too many requests from this IP, please try again later.",
});

// CORS middleware configuration
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Normalize the origin by removing any trailing slash
        const normalizedOrigin = origin.replace(/\/$/, "");
        // Allowed origin from environment variable or fallback
        const allowedOrigin = (process.env.FRONTEND_URL || 'http://localhost:3000').replace(/\/$/, "");

        // Compare the normalized incoming origin with the allowed origin
        if (normalizedOrigin === allowedOrigin) {
            return callback(null, true);
        } else {
            console.error(`CORS error: Request from origin "${normalizedOrigin}" not allowed.`);
            return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

// Standard middleware
app.use(express.json());
app.use(cookieParser());
app.use(limiter);



// Simple home route
app.get("/", (req, res) => {
    res.send("Welcome to the react Backend!");
});

// API routes
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use(errorHandler);

// MongoDB connection
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        console.log("Connected to MongoDB");

        // Start the cron job for removing unverified users (if applicable)
        const { default: removeUnverifiedUsers } = await import("./services/removeUnverifiedAccounts.js");
        removeUnverifiedUsers();
    })
    .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
