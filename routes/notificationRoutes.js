import express from "express";
import {
  getNotifications,
  markNotificationsAsRead,
} from "../controllers/notificationController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getNotifications);
router.post("/mark-read", authMiddleware, markNotificationsAsRead);

export default router;
