import express from "express";
import { 
    signUp, 
    signIn, 
    signOut 
} from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);// send data to frontend
authRouter.post("/signin", signIn);// send data to frontend
authRouter.get("/signout", signOut);// nothing to send 

export default authRouter;