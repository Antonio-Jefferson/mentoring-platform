import { Router } from "express";
import userController from "../controllers/userController";
import { validateBody } from "../middlewares/validationMiddleware";
import { createUserSchema } from "../schemas/userSchemas";

const userRoutes = Router();

userRoutes.post("/", validateBody(createUserSchema), userController.create);
userRoutes.post('/add-skill', userController.addSkill);
userRoutes.put('/skill', userController.removeSkill)
userRoutes.get("/mentors", userController.findAllMentors);
userRoutes.get("/mentors/:mentorId", userController.findByMentorId);

export default userRoutes;