import { Request, Response } from "express";
import NoteModel from "../models/note";
import { NoteDTO } from "../dtos/note-dto";
import { Note } from "../types/note";
import NoteHistory from "../models/note-history";
import NoteAccess from "../models/note-access";
import UserModel from "../models/user";

/**
 * Saves note to history
 */
async function saveNoteToHistory(
  noteId: string,
  title: string,
  content: string
) {
  try {
    const noteHistory = new NoteHistory({
      title,
      content,
      parentNote: noteId,
    });
    await noteHistory!.save();
  } catch (error) {
    console.log("Failed to save note to history", error);
  }
}

async function addNewNoteToAccess(userId: string, noteId: string) {
  try {
    const noteAccess = new NoteAccess({
      note: noteId,
      user: userId,
      accessLevel: "owner",
    });
    await noteAccess.save();
  } catch (error) {
    console.log("Failed to add new note to accesss", error);
  }
}

/**
 * Update an existing note with new title and content
 */
export const saveNote = async (req: Request, res: Response) => {
  try {
    const { _id, title, content, user } = req.body as NoteDTO;

    const isNewNote = !_id;

    let note;

    if (!isNewNote) {
      const savedNote = await NoteModel.findById(_id);
      if (!savedNote) {
        return res.status(404).json({ error: "Note not found" });
      }

      await saveNoteToHistory(_id, savedNote.title, savedNote.content);

      if (title) {
        savedNote!.title = title;
      }
      if (content) savedNote!.content = content;

      note = savedNote;
    } else {
      note = new NoteModel({
        title,
        content: content,
        creator: user._id,
        updatedAt: new Date(),
      });
    }

    const savedNote = await note!.save();

    if (isNewNote) {
      await addNewNoteToAccess(user._id, savedNote._id);
    }

    res.json(savedNote);
  } catch (error) {
    const errorMsg = "Failed to save note";
    console.error(errorMsg, error);
    res.status(500).json({ error: errorMsg });
  }
};

/**
 * Delete a note by ID
 */
export const deleteNoteById = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;

    const deletedNote = await NoteModel.findByIdAndDelete(_id);
    await NoteAccess.deleteMany({ note: _id });

    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note deleted successfully", deletedNote });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Failed to delete note" });
  }
};

/**
 * Find notes where the creator field matches the provided user ID
 */

export const getNotesWithAccess = async (req: Request, res: Response) => {
  const { user } = req.body;
  if (!user || !user._id) {
    return res.status(404).json({ error: "User not found" });
  }
  const currentUserId = user._id;

  try {
    const notesWithAccess = await NoteAccess.find({ user: currentUserId })
      .populate("note")
      .exec();

    res.json(notesWithAccess);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

/**
 * Find notes history by its parent note
 */
export const getNotesHistory = async (req: Request, res: Response) => {
  const { noteId } = req.body;

  try {
    const notesHistory: Note[] = await NoteHistory.find({
      parentNote: noteId,
    })
      .sort({ lastChangedAt: -1 })
      .exec();
    res.json(notesHistory);
  } catch (error) {
    console.error("Error fetching history notes:", error);
    res.status(500).json({ error: "Failed to fetch history notes" });
  }
};

/**
 * Share note with user
 */
export const shareNoteWithUser = async (req: Request, res: Response) => {
  try {
    const { userEmail, shareLevel, noteId } = req.body;

    if (!shareLevel) {
      return res.status(402).json({ error: "Share level is blank" });
    }

    const user = await UserModel.findOne({ email: userEmail });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    const note = await NoteModel.findById(noteId);
    if (!note) {
      console.log("Note not found");
      return res.status(404).json({ error: "Note not found" });
    }

    // check if user already have access
    const existingNoteAccess = await NoteAccess.findOne({
      note: noteId,
      user: user._id,
    });
    if (existingNoteAccess) {
      return res
        .status(400)
        .json({ error: "User already has access to this note" });
    }

    const newNoteAccess = new NoteAccess({
      note: noteId,
      user: user._id,
      accessLevel: shareLevel,
    });

    await newNoteAccess.save();

    res.json({ message: "Note shared successfully" });
  } catch (error) {
    console.log("Error sharing note:", error);
    res.status(500).json({ error: "Failed to share note" });
  }
};

/**
 * Find all access entries for a given note ID
 * and return a list containing user email and access type
 */
export const findAccessByNoteId = async (req: Request, res: Response) => {
  try {
    const { noteId } = req.body;

    const accessEntries = await NoteAccess.find({ note: noteId }).populate(
      "user",
      "email"
    );

    if (!accessEntries) {
      return res
        .status(404)
        .json({ error: "No access entries found for the note ID" });
    }

    const accessList = accessEntries.map((entry: any) => ({
      userEmail: entry.user.email,
      accessLevel: entry.accessLevel,
    }));

    res.json(accessList);
  } catch (error) {
    console.error("Error finding access entries:", error);
    res.status(500).json({ error: "Failed to find access entries" });
  }
};
