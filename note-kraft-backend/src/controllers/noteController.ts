import { Request, Response } from "express";
import NoteModel from "../models/note";
import { NoteDTO } from "../dtos/note-dto";
import { Note } from "../types/note";
import NoteHistory from "../models/note-history";

/**
 * Saves note to history
 */
const saveNoteToHistory = async (
  noteId: string,
  title: string,
  content: string
) => {
  try {
    const noteHistory = new NoteHistory({
      title,
      content,
      parentNote: noteId,
    });
    await noteHistory!.save();
  } catch (error) {
    console.log("Failed to save note to history");
  }
};
/**
 * Update an existing note with new title and content
 */
export const saveNote = async (req: Request, res: Response) => {
  try {
    const { _id, title, content, user } = req.body as NoteDTO;

    let note;
    if (_id) {
      const savedNote = await NoteModel.findById(_id);
      if (!savedNote) {
        return res.status(402).json({ error: "Error saving this note" });
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

export const getNotesForUser = async (req: Request, res: Response) => {
  const { user } = req.body;
  if (!user || !user._id) {
    return res.status(404).json({ error: "User not found" });
  }
  const currentUserId = user._id;

  try {
    const notes: Note[] = await NoteModel.find({
      creator: currentUserId,
    }).exec();
    res.json(notes);
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
