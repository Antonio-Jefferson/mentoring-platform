const { PrismaClient, UserRole } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const skill1 = await prisma.skill.create({
    data: {
      name: 'JavaScript',
    },
  });

  const skill2 = await prisma.skill.create({
    data: {
      name: 'Python',
    },
  });


  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: UserRole.MENTOR,
      skills: {
        connect: [{ id: skill1.id }, { id: skill2.id }],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: 'password123',
      role: UserRole.MENTEE,
      skills: {
        connect: [{ id: skill1.id }],
      },
    },
  });

  await prisma.session.create({
    data: {
      mentor: {
        connect: { id: user1.id },
      },
      mentee: {
        connect: { id: user2.id },
      },
      skill: {
        connect: { id: skill1.id },
      },
      startTime: new Date('2024-08-01T10:00:00Z'),
      endTime: new Date('2024-08-01T11:00:00Z'),
      rating: 5,
    },
  });

  await prisma.session.create({
    data: {
      mentor: {
        connect: { id: user1.id },
      },
      mentee: {
        connect: { id: user2.id },
      },
      skill: {
        connect: { id: skill2.id },
      },
      startTime: new Date('2024-08-02T10:00:00Z'),
      endTime: new Date('2024-08-02T11:00:00Z'),
    },
  });
}

main()
  .then(() => {
    console.log('Seed data created successfully.');
  })
  .catch((e) => {
    console.error('Error creating seed data:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
