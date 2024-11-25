import { z } from "zod";

export const BookSchema = z.object({
  readStatus: z
    .enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"])
    .optional()
    .nullable(),
  id: z.string().cuid(),
  authorId: z.string(),
  categoryId: z.string(),
  name: z.string(),
  description: z.string(),
  publishedOn: z.date(),
});

export const RecommendedBooksSchema = BookSchema.pick({
  id: true,
  name: true,
  description: true,
})
  .extend({
    category: z.object({
      name: z.string(),
    }),
  })
  .extend({
    author: z.object({
      name: z.string(),
    }),
  })
  .extend({
    feedback: z.object({
      rating: z.number(),
    }),
  });

export type TRecommendedBooks = z.infer<typeof RecommendedBooksSchema>;

export type TGetRecommendedBooks = {
  status: number;
  body: {
    data: TRecommendedBooks[];
    message: string;
  };
  success: boolean;
};
