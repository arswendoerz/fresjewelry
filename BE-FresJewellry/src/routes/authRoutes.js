import express from "express";
import multer from "multer";
import {
  register,
  login,
  logout,
  getCurrentUser,
} from "../controllers/authControllers.js";
import { verifyToken } from "../middleware/verifyToken.js";

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
router.get("/checkAuth", getCurrentUser, verifyToken);

export default router;
