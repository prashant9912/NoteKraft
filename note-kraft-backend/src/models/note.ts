import mongoose, { Schema } from "mongoose";
import { Note } from "../types/note";

const noteSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  sharedWith: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

noteSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<Note>("Notes", noteSchema);
