import { User } from '@prisma/client';

export function GetUserMentor(){
  const User: User = {
    id: 1,
    name: "user01",
    email: "user01@gmail.com",
    password: "user01",
    role: "MENTOR"
  };
  return User
}