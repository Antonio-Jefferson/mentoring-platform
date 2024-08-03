import { prisma } from '../config/database';

async function findUser(email: string) {
  const user = prisma.user.findUnique({
    where: {
      email
    }
  })

  return user;
}

export default {
  findUser
}