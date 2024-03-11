import mongoose, { Schema } from "mongoose";

// Define a schema for shared notes
const noteAccessSchema: Schema = new mongoose.Schema({
  note: {
    type: Schema.Types.ObjectId,
    ref: "Notes",
    required: true,
    index: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  accessLevel: {
    type: String,
    enum: ["owner", "editor", "viewer"],
    required: true,
  },
});

const NoteAccess = mongoose.model("NoteAccess", noteAccessSchema);

export default NoteAccess;
