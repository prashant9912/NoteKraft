import express from "express";
import {
  deleteNoteById,
  saveNote,
  getNotesForUser,
  getNotesHistory,
} from "../controllers/noteController";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = express.Router();

router.post("/history", authMiddleware, getNotesHistory);
router.delete("/deleteNote", authMiddleware, deleteNoteById);
router.post("/getNotes", authMiddleware, getNotesForUser);
router.put("/saveNote", authMiddleware, saveNote);

export default router;
