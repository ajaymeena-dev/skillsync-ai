// backend/src/routes/commonRoutes.js
import express from "express";
import {
  uploadAvatar,
  deleteAvatar,
  getPublicStats,
  trackVisitor,
  getVisitors,
} from "../controllers/commonController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadAvatar as uploadAvatarMiddleware } from "../middleware/uploadMiddleware.js";
import { cacheMiddleware } from "../middleware/cacheMiddleware.js";

const router = express.Router();

// ✅ Public Routes
router.get("/stats",cacheMiddleware, getPublicStats);
router.post("/track-visit", trackVisitor);

// ✅ Protected Routes (Accessible by both JobSeeker and Recruiter)
router.use(protect);

router.post("/avatar", uploadAvatarMiddleware, uploadAvatar);
router.delete("/avatar", deleteAvatar);
router.get("/visitors", getVisitors); // Ideally you'd want a developer/admin role check here

export default router;
