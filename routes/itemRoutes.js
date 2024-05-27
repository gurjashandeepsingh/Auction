import express from "express";
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import upload from "../utils/upload.js";

const router = express.Router();

router.get("/", authMiddleware, getAllItems);
router.get("/:id", authMiddleware, getItemById);
router.post("/", authMiddleware, upload.single("image"), createItem);
router.put("/:id", authMiddleware, updateItem);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteItem);

export default router;
