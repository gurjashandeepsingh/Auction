import express from "express";
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  searchItems,
} from "../controllers/itemController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import rateLimit from "../middlewares/rateLimit.js";
import upload from "../utils/upload.js";

const router = express.Router();
router.use(rateLimit);

router.get("/", authMiddleware, getAllItems);
router.get("/getbyid/:id", authMiddleware, getItemById);
router.post("/", authMiddleware, upload.single("image"), createItem);
router.put("/:id", authMiddleware, updateItem);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteItem);
router.get("/search", searchItems);

export default router;
