import mongoose from "mongoose";

const Connection = async () => {
  try {
    const connectionState = mongoose.connection.readyState;

    if (connectionState === 1) return;

    if (connectionState === 2) console.log("connecting");

    await mongoose.connect(process.env.connectionString);

    if (connectionState === 1) return console.log("Database Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

export default Connection;
