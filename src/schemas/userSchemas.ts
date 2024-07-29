import { UserRole } from '@prisma/client';
import Joi from 'joi';
import { CreateUserType } from "../@types/types";

export const createUserSchema = Joi.object<CreateUserType>({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid(...Object.values(UserRole)).required(),
});