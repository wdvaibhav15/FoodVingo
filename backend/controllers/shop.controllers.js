import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";



export const createAndUpdateShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;
    let image;

    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const owner = req.userId;
    let shop = await Shop.findOne({ owner });

    if (!shop) {
      if (!name || !city || !state || !address) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Create new shop
      shop = await Shop.create({
        name,
        city,
        state,
        address,
        image,
        owner,
      });

      // Populate after creation
      shop = await shop.populate("owner");

      return res.status(201).json({ message: "Shop created successfully", shop });
    } else {
      // Update existing shop
      const updateData = { name, city, state, address };
      if (image) updateData.image = image;

      shop = await Shop.findByIdAndUpdate(shop._id, updateData, { new: true }).populate("owner itrms");

      return res.status(200).json({ message: "Shop updated successfully", shop });
    }
  } catch (error) {
    console.error("Create/Update Shop Error:", error);
    return res.status(500).json({ message: `Create Shop error: ${error.message}` });
  }
};


// controller for getMyshop
export const getMyShop = async (req, res) => {
    try {
        const shop = await Shop.findOne({owner:req.userId}).populate("owner")
        if(!shop){
            return null
        }
        return res.status(200).json({message:"Shop found successfully",shop})
    } catch (error) {
        return res.status(500).json({message:`Get Shop error ${error}`})
    }
}
