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

async function changeStatus(sessionId: number,) {
  const session = await sessionsRepository.sessionExist(sessionId);

  if (!session) {
    throw notFoundError("Session not found");
  }

  const mentee = await userRepository.menteeExists(session.menteeId);
  const skill = await skillRepository.skillExists(session.skillId);

  const event = {
    summary: `Mentoria com o ${mentee?.name}`,
    description: `Mentoria de ${skill?.name}`,
    start: {
      dateTime: session.startTime,
      timeZone: 'America/Sao_Paulo',
    },
    end: {
      dateTime: session.endTime,
      timeZone: 'America/Sao_Paulo',
    },
  };

  const dataResponse = await googleCalendar.createEvent(event);
  if(!dataResponse) {
    console.log("Error", dataResponse)
  }else{
    const updatedSession = await sessionsRepository.updateStatus(sessionId);
    return updatedSession;
  }
}

export default {
  create,
  assessment,
  changeStatus
}