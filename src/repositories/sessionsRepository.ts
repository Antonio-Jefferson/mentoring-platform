import { prisma } from '../config/database';
import { CreateSessionsRequest } from '../@types/types';

async function create({ menteeId, mentorId, skillId, startTime, endTime }: CreateSessionsRequest) {
  return prisma.session.create({
    data: {
      menteeId,
      mentorId,
      skillId,
      startTime,
      endTime,
    },
  });
}

async function findConflictingSession(mentorId: number, startTime: Date, endTime: Date) {
  return prisma.session.findFirst({
    where: {
      mentorId,
      OR: [
        {
          startTime: {
            lt: endTime,
          },
          endTime: {
            gt: startTime,
          },
        },
      ],
    },
  });
}

async function sessionExist(id: number) {
  const session = await prisma.session.findUnique({
    where: { id },
  });

  return session;
}

async function assessment(id: number, assessment: number) {
  await prisma.session.update({
    where: { id },
    data: { rating: assessment },
  });
}

export default {
  create,
  findConflictingSession,
  sessionExist,
  assessment
}