import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js";

dotenv.config({
    path: './.env'
})


const app=express();
const PORT=process.env.PORT || 5001
app.use(express.json());

app.use("/api/auth",authRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
    connectDB();
})