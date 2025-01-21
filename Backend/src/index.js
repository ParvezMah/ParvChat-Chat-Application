import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

// Middlewares
app.use(express.json()); //to parse incoming JSON data in the request body so you can access it as req.body
app.use(cookieParser()); //to parse cookies attached to client requests, making them easily accessible through req.cookies.
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(5001, ()=>{
    console.log("server is running " + PORT);
    connectDB();
})