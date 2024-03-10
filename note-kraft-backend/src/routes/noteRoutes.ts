import express from "express";
import {
  deleteNoteById,
  saveNote,
  getNotesForUser,
} from "../controllers/noteController";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = express.Router();

router.delete("/deleteNote", authMiddleware, deleteNoteById);
router.post("/getNotes", authMiddleware, getNotesForUser);
router.put("/saveNote", authMiddleware, saveNote);

export default router;
