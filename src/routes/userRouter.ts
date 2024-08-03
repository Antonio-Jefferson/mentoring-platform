import { Router } from "express";
import userController from "../controllers/userController";
import { validateBody } from "../middlewares/validationMiddleware";
import { createUserSchema } from "../schemas/userSchemas";
import { authenticateToken } from '../middlewares/authMiddleware';

const userRoutes = Router();

userRoutes.post("/", validateBody(createUserSchema), userController.create);
userRoutes.post('/add-skill', authenticateToken, userController.addSkill);
userRoutes.put('/skill', authenticateToken, userController.removeSkill)
userRoutes.get("/mentors", authenticateToken, userController.findAllMentors);
userRoutes.get("/mentors/:mentorId", authenticateToken, userController.findByMentorId);
userRoutes.get("/mentors/:mentorId/schedule", authenticateToken, userController.findMentorSchedule);
userRoutes.get("/mentees/:menteeId/schedule", authenticateToken, userController.findMenteeSchedule);


export default userRoutes;