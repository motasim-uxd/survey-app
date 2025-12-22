import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }

  console.log("ENV CHECK:", {
    NODE_ENV: process.env.NODE_ENV,
    MONGO_URI: process.env.MONGO_URI
  });

};

export default connectDB;
