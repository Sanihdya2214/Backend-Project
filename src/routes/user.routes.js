import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router=Router()

router.route("/register").post(registerUser) //now here when register user is call than is goes to registerUser code 
  //This is the working of the routes , here we will not use app,get ahd app.post fucntions directly

export default router