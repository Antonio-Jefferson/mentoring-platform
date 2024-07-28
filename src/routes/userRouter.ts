import { Router } from "express";
import userController from "../controllers/userController";

const userRoutes = Router();

userRoutes.post("/", userController.create);
userRoutes.get("/", userController.getAll);

export default userRoutes;