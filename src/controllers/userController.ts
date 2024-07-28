import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";

async function create(req: Request, res: Response, next: NextFunction){
  const { name, email, password, role } = req.body;

  try {
    const newUser = await userService.create({name, email, password, role});
    return res.status(201).send(newUser);
  } catch(err){
    return res.status(500).send(err);
  }
}

async function  findAll(req: Request, res: Response, next: NextFunction) {
  console.log("getAll")
}

export default {
  create,
  findAll
}