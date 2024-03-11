import mongoose, { Schema } from "mongoose";
import { Note } from "../types/note";

const noteVersionSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  parentNote: { type: Schema.Types.ObjectId, ref: "Notes", required: true },
  lastChangedAt: {
    type: Date,
    default: Date.now,
  },
});

noteVersionSchema.pre("save", function (next) {
  this.lastChangedAt = new Date();
  next();
});

export default mongoose.model<Note>("NotesVersion", noteVersionSchema);
