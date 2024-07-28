import { UserRole } from '@prisma/client';

type CreateUserType = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};


export default CreateUserType;
