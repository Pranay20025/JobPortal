import express from "express"
import { registerUser, loginUser, updateProfile, logoutUser, userProfile } from "../controller/userController.js";
import isAuthenticated from "../middleware/authentication.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);
userRouter.get("/profile",isAuthenticated, userProfile);
userRouter.post("/profile/update",isAuthenticated, updateProfile);

export default userRouter;