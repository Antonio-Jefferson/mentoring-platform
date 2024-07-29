import { CreateSessionsRequest } from "../@types/types";
import { conflictError } from "../errors/conflictError";
import sessionsRepository from "../repositories/sessionsRepository";
import userRepository from "../repositories/userRepository";
import skillRepository from "../repositories/skillRepository";
import { notFoundError } from '../errors/notFoundError';

async function create({menteeId, mentorId, skillId, startTime, endTime}: CreateSessionsRequest) {

  const mentor = await userRepository.mentorExists(mentorId);
  if (!mentor) {
    throw notFoundError("Mentor not found");
  }

  const skill = await skillRepository.skillExists(skillId);
  if (!skill) {
    throw notFoundError("Skill not found");
  }

  const conflictingSession = await sessionsRepository.findConflictingSession(mentorId, startTime, endTime);
  if (conflictingSession) {
    throw conflictError("Mentor is not available at the specified time");
  }

  const session = await sessionsRepository.create({ menteeId, mentorId, skillId, startTime, endTime });
  return session;
}

async function assessment(sessionId:number, assessment: number) {
  const session = await sessionsRepository.sessionExist(sessionId);

  console.log({session})
  if(!session){
    throw notFoundError("session not found")
  }

  await sessionsRepository.assessment(sessionId, assessment)
}

export default {
  create,
  assessment
}