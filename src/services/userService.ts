import CreateUserType from "../@types/types";
import bcrypt from 'bcrypt';
import userRepository from "../repositories/userRepository";
import { duplicatedEmailError } from "./errors";

async function create({name, email, password, role}: CreateUserType) {
  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    name,
    email,
    password: hashedPassword,
    role
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

export default {
  create
}