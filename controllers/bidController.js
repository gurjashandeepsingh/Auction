import Bid from "../models/bid.js";
import Item from "../models/item.js";
import { io } from "../app.js";

export const placeBid = async (req, res) => {
  const { bid_amount } = req.body;
  try {
    const item = await Item.findByPk(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    if (bid_amount <= item.current_price) {
      return res
        .status(400)
        .json({ message: "Bid amount must be higher than current price" });
    }
    const bid = await Bid.create({
      bid_amount,
      item_id: req.params.itemId,
      user_id: req.user.id,
    });
    await item.update({ current_price: bid_amount });
    io.emit("bidPlaced", {
      itemId: req.params.itemId,
      bid_amount,
      user_id: req.user.id,
    });
    res.status(201).json(bid);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getBidsByItemId = async (req, res) => {
  try {
    const bids = await Bid.findAll({ where: { item_id: req.params.itemId } });
    res.json(bids);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
