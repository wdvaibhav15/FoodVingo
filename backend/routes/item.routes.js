import express from "express";
import { addItem, deleteItem, editItems, getItemById, getItemsByCity } from "../controllers/items.controllers.js";
import { isAuth } from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

const itemRouter = express.Router();

itemRouter.post("/add-item", isAuth, upload.single("image"), addItem)
itemRouter.put("/edit-item/:itemId", isAuth, upload.single("image"), editItems)
itemRouter.get("/get-itemBy-id/:itemId", isAuth, getItemById)
itemRouter.get("/delete/:itemId", isAuth, deleteItem)
itemRouter.get("/get-all-items-by-city/:city", isAuth, getItemsByCity)

export default itemRouter