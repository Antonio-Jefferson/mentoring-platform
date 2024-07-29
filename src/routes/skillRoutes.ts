import { Router } from "express";
import skillController from "../controllers/skillController";

const skillRoutes = Router();

skillRoutes.get('/', skillController.findAll);
skillRoutes.post('/:userId', skillController.createSkill);

export default skillRoutes;