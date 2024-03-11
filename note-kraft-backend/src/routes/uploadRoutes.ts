import multer from "multer";
import { authMiddleware } from "../middlewares/auth-middleware";

const express = require("express");
const uploadController = require("../controllers/uploadController");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post(
  "/file",
  authMiddleware,
  upload.single("file"),
  uploadController.uploadFile
);

export default router;
