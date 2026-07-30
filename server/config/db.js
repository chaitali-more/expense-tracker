import mongoose from "mongoose";
import dns from "dns";
import dotenv from "dotenv";

dotenv.config();

// Fix Node.js DNS SRV lookup issues on Windows
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (err) {
  console.warn("Could not override default DNS servers:", err.message);
}

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("MongoDB Error: MONGO_URI is missing in .env file");
      return;
    }
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:");
    console.error(error.message);
    if (error.name === "MongooseServerSelectionError") {
      console.error("\n💡 FIX REQUIRED: Your IP address is not whitelisted in MongoDB Atlas!");
      console.error("1. Go to https://cloud.mongodb.com/");
      console.error("2. Navigate to Network Access -> Add IP Address");
      console.error("3. Click 'ALLOW ACCESS FROM ANYWHERE' (0.0.0.0/0) or add your current IP.\n");
    }
  }
};

export default connectDB;