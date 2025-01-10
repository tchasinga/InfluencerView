import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const urlmongoDB = process.env.MONGODB_URL;

const mongoconnection = async () => {
  try {
    await mongoose.connect(urlmongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Optional: Add a timeout for server selection
    });
    console.log("🚀 MongoDB connection established successfully!");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
  }
};

export default mongoconnection;
