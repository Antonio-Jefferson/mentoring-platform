import { Prisma } from '@prisma/client';
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

export default {
  create,
  findConflictingSession
}