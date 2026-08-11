import express from "express";
import { addItem, editItems } from "../controllers/items.controllers.js";
import { isAuth } from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

const itemRouter = express.Router();

itemRouter.post("/add-item", isAuth, upload.single("image"), addItem)
itemRouter.put("/edit-item/:itemId", isAuth, upload.single("image"), editItems)

export default itemRouter