import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (MONGODB_URI) {
    console.log("Connecting to DB...", MONGODB_URI);
    mongoose.connect(MONGODB_URI);

    mongoose.connection.on("connected", () => {
      console.log("Database connected Successfully");
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Database disconnected");
    });

    mongoose.connection.on("error", () => {
      console.log("Error while connecting with the database ");
    });
  } else {
    console.log("Error while connecting with the database ");
  }
};

export default connectDB;
