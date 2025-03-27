import express from "express";
import multer from "multer";
import { register, login, logout } from "../controllers/authControllers.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Pastikan folder "uploads" ada
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/register", upload.single("profilePicture"), register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
