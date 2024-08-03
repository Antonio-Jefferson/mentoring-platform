import { Router } from "express";
import skillController from "../controllers/skillController";
import { authenticateToken } from "../middlewares/authMiddleware";

const skillRoutes = Router();

skillRoutes.get('/', authenticateToken, skillController.findAll);
skillRoutes.post('/:userId',authenticateToken, skillController.createSkill);

export default skillRoutes;