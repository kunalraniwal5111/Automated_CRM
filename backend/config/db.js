import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/automatedCRM");
        console.log("Successfully connected to mongodb")

    } catch (error) {
        console.error(error)
    }
}