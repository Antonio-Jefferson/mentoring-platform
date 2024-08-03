import { NextFunction, Response, Request } from "express";
import authService from "../services/authService";

async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  try {
    const response = await authService.login(email, password);
    res.status(200).send({"token":response});
  } catch (error) {
    next(error)
  }
}

export default {
  login
}