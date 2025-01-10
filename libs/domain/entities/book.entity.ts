import { z } from 'zod';

export enum ReadStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export const ReadStatusEnumSchema = z.nativeEnum(ReadStatus);

export type TReadStatusEnum = z.infer<typeof ReadStatusEnumSchema>;

export const BookSchema = z.object({
  id: z.string().cuid(),
  authorId: z.string(),
  categoryId: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  subImages: z.array(z.string()).optional(),
  pages: z.number(),
  publishedOn: z.date(),
  readStatus: ReadStatusEnumSchema.optional().nullable(),
});

export type Book = z.infer<typeof BookSchema>;
