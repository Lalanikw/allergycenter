
import mongoose from 'mongoose';
import "dotenv/config";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

async function dbConnect() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
      console.log("db connected");
    }
  } catch (error) {
    console.log("Error connecting to database:", error);
    throw error;  // Re-throw to handle it in the calling code
  }
}

export default dbConnect;