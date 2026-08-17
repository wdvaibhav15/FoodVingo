// import item from "../models/item.model.js";
// import Shop from "../models/shop.model.js";
// import uploadOnCloudinary from "../utils/cloudinary.js";

// // controller for add item
// export const addItem = async (req, res) => {
//     try {
//         const {name,category,price,foodType} = req.body;
//         let image;
//         if(req.file){
//             image = await uploadOnCloudinary(req.file.path)
//         }
//         const shop = await Shop.findOne({owner:req.userId})
//         if(!shop){
//             return res.status(400).json({message:"Shop not found"})
//         }
//         const item = await item.create({
//             name,
//             category,
//             price,
//             foodType,
//             image,
//             shop:shop._id
//         })
//         return res.status(200).json({message:"Item added successfully",shop})
        
//     } catch (error) {
//         return res.status(500).json({message:`Add item error ${error}`})
//     }
// };

// // controller for edit items
// export const editItems = async (req, res) => {
//     try {
//         const ItemId = req.params.itemId;
//         const {name,category,price,foodType} = req.body;
//         let image;
//         if(req.file){
//             image = await uploadOnCloudinary(req.file.path)
//         }
//         const item = await item.findByIdAndUpdate(ItemId,{name,category,price,foodType,image},{new:true})
//         if(!item){
//             return res.status(400).json({message:"Item not found"})
//         }
//         return res.status(200).json({message:"Item updated successfully",item})
//     } catch (error) {
//         return res.status(500).json({message:`Edit item error ${error}`})
//     }
// }
import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

// Controller for add item
// export const addItem = async (req, res) => {
//   try {
//     const { name, category, price, foodType } = req.body;
//     let image;

//     if (req.file) {
//       image = await uploadOnCloudinary(req.file.path);
//     }

//     const shop = await Shop.findOne({ owner: req.userId });
//     if (!shop) {
//       return res.status(400).json({ message: "Shop not found" });
//     }

//     const newItem = await Item.create({
//       name,
//       category,
//       price,
//       foodType,
//       image,
//       shop: shop._id,
//     });
//     shop.items.push(newItem._id);
//     await shop.save();
//     await shop.populate("items owner");
//     return res.status(201).json({ 
//       message: "Item added successfully", 
//       item: newItem 
//     });
//   } catch (error) {
//     return res.status(500).json({ message: `Add item error: ${error.message}` });
//   }
// };
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
    await shop.populate("items owner");

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

    return res.status(200).json({ 
      message: "Item updated successfully", 
      item: updatedItem 
    });
  } catch (error) {
    return res.status(500).json({ message: `Edit item error: ${error.message}` });
  }
};