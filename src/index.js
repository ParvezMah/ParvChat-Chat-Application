import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.listen(5001, ()=>{
    console.log("server is running " + PORT);
    connectDB();
})