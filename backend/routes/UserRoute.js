import express from "express";
import {Signup,Login,Logout} from "../controllers/UserController.js";

const router = express.Router();

router.post("/signup",Signup);
router.post("/login",Login);
router.get("/logout",Logout);

export default router