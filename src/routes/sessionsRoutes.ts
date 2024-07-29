import { Router } from "express";
import sessionsControllers from "../controllers/sessionsControllers";
import { validateBody } from "../middlewares/validationMiddleware";
import { createSessionsSchema } from "../schemas/sessionSchema";

const sessionsRoutes = Router();

sessionsRoutes.post('/', validateBody(createSessionsSchema), sessionsControllers.create);
sessionsRoutes.post('/:sessionId/rate', sessionsControllers.assessment)

export default sessionsRoutes;
