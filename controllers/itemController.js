import { Op } from "sequelize";
import Item from "../models/item.js";

export const getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createItem = async (req, res) => {
  const { name, description, starting_price, end_time } = req.body;
  const image_url = req.file ? req.file.path : null;
  try {
    const item = await Item.create({
      name,
      description,
      starting_price,
      current_price: starting_price,
      end_time,
      image_url,
      user_id: req.user.id,
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    await item.destroy();
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// export const searchItems = async (req, res) => {
//   const searchString = req.body;
//   const searchQuery = {
//     [Op.or]: [
//       { name: { [Op.like]: `%${searchString}%` } },
//       { description: { [Op.like]: `%${searchString}%` } },
//     ],
//   };
//   try {
//     const items = await Item.findAll({ where: searchQuery });
//     if (items.length === 0) {
//       return "Unable to find anything related to your search";
//     }
//     return items;
//   } catch (error) {
//     console.error("Error searching for items:", error);
//     throw error;
//   }
// };

export const searchItems = async (req, res) => {
  try {
    const { searchString } = req.body;
    console.log(searchString);
    const items = await Item.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${searchString}%` } },
          { description: { [Op.like]: `%${searchString}%` } },
        ],
      },
    });
    console.log(items);
    res.json(items);
  } catch (error) {
    console.error("Error searching items:", error);
    throw error;
  }
};
