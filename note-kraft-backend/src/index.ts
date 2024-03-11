import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./database/db";

import userRoutes from "./routes/userRoutes";
import noteRoutes from "./routes/noteRoutes";
import uploadRoutes from "./routes/uploadRoutes";

import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Notekart server");
});

// Set up routes
app.use("/api/notes", noteRoutes);
app.use("/api/user", userRoutes);
app.use("/api/upload", uploadRoutes);

//connects to mongo DB
connectDB();

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
