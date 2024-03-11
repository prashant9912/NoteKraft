import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import {
  deleteNoteById,
  saveNote,
  getNotesWithAccess,
  getNotesHistory,
  shareNoteWithUser,
  findAccessByNoteId,
} from "../controllers/noteController";

const router = express.Router();

router.delete("/deleteNote", authMiddleware, deleteNoteById);
router.post("/getNotes", authMiddleware, getNotesWithAccess);
router.put("/saveNote", authMiddleware, saveNote);

router.post("/history", authMiddleware, getNotesHistory);

//share note endpoints
router.put("/shareNote", authMiddleware, shareNoteWithUser);
router.post("/getAccessList", authMiddleware, findAccessByNoteId);

export default router;
