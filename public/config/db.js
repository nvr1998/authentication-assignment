// db.js
import mongoose from "mongoose";

const mongoURI = process.env.MONGODB_URI; // Include your database name here

export const ConnectToDB = async () => {
  try {
    await mongoose.connect(mongoURI);

    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};
