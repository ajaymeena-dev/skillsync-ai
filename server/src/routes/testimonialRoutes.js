import express from "express";
import {
  getPublicTestimonials,
  submitTestimonial,
} from "../controllers/testimonialController.js";
import { protect } from "../middleware/authMiddleware.js";
import { cacheMiddleware } from "../middleware/cacheMiddleware.js";

const router = express.Router();

router.get("/public/all",cacheMiddleware,getPublicTestimonials);
router.post("/", protect, submitTestimonial);

export default router;
