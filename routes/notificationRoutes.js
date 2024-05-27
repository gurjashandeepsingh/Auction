import express from "express";
import {
  getNotifications,
  markNotificationsAsRead,
} from "../controllers/notificationController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import rateLimit from "../middlewares/rateLimit.js";

const router = express.Router();
router.use(rateLimit);

router.get("/", authMiddleware, getNotifications);
router.post("/mark-read", authMiddleware, markNotificationsAsRead);

export default router;
