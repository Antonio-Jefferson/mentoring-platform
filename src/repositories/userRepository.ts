import { Prisma } from '@prisma/client';
import { prisma } from '../config/database';

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

export async function findAllMentors() {
  return await prisma.user.findMany({
    where: { role: 'MENTOR' },
    select: {
      name: true,
      sessionsMentor: {
        select: {
          rating: true,
        },
      },
    },
  })
}

async function findByMentorId(mentorId: number) {
  return await prisma.user.findUnique({
    where: { id: mentorId },
    select: {
      name: true,
      email: true,
      skills: {
        select: {
          name: true,
        },
      },
      sessionsMentor: {
        select: {
          rating: true,
        },
      },
    },
  });
}

export default {
  findByEmail,
  create,
  findAllMentors,
  findByMentorId
}