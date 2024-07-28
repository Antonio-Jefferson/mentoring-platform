import { Router } from "express";
import userController from "../controllers/userController";
import { validateBody } from "../middlewares/validationMiddleware";
import { createUserSchema } from "../schemas/userSchemas";

const userRoutes = Router();

userRoutes.post("/", validateBody(createUserSchema), userController.create);
userRoutes.get("/mentors", userController.findAll);

export default userRoutes;