export class Email {
  private readonly email: string;

  constructor(email: string) {
    if (!this.isValid(email)) {
      throw new Error('Invalid email address');
    }
    this.email = email;
  }

  private isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  toString(): string {
    return this.email;
  }
}
