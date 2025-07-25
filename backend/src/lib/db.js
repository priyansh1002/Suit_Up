import mongoose from "mongoose"

export const connectDB= async () => {
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MOngoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error connecting to mongoDB",error);
        process.exit(1); //this is if it fails to cnnect databse
    }
}