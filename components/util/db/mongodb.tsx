import mongoose from "mongoose";

let isConnected = false; // Track connection status

export const connection = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URL!, {});
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Connection failed: ", err);
    throw err;
  }
};
