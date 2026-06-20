// backend/src/routes/commonRoutes.js
import express from "express";
import {
  uploadAvatar,
  deleteAvatar,
  getPublicStats,
} from "../controllers/commonController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadAvatar as uploadAvatarMiddleware } from "../middleware/uploadMiddleware.js";
import { cacheMiddleware } from "../middleware/cacheMiddleware.js";

const router = express.Router();

// ✅ Public Routes
router.get("/stats",cacheMiddleware, getPublicStats);

// ✅ Protected Routes (Accessible by both JobSeeker and Recruiter)
router.use(protect);

router.post("/avatar", uploadAvatarMiddleware, uploadAvatar);
router.delete("/avatar", deleteAvatar);

export default router;
