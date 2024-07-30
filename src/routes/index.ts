import { Router } from "express";
import userRoutes from "./userRouter";
import skillRoutes from "./skillRoutes";
import sessionsRoutes from "./sessionsRoutes";
import authRoutes from "./authRoutes";

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/skills', skillRoutes)
routes.use('/sessions', sessionsRoutes);
routes.use('', authRoutes);

export default routes;

