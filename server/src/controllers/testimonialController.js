import Testimonial from "../models/Testimonial.js";
import { setCache, deleteCache } from "../utils/redisCache.js";

// @desc    Submit or update a testimonial
// @route   POST /api/testimonials
// @access  Private
export const submitTestimonial = async (req, res) => {
  try {
    const { content, rating } = req.body;
    const userId = req.user._id;
    const role = req.user.role;
    
    if (!content || !rating) {
      return res.status(400).json({
        success: false,
        message: "Please provide content and rating",
      });
    }

    // Check if user already submitted a testimonial
    let testimonial = await Testimonial.findOne({ userId });

    if (testimonial) {
      // Update existing
      testimonial.content = content;
      testimonial.rating = rating;
      await testimonial.save();
    } else {
      // Create new
      testimonial = await Testimonial.create({
        userId,
        content,
        rating,
        role,
      });
    }

    // Testimonial change hua, cache udao
    deleteCache("/api/testimonials/public/all");

    res.status(200).json({
      success: true,
      data: testimonial,
      message: "Feedback submitted successfully!",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all public testimonials
// @route   GET /api/testimonials/public/all
// @access  Public
export const getPublicTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isApproved: true })
      .populate("userId", "name avatar role profession currentRole company")
      .sort({ createdAt: -1 })
      .lean(); // ✅ Optmization: 3x faster reads

    const formattedTestimonials = testimonials.map((t) => {
      let roleText;
      if (t.role === "recruiter") {
        roleText = t.userId?.company?.name ? `Recruiter at ${t.userId.company.name}` : "Recruiter";
      } else {
        roleText = t.userId?.profession || t.userId?.currentRole || "Job Seeker";
      }
      
      return {
        _id: t._id,
        name: t.userId?.name || "Anonymous User",
        role: roleText,
        avatar: t.userId?.avatar || (t.role === "recruiter" ? "👨‍💼" : "👨‍💻"),
        content: t.content,
        rating: t.rating,
        createdAt: t.createdAt,
      };
    });

    const top3testimonials = formattedTestimonials.filter(t=>t.rating >=4).slice(0,3);                     
    
    const responseData = {
      success: true,
      data: {
        allTestominal: formattedTestimonials,
        top3Testimonials: top3testimonials,
      },
    };

    setCache(req.originalUrl, responseData);

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
