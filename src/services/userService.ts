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

async function findAllMentors() {
  const mentors = await userRepository.findAllMentors();
  const mentorsWithRatings = mentors.map(mentor => {
    const ratings = mentor.sessionsMentor
      .map(session => session.rating)
      .filter((r): r is number => r !== null);

    const averageRating = ratings.length > 0
      ? ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length
      : null;

    return {
      name: mentor.name,
      averageRating: averageRating !== null ? parseFloat(averageRating.toFixed(1)) : null,
    };
  });

  return mentorsWithRatings;
}

export default {
  create,
  findAllMentors
};