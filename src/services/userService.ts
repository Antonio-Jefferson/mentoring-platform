import { CreateUserType } from "../@types/types";
import bcrypt from 'bcrypt';
import userRepository from "../repositories/userRepository";
import { duplicatedEmailError } from "./errors";
import { notFoundError } from "../errors/notFoundError";

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
      id: mentor.id,
      name: mentor.name,
      averageRating: averageRating !== null ? parseFloat(averageRating.toFixed(1)) : null,
    };
  });

  return mentorsWithRatings;
}

async function findByMentorId(mentorId:number) {
  const mentor = await userRepository.findByMentorId(mentorId);

  if (!mentor) throw notFoundError("Not Found");

  const ratings = mentor.sessionsMentor?.map(session => session.rating) || [];

  const validRatings = ratings.filter(r => r !== null) as number[];

  const averageRating = validRatings.length > 0
    ? validRatings.reduce((acc, curr) => acc + curr, 0) / validRatings.length
    : null;

  return {
    id: mentor.id,
    name: mentor.name,
    email: mentor.email,
    skills: mentor.skills.map(skill => skill.name),
    averageRating: averageRating !== null ? parseFloat(averageRating.toFixed(1)) : null,
  };
}

async function removeSkill(userId: number, skillId: number) {
  const userHasSkill = await userRepository.userHasSkill(userId, skillId);
  
  if (!userHasSkill) {
    throw notFoundError("Skill not found for this user");
  }

  await userRepository.removeSkill(userId, skillId)
}

async function findMentorSchedule(mentorId: number) {
  return await userRepository.getMentorSchedule(mentorId);
};

async function findMenteeSchedule (menteeId: number){
  return await userRepository.getMenteeSchedule(menteeId);
};

export default {
  create,
  findAllMentors,
  findByMentorId,
  removeSkill,
  findMentorSchedule,
  findMenteeSchedule,
};