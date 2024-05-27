import express from "express";
import { placeBid, getBidsByItemId } from "../controllers/bidController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:itemId/bids", authMiddleware, placeBid);
router.get("/:itemId/bids", authMiddleware, getBidsByItemId);

export default router;
