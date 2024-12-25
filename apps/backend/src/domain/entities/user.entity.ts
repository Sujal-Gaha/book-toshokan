import { UserRoleEnum } from '@prisma/client';

export class User {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public password: string,
    public image?: string,
    public role: UserRoleEnum = UserRoleEnum.USER
  ) {}
}
