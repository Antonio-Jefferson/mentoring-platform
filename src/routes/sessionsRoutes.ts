import { Router } from "express";
import sessionsControllers from "../controllers/sessionsControllers";

const sessionsRoutes = Router();

sessionsRoutes.post('/', sessionsControllers.create);

export default sessionsRoutes;
