import { User, UserRole } from '@prisma/client';

export type CreateUserType = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export type CreateSessionsRequest = {
  mentorId: number;
  menteeId: number;
  skillId: number;
  startTime: Date;
  endTime: Date;
}
