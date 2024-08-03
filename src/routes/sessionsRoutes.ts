import { Router } from "express";
import sessionsControllers from "../controllers/sessionsControllers";
import { validateBody } from "../middlewares/validationMiddleware";
import { createSessionsSchema } from "../schemas/sessionSchema";
import { authenticateToken } from "../middlewares/authMiddleware";

const sessionsRoutes = Router();

sessionsRoutes.post('/', authenticateToken, validateBody(createSessionsSchema), sessionsControllers.create);
sessionsRoutes.patch('/:sessionId/status/confirm', authenticateToken, sessionsControllers.changeStatus);
sessionsRoutes.post('/:sessionId/rate', authenticateToken, sessionsControllers.assessment)

export default sessionsRoutes;
