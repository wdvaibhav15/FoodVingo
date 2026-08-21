import express from "express";
import { createAndUpdateShop, getMyShop, getShopByCity } from "../controllers/shop.controllers.js";
import { isAuth } from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";



const shopRouter = express.Router();

shopRouter.post("/create-update", isAuth, upload.single("image"), createAndUpdateShop);
shopRouter.get("/my-shop", isAuth, getMyShop);
shopRouter.get("/shop-by-city/:city", isAuth, getShopByCity);

export default shopRouter;


