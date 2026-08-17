import item from "../models/item.model.js";
import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

// Controller for add item

export const addItem = async (req, res) => {
  try {
    const { name, category, price, foodType } = req.body;
    let image;

    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      return res.status(400).json({ message: "Shop not found" });
    }

    const newItem = await Item.create({
      name,
      category,
      price,
      foodType,
      image,
      shop: shop._id,
    });

    // Ensure items array exists before pushing
    if (!shop.items) {
      shop.items = [];
    }

    shop.items.push(newItem._id);
    await shop.save();
    (await shop.populate("owner")).populate({
      path: "items",
      options:{sort: {updatedAt: -1}}
    });

    return res.status(201).json({
      message: "Item added successfully",
      item: newItem,
      shop,
    });
  } catch (error) {
    return res.status(500).json({ message: `Add item error: ${error.message}` });
  }
};

// Controller for edit items
export const editItems = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const { name, category, price, foodType } = req.body;

    const updateData = { name, category, price, foodType };

    if (req.file) {
      const image = await uploadOnCloudinary(req.file.path);
      updateData.image = image;
    }

    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      updateData,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    const shop = await Shop.findOne({ owner: req.userId }).populate({
      path: "items",
      options:{sort: {updatedAt: -1}}
    });
    return res.status(200).json({ 
      message: "Item updated successfully", 
      item: updatedItem ,
      shop
    });
  } catch (error) {
    return res.status(500).json({ message: `Edit item error: ${error.message}` });
  }
};

// controller for to get a perticular items

export const getItemById = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.status(200).json({ message: "Item found successfully", item });
  } catch (error) {
    return res.status(500).json({ message: `Get item error: ${error.message}` });
  }
};

// delete the food items

export const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const deletedItem = await Item.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    const shop = await Shop.findOne({ owner: req.userId });
    shop.items = shop.items.filter((item) => item._id !== item._id);
    await shop.save();
    await shop.populate({
      path: "items",
      options:{sort: {updatedAt: -1}}
    });
    return res.status(200).json({ message: "Item deleted successfully", shop });
  } catch (error) {
    return res.status(500).json({ message: `Delete item error: ${error.message}` });
  }
};