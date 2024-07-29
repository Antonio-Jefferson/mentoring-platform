import { CreateSessionsRequest } from "../@types/types";
import { conflictError } from "../errors/conflictError";
import sessionsRepository from "../repositories/sessionsRepository";
import userRepository from "../repositories/userRepository";
import skillRepository from "../repositories/skillRepository";
import { notFoundError } from '../errors/notFoundError';

async function create({menteeId, mentorId, skillId, startTime, endTime}: CreateSessionsRequest) {
  const conflictingSession = await sessionsRepository.findConflictingSession(mentorId, startTime, endTime);

  const mentor = await userRepository.mentorExists(mentorId);
  if (!mentor) {
    throw notFoundError("Mentor not found");
  }

  const skill = await skillRepository.skillExists(skillId);
  if (!skill) {
    throw notFoundError("Skill not found");
  }

  if (conflictingSession) {
    throw conflictError("Mentor is not available at the specified time");
  }

  const session = await sessionsRepository.create({ menteeId, mentorId, skillId, startTime, endTime });
  return session;
}

export default {
  create
}