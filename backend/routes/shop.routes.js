import express from "express";
import { createAndUpdateShop } from "../controllers/shop.controllers.js";
import { isAuth } from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";



const shopRouter = express.Router();

shopRouter.post("create-update", isAuth, upload.single("image"), createAndUpdateShop);

export default shopRouter;


