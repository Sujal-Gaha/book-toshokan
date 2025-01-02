import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','username','email','password','image','role']);

export const AuthorScalarFieldEnumSchema = z.enum(['id','name','about']);

export const CategoryScalarFieldEnumSchema = z.enum(['id','name','description']);

export const BookScalarFieldEnumSchema = z.enum(['id','authorId','categoryId','readStatus','name','description','image','subImages','pages','publishedOn']);

export const FeedbackScalarFieldEnumSchema = z.enum(['id','userId','bookId','averageRating','totalRatings','comment','createdAt','updatedAt']);

export const FeedbackCommentScalarFieldEnumSchema = z.enum(['id','feedbackId','userId','comment','createdAt','updatedAt']);

export const UserBookSubscriptionScalarFieldEnumSchema = z.enum(['id','userId','bookId','readStatus','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const UserRoleEnumSchema = z.enum(['ADMIN','USER']);

export type UserRoleEnumType = `${z.infer<typeof UserRoleEnumSchema>}`

export const ReadStatusEnumSchema = z.enum(['TO_READ','READ','CURRENTLY_READING']);

export type ReadStatusEnumType = `${z.infer<typeof ReadStatusEnumSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: UserRoleEnumSchema,
  id: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  image: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// AUTHOR SCHEMA
/////////////////////////////////////////

export const AuthorSchema = z.object({
  id: z.string(),
  name: z.string(),
  about: z.string(),
})

export type Author = z.infer<typeof AuthorSchema>

/////////////////////////////////////////
// CATEGORY SCHEMA
/////////////////////////////////////////

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
})

export type Category = z.infer<typeof CategorySchema>

/////////////////////////////////////////
// BOOK SCHEMA
/////////////////////////////////////////

export const BookSchema = z.object({
  readStatus: ReadStatusEnumSchema.nullable(),
  id: z.string(),
  authorId: z.string(),
  categoryId: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  subImages: z.string().array(),
  pages: z.number(),
  publishedOn: z.coerce.date(),
})

export type Book = z.infer<typeof BookSchema>

/////////////////////////////////////////
// FEEDBACK SCHEMA
/////////////////////////////////////////

export const FeedbackSchema = z.object({
  id: z.string(),
  userId: z.string(),
  bookId: z.string(),
  averageRating: z.number(),
  totalRatings: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Feedback = z.infer<typeof FeedbackSchema>

/////////////////////////////////////////
// FEEDBACK COMMENT SCHEMA
/////////////////////////////////////////

export const FeedbackCommentSchema = z.object({
  id: z.string(),
  feedbackId: z.string(),
  userId: z.string(),
  comment: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type FeedbackComment = z.infer<typeof FeedbackCommentSchema>

/////////////////////////////////////////
// USER BOOK SUBSCRIPTION SCHEMA
/////////////////////////////////////////

export const UserBookSubscriptionSchema = z.object({
  readStatus: ReadStatusEnumSchema,
  id: z.string(),
  userId: z.string(),
  bookId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type UserBookSubscription = z.infer<typeof UserBookSubscriptionSchema>
