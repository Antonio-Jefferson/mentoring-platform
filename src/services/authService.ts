import { compare } from "bcrypt";
import { notFoundError } from "../errors/notFoundError";
import jwt from 'jsonwebtoken';
import authRepository from "../repositories/authRepository"
import { invalidCredentialsError } from "../errors/invalidCredentialsError";
import * as dotenv from 'dotenv';
dotenv.config();

async function login(email: string, password: string) {
  const user =  await authRepository.findUser(email);
  const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error('JWT_SECRET is not defined');
}


  if(!user) throw notFoundError("user not exist");

  const isValuePassword = await compare(password, user.password);

  if(!isValuePassword) throw invalidCredentialsError();

  const token = await jwt.sign({id: user.id}, secret, {expiresIn: "7d"});

  return token;
}

export default {
  login
}