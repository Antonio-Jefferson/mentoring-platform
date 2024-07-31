import { CreateSessionsRequest } from "../@types/types";
import { conflictError } from "../errors/conflictError";
import sessionsRepository from "../repositories/sessionsRepository";
import userRepository from "../repositories/userRepository";
import skillRepository from "../repositories/skillRepository";
import { notFoundError } from '../errors/notFoundError';
import googleCalendar from "./googleCalendar";

async function create({ menteeId, mentorId, skillId, startTime, endTime }: CreateSessionsRequest) {
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

  const event = {
    summary: `Mentoria com o mentor ${mentor.name}`,
    description: `Mentoria de ${skill.name}`,
    start: {
      dateTime: startTime,
      timeZone: 'America/Sao_Paulo',
    },
    end: {
      dateTime: endTime,
      timeZone: 'America/Sao_Paulo',
    },
  };

    await googleCalendar.createEvent(event);
    const session = await sessionsRepository.create({ menteeId, mentorId, skillId, startTime, endTime });
    return session;
}


async function assessment(sessionId:number, assessment: number) {
  const session = await sessionsRepository.sessionExist(sessionId);

  if(!session){
    throw notFoundError("session not found")
  }
  await sessionsRepository.assessment(sessionId, assessment)
}

export default {
  create,
  assessment
}