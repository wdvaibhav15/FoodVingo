import express from "express";
import { 
    signUp, 
    signIn, 
    signOut, 
    sendOtp,
    varifyOtp,
    resetPassword
} from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);// send data to frontend
authRouter.post("/signin", signIn);// send data to frontend
authRouter.get("/signout", signOut);// nothing to send
authRouter.post("/send-otp", sendOtp);// send data to frontend 
authRouter.post("/varify-otp", varifyOtp);// send data to frontend
authRouter.post("/reset-password", resetPassword);// send data to frontend

export default authRouter;