import { PrismaClient } from '@prisma/client';

export * from './lib/backend-db';
export const db = new PrismaClient();
