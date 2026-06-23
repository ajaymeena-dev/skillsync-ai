// server/src/controllers/commonController.js - IMPROVED VERSION
import User from "../models/User.js";
import { setCache } from "../utils/redisCache.js";
export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const { uploadToCloudinary, deleteFromCloudinary } =
      await import("../middleware/uploadMiddleware.js");

    // Get current user to delete old avatar
    const currentUser = await User.findById(req.user._id);
    const oldAvatarPublicId = currentUser.avatarPublicId;

    // Delete old avatar if exists
    if (oldAvatarPublicId) {
      try {
        await deleteFromCloudinary(oldAvatarPublicId);
        console.log("Old avatar deleted:", oldAvatarPublicId);
      } catch (err) {
        console.warn("Failed to delete old avatar:", err.message);
      }
    }

    // Upload new avatar
    const result = await uploadToCloudinary(req.file.buffer, {
      folder: "skillsync/avatars",
    });

    // Update user with new avatar
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          avatar: result.secure_url,
          avatarPublicId: result.public_id,
        },
      },
      { new: true },
    ).select("-password");

    res.json({
      success: true,
      data: {
        avatar: user.avatar,
        avatarPublicId: user.avatarPublicId,
      },
      message: oldAvatarPublicId
        ? "Avatar updated successfully"
        : "Avatar uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Avatar only
export const deleteAvatar = async (req, res) => {
  try {
    const { deleteFromCloudinary } =
      await import("../middleware/uploadMiddleware.js");

    const user = await User.findById(req.user._id);

    if (!user.avatarPublicId) {
      return res
        .status(400)
        .json({ success: false, message: "No avatar to delete" });
    }

    // Delete from Cloudinary
    await deleteFromCloudinary(user.avatarPublicId);

    // Remove from database
    user.avatar = "";
    user.avatarPublicId = "";
    await user.save();

    res.json({
      success: true,
      message: "Avatar deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Public Stats for Landing Page
export const getPublicStats = async (req, res) => {
  try {
    const { default: Job } = await import("../models/Job.js");
    const { default: Application } = await import("../models/Application.js");

    const totalJobs = await Job.countDocuments();
    const totalCandidates = await User.countDocuments({ role: "jobseeker" });
    const totalCompanies = await User.countDocuments({ role: "recruiter" });
    const totalApplications = await Application.countDocuments();

    const recentUsers = await User.find({ role: "jobseeker" })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name avatar")
      .lean();

    const responseData = {
      success: true,
      data: {
        jobs: totalJobs,
        candidates: totalCandidates,
        companies: totalCompanies,
        applications: totalApplications,
        recentUsers,
      },
    };

    // Cache stats for 5 minutes (300s) to avoid heavy DB counts on every landing page visit
    setCache(req.originalUrl, responseData, 300);

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

import Visitor from "../models/Visitor.js";

// ✅ Track Application Visitor
export const trackVisitor = async (req, res) => {
  try {
    // Get client IP
    let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.ip;
    
    // Clean IP string (sometimes it comes as multiple comma-separated IPs)
    if (ip && ip.includes(",")) {
      ip = ip.split(",")[0].trim();
    }
    
    // Handle localhost testing
    if (ip === "::1" || ip === "127.0.0.1" || ip === "::ffff:127.0.0.1") {
      // Use a dummy IP for local testing so we can see the location API work
      ip = "8.8.8.8"; // Google DNS in California
    }

    const userAgent = req.headers["user-agent"] || "Unknown";
    
    // Check if visitor already exists
    let visitor = await Visitor.findOne({ ipAddress: ip });
    
    if (visitor) {
      // Update existing visitor
      visitor.visits += 1;
      visitor.lastVisit = new Date();
      visitor.userAgent = userAgent;
      await visitor.save();
      
      return res.json({ success: true, message: "Visitor updated" });
    }
    
    // New visitor: Fetch location data from free ip-api
    let locationData = {};
    try {
      const response = await fetch(`http://ip-api.com/json/${ip}`);
      if (response.ok) {
        const data = await response.json();
        if (data.status === "success") {
          locationData = {
            city: data.city,
            region: data.regionName,
            country: data.country,
            lat: data.lat,
            lon: data.lon,
            isp: data.isp,
          };
        }
      }
    } catch (apiError) {
      console.error("IP-API Error:", apiError.message);
    }
    
    // Create new visitor
    visitor = new Visitor({
      ipAddress: ip,
      userAgent,
      ...locationData,
    });
    
    await visitor.save();
    res.json({ success: true, message: "Visitor tracked successfully" });
    
  } catch (error) {
    console.error("Track Visitor Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Visitors (For Admin/Analytics)
export const getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ lastVisit: -1 });
    res.json({ success: true, data: visitors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
