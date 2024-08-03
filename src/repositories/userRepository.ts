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
      id: true,
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
    where: { id: mentorId, role: 'MENTOR' },
    select: {
      id: true,
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


async function mentorExists(mentorId: number) {
  return prisma.user.findUnique({
    where: {
      id: mentorId,
      role: 'MENTOR'
    },
  });
}

async function menteeExists(menteeId: number) {
  return prisma.user.findUnique({
    where: {
      id: menteeId,
      role: 'MENTEE'
    },
  });
}

async function addSkillToUser(userId: number, skillId: number){
  return await prisma.user.update({
    where: { id: userId },
    data: {
      skills: {
        connect: { id: skillId },
      },
    },
  });
}

async function userHasSkill(userId: number, skillId: number){
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { skills: true },
  });

  return user?.skills.some((skill) => skill.id === skillId);
}

async function removeSkill(userId: number, skillId: number) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      skills: {
        disconnect: { id: skillId },
      },
    },
  });
}

async function getMentorSchedule(mentorId: number) {
  return await prisma.session.findMany({
    where: { mentorId, status: 'SCHEDULED' },
    include: {
      mentee: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

async function getMenteeSchedule(menteeId: number) {
  return await prisma.session.findMany({
    where: { menteeId, status: 'SCHEDULED' },
    include: {
      mentor: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}


export default {
  findByEmail,
  create,
  findAllMentors,
  findByMentorId,
  mentorExists,
  menteeExists,
  addSkillToUser,
  userHasSkill,
  removeSkill,
  getMentorSchedule,
  getMenteeSchedule,
}