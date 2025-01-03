export enum UserRoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

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
