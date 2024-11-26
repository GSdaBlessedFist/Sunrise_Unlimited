import mongoose from 'mongoose';
let isConnected;

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection.");
    return;
  }
  
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);

    isConnected = db.connections[0].readyState;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
};

export default connectDB;
