import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','username','email','password','role']);

export const AuthorScalarFieldEnumSchema = z.enum(['id','name','about']);

export const CategoryScalarFieldEnumSchema = z.enum(['id','name','description']);

export const BookScalarFieldEnumSchema = z.enum(['id','authorId','categoryId','readStatus','name','description','publishedOn']);

export const FeedbackScalarFieldEnumSchema = z.enum(['id','userId','bookId','rating','comment','createdAt','updatedAt']);

export const FeedbackCommentScalarFieldEnumSchema = z.enum(['id','feedbackId','userId','comment','createdAt','updatedAt']);

export const UserBookSubscriptionScalarFieldEnumSchema = z.enum(['id','userId','bookId','readStatus','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

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
  id: z.string().cuid(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// AUTHOR SCHEMA
/////////////////////////////////////////

export const AuthorSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  about: z.string(),
})

export type Author = z.infer<typeof AuthorSchema>

/////////////////////////////////////////
// CATEGORY SCHEMA
/////////////////////////////////////////

export const CategorySchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
})

export type Category = z.infer<typeof CategorySchema>

/////////////////////////////////////////
// BOOK SCHEMA
/////////////////////////////////////////

export const BookSchema = z.object({
  readStatus: ReadStatusEnumSchema,
  id: z.string().cuid(),
  authorId: z.string(),
  categoryId: z.string(),
  name: z.string(),
  description: z.string(),
  publishedOn: z.coerce.date(),
})

export type Book = z.infer<typeof BookSchema>

/////////////////////////////////////////
// FEEDBACK SCHEMA
/////////////////////////////////////////

export const FeedbackSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  bookId: z.string(),
  rating: z.number().int(),
  comment: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Feedback = z.infer<typeof FeedbackSchema>

/////////////////////////////////////////
// FEEDBACK COMMENT SCHEMA
/////////////////////////////////////////

export const FeedbackCommentSchema = z.object({
  id: z.string().cuid(),
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
  id: z.string().cuid(),
  userId: z.string(),
  bookId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type UserBookSubscription = z.infer<typeof UserBookSubscriptionSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  feedback: z.union([z.boolean(),z.lazy(() => FeedbackFindManyArgsSchema)]).optional(),
  subscriptions: z.union([z.boolean(),z.lazy(() => UserBookSubscriptionFindManyArgsSchema)]).optional(),
  FeedbackComment: z.union([z.boolean(),z.lazy(() => FeedbackCommentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  feedback: z.boolean().optional(),
  subscriptions: z.boolean().optional(),
  FeedbackComment: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  username: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  role: z.boolean().optional(),
  feedback: z.union([z.boolean(),z.lazy(() => FeedbackFindManyArgsSchema)]).optional(),
  subscriptions: z.union([z.boolean(),z.lazy(() => UserBookSubscriptionFindManyArgsSchema)]).optional(),
  FeedbackComment: z.union([z.boolean(),z.lazy(() => FeedbackCommentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// AUTHOR
//------------------------------------------------------

export const AuthorIncludeSchema: z.ZodType<Prisma.AuthorInclude> = z.object({
  books: z.union([z.boolean(),z.lazy(() => BookFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AuthorCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AuthorArgsSchema: z.ZodType<Prisma.AuthorDefaultArgs> = z.object({
  select: z.lazy(() => AuthorSelectSchema).optional(),
  include: z.lazy(() => AuthorIncludeSchema).optional(),
}).strict();

export const AuthorCountOutputTypeArgsSchema: z.ZodType<Prisma.AuthorCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AuthorCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AuthorCountOutputTypeSelectSchema: z.ZodType<Prisma.AuthorCountOutputTypeSelect> = z.object({
  books: z.boolean().optional(),
}).strict();

export const AuthorSelectSchema: z.ZodType<Prisma.AuthorSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  about: z.boolean().optional(),
  books: z.union([z.boolean(),z.lazy(() => BookFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AuthorCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CATEGORY
//------------------------------------------------------

export const CategoryIncludeSchema: z.ZodType<Prisma.CategoryInclude> = z.object({
  books: z.union([z.boolean(),z.lazy(() => BookFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CategoryArgsSchema: z.ZodType<Prisma.CategoryDefaultArgs> = z.object({
  select: z.lazy(() => CategorySelectSchema).optional(),
  include: z.lazy(() => CategoryIncludeSchema).optional(),
}).strict();

export const CategoryCountOutputTypeArgsSchema: z.ZodType<Prisma.CategoryCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CategoryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CategoryCountOutputTypeSelectSchema: z.ZodType<Prisma.CategoryCountOutputTypeSelect> = z.object({
  books: z.boolean().optional(),
}).strict();

export const CategorySelectSchema: z.ZodType<Prisma.CategorySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  books: z.union([z.boolean(),z.lazy(() => BookFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// BOOK
//------------------------------------------------------

export const BookIncludeSchema: z.ZodType<Prisma.BookInclude> = z.object({
  author: z.union([z.boolean(),z.lazy(() => AuthorArgsSchema)]).optional(),
  category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
  feedback: z.union([z.boolean(),z.lazy(() => FeedbackFindManyArgsSchema)]).optional(),
  subscriptions: z.union([z.boolean(),z.lazy(() => UserBookSubscriptionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BookCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const BookArgsSchema: z.ZodType<Prisma.BookDefaultArgs> = z.object({
  select: z.lazy(() => BookSelectSchema).optional(),
  include: z.lazy(() => BookIncludeSchema).optional(),
}).strict();

export const BookCountOutputTypeArgsSchema: z.ZodType<Prisma.BookCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => BookCountOutputTypeSelectSchema).nullish(),
}).strict();

export const BookCountOutputTypeSelectSchema: z.ZodType<Prisma.BookCountOutputTypeSelect> = z.object({
  feedback: z.boolean().optional(),
  subscriptions: z.boolean().optional(),
}).strict();

export const BookSelectSchema: z.ZodType<Prisma.BookSelect> = z.object({
  id: z.boolean().optional(),
  authorId: z.boolean().optional(),
  categoryId: z.boolean().optional(),
  readStatus: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  publishedOn: z.boolean().optional(),
  author: z.union([z.boolean(),z.lazy(() => AuthorArgsSchema)]).optional(),
  category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
  feedback: z.union([z.boolean(),z.lazy(() => FeedbackFindManyArgsSchema)]).optional(),
  subscriptions: z.union([z.boolean(),z.lazy(() => UserBookSubscriptionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BookCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FEEDBACK
//------------------------------------------------------

export const FeedbackIncludeSchema: z.ZodType<Prisma.FeedbackInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  book: z.union([z.boolean(),z.lazy(() => BookArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => FeedbackCommentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FeedbackCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const FeedbackArgsSchema: z.ZodType<Prisma.FeedbackDefaultArgs> = z.object({
  select: z.lazy(() => FeedbackSelectSchema).optional(),
  include: z.lazy(() => FeedbackIncludeSchema).optional(),
}).strict();

export const FeedbackCountOutputTypeArgsSchema: z.ZodType<Prisma.FeedbackCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => FeedbackCountOutputTypeSelectSchema).nullish(),
}).strict();

export const FeedbackCountOutputTypeSelectSchema: z.ZodType<Prisma.FeedbackCountOutputTypeSelect> = z.object({
  comments: z.boolean().optional(),
}).strict();

export const FeedbackSelectSchema: z.ZodType<Prisma.FeedbackSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  bookId: z.boolean().optional(),
  rating: z.boolean().optional(),
  comment: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  book: z.union([z.boolean(),z.lazy(() => BookArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => FeedbackCommentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FeedbackCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FEEDBACK COMMENT
//------------------------------------------------------

export const FeedbackCommentIncludeSchema: z.ZodType<Prisma.FeedbackCommentInclude> = z.object({
  feedback: z.union([z.boolean(),z.lazy(() => FeedbackArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const FeedbackCommentArgsSchema: z.ZodType<Prisma.FeedbackCommentDefaultArgs> = z.object({
  select: z.lazy(() => FeedbackCommentSelectSchema).optional(),
  include: z.lazy(() => FeedbackCommentIncludeSchema).optional(),
}).strict();

export const FeedbackCommentSelectSchema: z.ZodType<Prisma.FeedbackCommentSelect> = z.object({
  id: z.boolean().optional(),
  feedbackId: z.boolean().optional(),
  userId: z.boolean().optional(),
  comment: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  feedback: z.union([z.boolean(),z.lazy(() => FeedbackArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER BOOK SUBSCRIPTION
//------------------------------------------------------

export const UserBookSubscriptionIncludeSchema: z.ZodType<Prisma.UserBookSubscriptionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  book: z.union([z.boolean(),z.lazy(() => BookArgsSchema)]).optional(),
}).strict()

export const UserBookSubscriptionArgsSchema: z.ZodType<Prisma.UserBookSubscriptionDefaultArgs> = z.object({
  select: z.lazy(() => UserBookSubscriptionSelectSchema).optional(),
  include: z.lazy(() => UserBookSubscriptionIncludeSchema).optional(),
}).strict();

export const UserBookSubscriptionSelectSchema: z.ZodType<Prisma.UserBookSubscriptionSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  bookId: z.boolean().optional(),
  readStatus: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  book: z.union([z.boolean(),z.lazy(() => BookArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumUserRoleEnumFilterSchema),z.lazy(() => UserRoleEnumSchema) ]).optional(),
  feedback: z.lazy(() => FeedbackListRelationFilterSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionListRelationFilterSchema).optional(),
  FeedbackComment: z.lazy(() => FeedbackCommentListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  feedback: z.lazy(() => FeedbackOrderByRelationAggregateInputSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionOrderByRelationAggregateInputSchema).optional(),
  FeedbackComment: z.lazy(() => FeedbackCommentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    username: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
    username: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
    email: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    username: z.string(),
    email: z.string(),
  }),
  z.object({
    username: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumUserRoleEnumFilterSchema),z.lazy(() => UserRoleEnumSchema) ]).optional(),
  feedback: z.lazy(() => FeedbackListRelationFilterSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionListRelationFilterSchema).optional(),
  FeedbackComment: z.lazy(() => FeedbackCommentListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumUserRoleEnumWithAggregatesFilterSchema),z.lazy(() => UserRoleEnumSchema) ]).optional(),
}).strict();

export const AuthorWhereInputSchema: z.ZodType<Prisma.AuthorWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AuthorWhereInputSchema),z.lazy(() => AuthorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuthorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuthorWhereInputSchema),z.lazy(() => AuthorWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  about: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  books: z.lazy(() => BookListRelationFilterSchema).optional()
}).strict();

export const AuthorOrderByWithRelationInputSchema: z.ZodType<Prisma.AuthorOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  about: z.lazy(() => SortOrderSchema).optional(),
  books: z.lazy(() => BookOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AuthorWhereUniqueInputSchema: z.ZodType<Prisma.AuthorWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => AuthorWhereInputSchema),z.lazy(() => AuthorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuthorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuthorWhereInputSchema),z.lazy(() => AuthorWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  about: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  books: z.lazy(() => BookListRelationFilterSchema).optional()
}).strict());

export const AuthorOrderByWithAggregationInputSchema: z.ZodType<Prisma.AuthorOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  about: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AuthorCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AuthorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AuthorMinOrderByAggregateInputSchema).optional()
}).strict();

export const AuthorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AuthorScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AuthorScalarWhereWithAggregatesInputSchema),z.lazy(() => AuthorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuthorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuthorScalarWhereWithAggregatesInputSchema),z.lazy(() => AuthorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  about: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const CategoryWhereInputSchema: z.ZodType<Prisma.CategoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  books: z.lazy(() => BookListRelationFilterSchema).optional()
}).strict();

export const CategoryOrderByWithRelationInputSchema: z.ZodType<Prisma.CategoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  books: z.lazy(() => BookOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CategoryWhereUniqueInputSchema: z.ZodType<Prisma.CategoryWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  books: z.lazy(() => BookListRelationFilterSchema).optional()
}).strict());

export const CategoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.CategoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CategoryCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CategoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CategoryMinOrderByAggregateInputSchema).optional()
}).strict();

export const CategoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CategoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const BookWhereInputSchema: z.ZodType<Prisma.BookWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BookWhereInputSchema),z.lazy(() => BookWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BookWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BookWhereInputSchema),z.lazy(() => BookWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  readStatus: z.union([ z.lazy(() => EnumReadStatusEnumFilterSchema),z.lazy(() => ReadStatusEnumSchema) ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  publishedOn: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  author: z.union([ z.lazy(() => AuthorRelationFilterSchema),z.lazy(() => AuthorWhereInputSchema) ]).optional(),
  category: z.union([ z.lazy(() => CategoryRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
  feedback: z.lazy(() => FeedbackListRelationFilterSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionListRelationFilterSchema).optional()
}).strict();

export const BookOrderByWithRelationInputSchema: z.ZodType<Prisma.BookOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  readStatus: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  publishedOn: z.lazy(() => SortOrderSchema).optional(),
  author: z.lazy(() => AuthorOrderByWithRelationInputSchema).optional(),
  category: z.lazy(() => CategoryOrderByWithRelationInputSchema).optional(),
  feedback: z.lazy(() => FeedbackOrderByRelationAggregateInputSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const BookWhereUniqueInputSchema: z.ZodType<Prisma.BookWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => BookWhereInputSchema),z.lazy(() => BookWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BookWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BookWhereInputSchema),z.lazy(() => BookWhereInputSchema).array() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  readStatus: z.union([ z.lazy(() => EnumReadStatusEnumFilterSchema),z.lazy(() => ReadStatusEnumSchema) ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  publishedOn: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  author: z.union([ z.lazy(() => AuthorRelationFilterSchema),z.lazy(() => AuthorWhereInputSchema) ]).optional(),
  category: z.union([ z.lazy(() => CategoryRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
  feedback: z.lazy(() => FeedbackListRelationFilterSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionListRelationFilterSchema).optional()
}).strict());

export const BookOrderByWithAggregationInputSchema: z.ZodType<Prisma.BookOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  readStatus: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  publishedOn: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BookCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BookMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BookMinOrderByAggregateInputSchema).optional()
}).strict();

export const BookScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BookScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BookScalarWhereWithAggregatesInputSchema),z.lazy(() => BookScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BookScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BookScalarWhereWithAggregatesInputSchema),z.lazy(() => BookScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  readStatus: z.union([ z.lazy(() => EnumReadStatusEnumWithAggregatesFilterSchema),z.lazy(() => ReadStatusEnumSchema) ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  publishedOn: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FeedbackWhereInputSchema: z.ZodType<Prisma.FeedbackWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FeedbackWhereInputSchema),z.lazy(() => FeedbackWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackWhereInputSchema),z.lazy(() => FeedbackWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bookId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rating: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  comment: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  book: z.union([ z.lazy(() => BookRelationFilterSchema),z.lazy(() => BookWhereInputSchema) ]).optional(),
  comments: z.lazy(() => FeedbackCommentListRelationFilterSchema).optional()
}).strict();

export const FeedbackOrderByWithRelationInputSchema: z.ZodType<Prisma.FeedbackOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  book: z.lazy(() => BookOrderByWithRelationInputSchema).optional(),
  comments: z.lazy(() => FeedbackCommentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const FeedbackWhereUniqueInputSchema: z.ZodType<Prisma.FeedbackWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => FeedbackWhereInputSchema),z.lazy(() => FeedbackWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackWhereInputSchema),z.lazy(() => FeedbackWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bookId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rating: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  comment: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  book: z.union([ z.lazy(() => BookRelationFilterSchema),z.lazy(() => BookWhereInputSchema) ]).optional(),
  comments: z.lazy(() => FeedbackCommentListRelationFilterSchema).optional()
}).strict());

export const FeedbackOrderByWithAggregationInputSchema: z.ZodType<Prisma.FeedbackOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FeedbackCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => FeedbackAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FeedbackMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FeedbackMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => FeedbackSumOrderByAggregateInputSchema).optional()
}).strict();

export const FeedbackScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FeedbackScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FeedbackScalarWhereWithAggregatesInputSchema),z.lazy(() => FeedbackScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackScalarWhereWithAggregatesInputSchema),z.lazy(() => FeedbackScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  bookId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  rating: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  comment: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FeedbackCommentWhereInputSchema: z.ZodType<Prisma.FeedbackCommentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FeedbackCommentWhereInputSchema),z.lazy(() => FeedbackCommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackCommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackCommentWhereInputSchema),z.lazy(() => FeedbackCommentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  feedbackId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  comment: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  feedback: z.union([ z.lazy(() => FeedbackRelationFilterSchema),z.lazy(() => FeedbackWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const FeedbackCommentOrderByWithRelationInputSchema: z.ZodType<Prisma.FeedbackCommentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  feedbackId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  feedback: z.lazy(() => FeedbackOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const FeedbackCommentWhereUniqueInputSchema: z.ZodType<Prisma.FeedbackCommentWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => FeedbackCommentWhereInputSchema),z.lazy(() => FeedbackCommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackCommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackCommentWhereInputSchema),z.lazy(() => FeedbackCommentWhereInputSchema).array() ]).optional(),
  feedbackId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  comment: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  feedback: z.union([ z.lazy(() => FeedbackRelationFilterSchema),z.lazy(() => FeedbackWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const FeedbackCommentOrderByWithAggregationInputSchema: z.ZodType<Prisma.FeedbackCommentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  feedbackId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FeedbackCommentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FeedbackCommentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FeedbackCommentMinOrderByAggregateInputSchema).optional()
}).strict();

export const FeedbackCommentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FeedbackCommentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FeedbackCommentScalarWhereWithAggregatesInputSchema),z.lazy(() => FeedbackCommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackCommentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackCommentScalarWhereWithAggregatesInputSchema),z.lazy(() => FeedbackCommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  feedbackId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  comment: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserBookSubscriptionWhereInputSchema: z.ZodType<Prisma.UserBookSubscriptionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserBookSubscriptionWhereInputSchema),z.lazy(() => UserBookSubscriptionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserBookSubscriptionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserBookSubscriptionWhereInputSchema),z.lazy(() => UserBookSubscriptionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bookId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  readStatus: z.union([ z.lazy(() => EnumReadStatusEnumFilterSchema),z.lazy(() => ReadStatusEnumSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  book: z.union([ z.lazy(() => BookRelationFilterSchema),z.lazy(() => BookWhereInputSchema) ]).optional(),
}).strict();

export const UserBookSubscriptionOrderByWithRelationInputSchema: z.ZodType<Prisma.UserBookSubscriptionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  readStatus: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  book: z.lazy(() => BookOrderByWithRelationInputSchema).optional()
}).strict();

export const UserBookSubscriptionWhereUniqueInputSchema: z.ZodType<Prisma.UserBookSubscriptionWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => UserBookSubscriptionWhereInputSchema),z.lazy(() => UserBookSubscriptionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserBookSubscriptionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserBookSubscriptionWhereInputSchema),z.lazy(() => UserBookSubscriptionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bookId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  readStatus: z.union([ z.lazy(() => EnumReadStatusEnumFilterSchema),z.lazy(() => ReadStatusEnumSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  book: z.union([ z.lazy(() => BookRelationFilterSchema),z.lazy(() => BookWhereInputSchema) ]).optional(),
}).strict());

export const UserBookSubscriptionOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserBookSubscriptionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  readStatus: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserBookSubscriptionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserBookSubscriptionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserBookSubscriptionMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserBookSubscriptionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserBookSubscriptionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserBookSubscriptionScalarWhereWithAggregatesInputSchema),z.lazy(() => UserBookSubscriptionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserBookSubscriptionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserBookSubscriptionScalarWhereWithAggregatesInputSchema),z.lazy(() => UserBookSubscriptionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  bookId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  readStatus: z.union([ z.lazy(() => EnumReadStatusEnumWithAggregatesFilterSchema),z.lazy(() => ReadStatusEnumSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => UserRoleEnumSchema).optional(),
  feedback: z.lazy(() => FeedbackCreateNestedManyWithoutUserInputSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionCreateNestedManyWithoutUserInputSchema).optional(),
  FeedbackComment: z.lazy(() => FeedbackCommentCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => UserRoleEnumSchema).optional(),
  feedback: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  FeedbackComment: z.lazy(() => FeedbackCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleEnumSchema),z.lazy(() => EnumUserRoleEnumFieldUpdateOperationsInputSchema) ]).optional(),
  feedback: z.lazy(() => FeedbackUpdateManyWithoutUserNestedInputSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionUpdateManyWithoutUserNestedInputSchema).optional(),
  FeedbackComment: z.lazy(() => FeedbackCommentUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleEnumSchema),z.lazy(() => EnumUserRoleEnumFieldUpdateOperationsInputSchema) ]).optional(),
  feedback: z.lazy(() => FeedbackUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  FeedbackComment: z.lazy(() => FeedbackCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => UserRoleEnumSchema).optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleEnumSchema),z.lazy(() => EnumUserRoleEnumFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleEnumSchema),z.lazy(() => EnumUserRoleEnumFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AuthorCreateInputSchema: z.ZodType<Prisma.AuthorCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  about: z.string(),
  books: z.lazy(() => BookCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const AuthorUncheckedCreateInputSchema: z.ZodType<Prisma.AuthorUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  about: z.string(),
  books: z.lazy(() => BookUncheckedCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const AuthorUpdateInputSchema: z.ZodType<Prisma.AuthorUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  about: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  books: z.lazy(() => BookUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const AuthorUncheckedUpdateInputSchema: z.ZodType<Prisma.AuthorUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  about: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  books: z.lazy(() => BookUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const AuthorCreateManyInputSchema: z.ZodType<Prisma.AuthorCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  about: z.string()
}).strict();

export const AuthorUpdateManyMutationInputSchema: z.ZodType<Prisma.AuthorUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  about: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AuthorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AuthorUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  about: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoryCreateInputSchema: z.ZodType<Prisma.CategoryCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  books: z.lazy(() => BookCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUncheckedCreateInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  books: z.lazy(() => BookUncheckedCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUpdateInputSchema: z.ZodType<Prisma.CategoryUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  books: z.lazy(() => BookUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryUncheckedUpdateInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  books: z.lazy(() => BookUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryCreateManyInputSchema: z.ZodType<Prisma.CategoryCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string()
}).strict();

export const CategoryUpdateManyMutationInputSchema: z.ZodType<Prisma.CategoryUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookCreateInputSchema: z.ZodType<Prisma.BookCreateInput> = z.object({
  id: z.string().cuid().optional(),
  readStatus: z.lazy(() => ReadStatusEnumSchema),
  name: z.string(),
  description: z.string(),
  publishedOn: z.coerce.date(),
  author: z.lazy(() => AuthorCreateNestedOneWithoutBooksInputSchema),
  category: z.lazy(() => CategoryCreateNestedOneWithoutBooksInputSchema),
  feedback: z.lazy(() => FeedbackCreateNestedManyWithoutBookInputSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionCreateNestedManyWithoutBookInputSchema).optional()
}).strict();

export const BookUncheckedCreateInputSchema: z.ZodType<Prisma.BookUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  authorId: z.string(),
  categoryId: z.string(),
  readStatus: z.lazy(() => ReadStatusEnumSchema),
  name: z.string(),
  description: z.string(),
  publishedOn: z.coerce.date(),
  feedback: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionUncheckedCreateNestedManyWithoutBookInputSchema).optional()
}).strict();

export const BookUpdateInputSchema: z.ZodType<Prisma.BookUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readStatus: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => EnumReadStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publishedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => AuthorUpdateOneRequiredWithoutBooksNestedInputSchema).optional(),
  category: z.lazy(() => CategoryUpdateOneRequiredWithoutBooksNestedInputSchema).optional(),
  feedback: z.lazy(() => FeedbackUpdateManyWithoutBookNestedInputSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionUpdateManyWithoutBookNestedInputSchema).optional()
}).strict();

export const BookUncheckedUpdateInputSchema: z.ZodType<Prisma.BookUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readStatus: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => EnumReadStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publishedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  feedback: z.lazy(() => FeedbackUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionUncheckedUpdateManyWithoutBookNestedInputSchema).optional()
}).strict();

export const BookCreateManyInputSchema: z.ZodType<Prisma.BookCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  authorId: z.string(),
  categoryId: z.string(),
  readStatus: z.lazy(() => ReadStatusEnumSchema),
  name: z.string(),
  description: z.string(),
  publishedOn: z.coerce.date()
}).strict();

export const BookUpdateManyMutationInputSchema: z.ZodType<Prisma.BookUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readStatus: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => EnumReadStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publishedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BookUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readStatus: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => EnumReadStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publishedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackCreateInputSchema: z.ZodType<Prisma.FeedbackCreateInput> = z.object({
  id: z.string().cuid().optional(),
  rating: z.number().int(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutFeedbackInputSchema),
  book: z.lazy(() => BookCreateNestedOneWithoutFeedbackInputSchema),
  comments: z.lazy(() => FeedbackCommentCreateNestedManyWithoutFeedbackInputSchema).optional()
}).strict();

export const FeedbackUncheckedCreateInputSchema: z.ZodType<Prisma.FeedbackUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  bookId: z.string(),
  rating: z.number().int(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => FeedbackCommentUncheckedCreateNestedManyWithoutFeedbackInputSchema).optional()
}).strict();

export const FeedbackUpdateInputSchema: z.ZodType<Prisma.FeedbackUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFeedbackNestedInputSchema).optional(),
  book: z.lazy(() => BookUpdateOneRequiredWithoutFeedbackNestedInputSchema).optional(),
  comments: z.lazy(() => FeedbackCommentUpdateManyWithoutFeedbackNestedInputSchema).optional()
}).strict();

export const FeedbackUncheckedUpdateInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bookId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => FeedbackCommentUncheckedUpdateManyWithoutFeedbackNestedInputSchema).optional()
}).strict();

export const FeedbackCreateManyInputSchema: z.ZodType<Prisma.FeedbackCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  bookId: z.string(),
  rating: z.number().int(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FeedbackUpdateManyMutationInputSchema: z.ZodType<Prisma.FeedbackUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bookId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackCommentCreateInputSchema: z.ZodType<Prisma.FeedbackCommentCreateInput> = z.object({
  id: z.string().cuid().optional(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  feedback: z.lazy(() => FeedbackCreateNestedOneWithoutCommentsInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutFeedbackCommentInputSchema)
}).strict();

export const FeedbackCommentUncheckedCreateInputSchema: z.ZodType<Prisma.FeedbackCommentUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  feedbackId: z.string(),
  userId: z.string(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FeedbackCommentUpdateInputSchema: z.ZodType<Prisma.FeedbackCommentUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  feedback: z.lazy(() => FeedbackUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFeedbackCommentNestedInputSchema).optional()
}).strict();

export const FeedbackCommentUncheckedUpdateInputSchema: z.ZodType<Prisma.FeedbackCommentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feedbackId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackCommentCreateManyInputSchema: z.ZodType<Prisma.FeedbackCommentCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  feedbackId: z.string(),
  userId: z.string(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FeedbackCommentUpdateManyMutationInputSchema: z.ZodType<Prisma.FeedbackCommentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackCommentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FeedbackCommentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feedbackId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserBookSubscriptionCreateInputSchema: z.ZodType<Prisma.UserBookSubscriptionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  readStatus: z.lazy(() => ReadStatusEnumSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSubscriptionsInputSchema),
  book: z.lazy(() => BookCreateNestedOneWithoutSubscriptionsInputSchema)
}).strict();

export const UserBookSubscriptionUncheckedCreateInputSchema: z.ZodType<Prisma.UserBookSubscriptionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  bookId: z.string(),
  readStatus: z.lazy(() => ReadStatusEnumSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserBookSubscriptionUpdateInputSchema: z.ZodType<Prisma.UserBookSubscriptionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readStatus: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => EnumReadStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSubscriptionsNestedInputSchema).optional(),
  book: z.lazy(() => BookUpdateOneRequiredWithoutSubscriptionsNestedInputSchema).optional()
}).strict();

export const UserBookSubscriptionUncheckedUpdateInputSchema: z.ZodType<Prisma.UserBookSubscriptionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bookId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readStatus: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => EnumReadStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserBookSubscriptionCreateManyInputSchema: z.ZodType<Prisma.UserBookSubscriptionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  bookId: z.string(),
  readStatus: z.lazy(() => ReadStatusEnumSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserBookSubscriptionUpdateManyMutationInputSchema: z.ZodType<Prisma.UserBookSubscriptionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readStatus: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => EnumReadStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserBookSubscriptionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserBookSubscriptionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bookId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readStatus: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => EnumReadStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const EnumUserRoleEnumFilterSchema: z.ZodType<Prisma.EnumUserRoleEnumFilter> = z.object({
  equals: z.lazy(() => UserRoleEnumSchema).optional(),
  in: z.lazy(() => UserRoleEnumSchema).array().optional(),
  notIn: z.lazy(() => UserRoleEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => UserRoleEnumSchema),z.lazy(() => NestedEnumUserRoleEnumFilterSchema) ]).optional(),
}).strict();

export const FeedbackListRelationFilterSchema: z.ZodType<Prisma.FeedbackListRelationFilter> = z.object({
  every: z.lazy(() => FeedbackWhereInputSchema).optional(),
  some: z.lazy(() => FeedbackWhereInputSchema).optional(),
  none: z.lazy(() => FeedbackWhereInputSchema).optional()
}).strict();

export const UserBookSubscriptionListRelationFilterSchema: z.ZodType<Prisma.UserBookSubscriptionListRelationFilter> = z.object({
  every: z.lazy(() => UserBookSubscriptionWhereInputSchema).optional(),
  some: z.lazy(() => UserBookSubscriptionWhereInputSchema).optional(),
  none: z.lazy(() => UserBookSubscriptionWhereInputSchema).optional()
}).strict();

export const FeedbackCommentListRelationFilterSchema: z.ZodType<Prisma.FeedbackCommentListRelationFilter> = z.object({
  every: z.lazy(() => FeedbackCommentWhereInputSchema).optional(),
  some: z.lazy(() => FeedbackCommentWhereInputSchema).optional(),
  none: z.lazy(() => FeedbackCommentWhereInputSchema).optional()
}).strict();

export const FeedbackOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FeedbackOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserBookSubscriptionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserBookSubscriptionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackCommentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FeedbackCommentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const EnumUserRoleEnumWithAggregatesFilterSchema: z.ZodType<Prisma.EnumUserRoleEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UserRoleEnumSchema).optional(),
  in: z.lazy(() => UserRoleEnumSchema).array().optional(),
  notIn: z.lazy(() => UserRoleEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => UserRoleEnumSchema),z.lazy(() => NestedEnumUserRoleEnumWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserRoleEnumFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserRoleEnumFilterSchema).optional()
}).strict();

export const BookListRelationFilterSchema: z.ZodType<Prisma.BookListRelationFilter> = z.object({
  every: z.lazy(() => BookWhereInputSchema).optional(),
  some: z.lazy(() => BookWhereInputSchema).optional(),
  none: z.lazy(() => BookWhereInputSchema).optional()
}).strict();

export const BookOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BookOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuthorCountOrderByAggregateInputSchema: z.ZodType<Prisma.AuthorCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  about: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuthorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AuthorMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  about: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuthorMinOrderByAggregateInputSchema: z.ZodType<Prisma.AuthorMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  about: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumReadStatusEnumFilterSchema: z.ZodType<Prisma.EnumReadStatusEnumFilter> = z.object({
  equals: z.lazy(() => ReadStatusEnumSchema).optional(),
  in: z.lazy(() => ReadStatusEnumSchema).array().optional(),
  notIn: z.lazy(() => ReadStatusEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => NestedEnumReadStatusEnumFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const AuthorRelationFilterSchema: z.ZodType<Prisma.AuthorRelationFilter> = z.object({
  is: z.lazy(() => AuthorWhereInputSchema).optional(),
  isNot: z.lazy(() => AuthorWhereInputSchema).optional()
}).strict();

export const CategoryRelationFilterSchema: z.ZodType<Prisma.CategoryRelationFilter> = z.object({
  is: z.lazy(() => CategoryWhereInputSchema).optional(),
  isNot: z.lazy(() => CategoryWhereInputSchema).optional()
}).strict();

export const BookCountOrderByAggregateInputSchema: z.ZodType<Prisma.BookCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  readStatus: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  publishedOn: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BookMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BookMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  readStatus: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  publishedOn: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BookMinOrderByAggregateInputSchema: z.ZodType<Prisma.BookMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  readStatus: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  publishedOn: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumReadStatusEnumWithAggregatesFilterSchema: z.ZodType<Prisma.EnumReadStatusEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ReadStatusEnumSchema).optional(),
  in: z.lazy(() => ReadStatusEnumSchema).array().optional(),
  notIn: z.lazy(() => ReadStatusEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => NestedEnumReadStatusEnumWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumReadStatusEnumFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumReadStatusEnumFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const BookRelationFilterSchema: z.ZodType<Prisma.BookRelationFilter> = z.object({
  is: z.lazy(() => BookWhereInputSchema).optional(),
  isNot: z.lazy(() => BookWhereInputSchema).optional()
}).strict();

export const FeedbackCountOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackAvgOrderByAggregateInput> = z.object({
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackMinOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackSumOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackSumOrderByAggregateInput> = z.object({
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const FeedbackRelationFilterSchema: z.ZodType<Prisma.FeedbackRelationFilter> = z.object({
  is: z.lazy(() => FeedbackWhereInputSchema).optional(),
  isNot: z.lazy(() => FeedbackWhereInputSchema).optional()
}).strict();

export const FeedbackCommentCountOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackCommentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  feedbackId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackCommentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackCommentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  feedbackId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackCommentMinOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackCommentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  feedbackId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserBookSubscriptionCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserBookSubscriptionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  readStatus: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserBookSubscriptionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserBookSubscriptionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  readStatus: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserBookSubscriptionMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserBookSubscriptionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  readStatus: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FeedbackCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutUserInputSchema),z.lazy(() => FeedbackCreateWithoutUserInputSchema).array(),z.lazy(() => FeedbackUncheckedCreateWithoutUserInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCreateOrConnectWithoutUserInputSchema),z.lazy(() => FeedbackCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserBookSubscriptionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserBookSubscriptionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserBookSubscriptionCreateWithoutUserInputSchema),z.lazy(() => UserBookSubscriptionCreateWithoutUserInputSchema).array(),z.lazy(() => UserBookSubscriptionUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserBookSubscriptionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserBookSubscriptionCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserBookSubscriptionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserBookSubscriptionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FeedbackCommentCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FeedbackCommentCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCommentCreateWithoutUserInputSchema),z.lazy(() => FeedbackCommentCreateWithoutUserInputSchema).array(),z.lazy(() => FeedbackCommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => FeedbackCommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => FeedbackCommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCommentCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackCommentWhereUniqueInputSchema),z.lazy(() => FeedbackCommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FeedbackUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FeedbackUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutUserInputSchema),z.lazy(() => FeedbackCreateWithoutUserInputSchema).array(),z.lazy(() => FeedbackUncheckedCreateWithoutUserInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCreateOrConnectWithoutUserInputSchema),z.lazy(() => FeedbackCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserBookSubscriptionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserBookSubscriptionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserBookSubscriptionCreateWithoutUserInputSchema),z.lazy(() => UserBookSubscriptionCreateWithoutUserInputSchema).array(),z.lazy(() => UserBookSubscriptionUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserBookSubscriptionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserBookSubscriptionCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserBookSubscriptionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserBookSubscriptionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FeedbackCommentUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FeedbackCommentUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCommentCreateWithoutUserInputSchema),z.lazy(() => FeedbackCommentCreateWithoutUserInputSchema).array(),z.lazy(() => FeedbackCommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => FeedbackCommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => FeedbackCommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCommentCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackCommentWhereUniqueInputSchema),z.lazy(() => FeedbackCommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const EnumUserRoleEnumFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumUserRoleEnumFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => UserRoleEnumSchema).optional()
}).strict();

export const FeedbackUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FeedbackUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutUserInputSchema),z.lazy(() => FeedbackCreateWithoutUserInputSchema).array(),z.lazy(() => FeedbackUncheckedCreateWithoutUserInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCreateOrConnectWithoutUserInputSchema),z.lazy(() => FeedbackCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FeedbackUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FeedbackUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => FeedbackUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackScalarWhereInputSchema),z.lazy(() => FeedbackScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserBookSubscriptionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserBookSubscriptionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserBookSubscriptionCreateWithoutUserInputSchema),z.lazy(() => UserBookSubscriptionCreateWithoutUserInputSchema).array(),z.lazy(() => UserBookSubscriptionUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserBookSubscriptionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserBookSubscriptionCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserBookSubscriptionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserBookSubscriptionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserBookSubscriptionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserBookSubscriptionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserBookSubscriptionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserBookSubscriptionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserBookSubscriptionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserBookSubscriptionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserBookSubscriptionScalarWhereInputSchema),z.lazy(() => UserBookSubscriptionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FeedbackCommentUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FeedbackCommentUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCommentCreateWithoutUserInputSchema),z.lazy(() => FeedbackCommentCreateWithoutUserInputSchema).array(),z.lazy(() => FeedbackCommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => FeedbackCommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => FeedbackCommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackCommentUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FeedbackCommentUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCommentCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackCommentWhereUniqueInputSchema),z.lazy(() => FeedbackCommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackCommentWhereUniqueInputSchema),z.lazy(() => FeedbackCommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackCommentWhereUniqueInputSchema),z.lazy(() => FeedbackCommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackCommentWhereUniqueInputSchema),z.lazy(() => FeedbackCommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackCommentUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FeedbackCommentUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackCommentUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => FeedbackCommentUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackCommentScalarWhereInputSchema),z.lazy(() => FeedbackCommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FeedbackUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutUserInputSchema),z.lazy(() => FeedbackCreateWithoutUserInputSchema).array(),z.lazy(() => FeedbackUncheckedCreateWithoutUserInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCreateOrConnectWithoutUserInputSchema),z.lazy(() => FeedbackCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FeedbackUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FeedbackUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => FeedbackUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackScalarWhereInputSchema),z.lazy(() => FeedbackScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserBookSubscriptionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserBookSubscriptionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserBookSubscriptionCreateWithoutUserInputSchema),z.lazy(() => UserBookSubscriptionCreateWithoutUserInputSchema).array(),z.lazy(() => UserBookSubscriptionUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserBookSubscriptionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserBookSubscriptionCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserBookSubscriptionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserBookSubscriptionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserBookSubscriptionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserBookSubscriptionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserBookSubscriptionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserBookSubscriptionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserBookSubscriptionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserBookSubscriptionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserBookSubscriptionScalarWhereInputSchema),z.lazy(() => UserBookSubscriptionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FeedbackCommentUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FeedbackCommentUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCommentCreateWithoutUserInputSchema),z.lazy(() => FeedbackCommentCreateWithoutUserInputSchema).array(),z.lazy(() => FeedbackCommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => FeedbackCommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => FeedbackCommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackCommentUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FeedbackCommentUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCommentCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackCommentWhereUniqueInputSchema),z.lazy(() => FeedbackCommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackCommentWhereUniqueInputSchema),z.lazy(() => FeedbackCommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackCommentWhereUniqueInputSchema),z.lazy(() => FeedbackCommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackCommentWhereUniqueInputSchema),z.lazy(() => FeedbackCommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackCommentUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FeedbackCommentUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackCommentUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => FeedbackCommentUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackCommentScalarWhereInputSchema),z.lazy(() => FeedbackCommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BookCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.BookCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => BookCreateWithoutAuthorInputSchema),z.lazy(() => BookCreateWithoutAuthorInputSchema).array(),z.lazy(() => BookUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => BookUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => BookCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BookWhereUniqueInputSchema),z.lazy(() => BookWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BookUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.BookUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => BookCreateWithoutAuthorInputSchema),z.lazy(() => BookCreateWithoutAuthorInputSchema).array(),z.lazy(() => BookUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => BookUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => BookCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BookWhereUniqueInputSchema),z.lazy(() => BookWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BookUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.BookUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookCreateWithoutAuthorInputSchema),z.lazy(() => BookCreateWithoutAuthorInputSchema).array(),z.lazy(() => BookUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => BookUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => BookCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BookUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => BookUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BookWhereUniqueInputSchema),z.lazy(() => BookWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BookWhereUniqueInputSchema),z.lazy(() => BookWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BookWhereUniqueInputSchema),z.lazy(() => BookWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BookWhereUniqueInputSchema),z.lazy(() => BookWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BookUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => BookUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BookUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => BookUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BookScalarWhereInputSchema),z.lazy(() => BookScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BookUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.BookUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookCreateWithoutAuthorInputSchema),z.lazy(() => BookCreateWithoutAuthorInputSchema).array(),z.lazy(() => BookUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => BookUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => BookCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BookUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => BookUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BookWhereUniqueInputSchema),z.lazy(() => BookWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BookWhereUniqueInputSchema),z.lazy(() => BookWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BookWhereUniqueInputSchema),z.lazy(() => BookWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BookWhereUniqueInputSchema),z.lazy(() => BookWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BookUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => BookUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BookUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => BookUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BookScalarWhereInputSchema),z.lazy(() => BookScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BookCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.BookCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => BookCreateWithoutCategoryInputSchema),z.lazy(() => BookCreateWithoutCategoryInputSchema).array(),z.lazy(() => BookUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => BookUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => BookCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BookWhereUniqueInputSchema),z.lazy(() => BookWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BookUncheckedCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.BookUncheckedCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => BookCreateWithoutCategoryInputSchema),z.lazy(() => BookCreateWithoutCategoryInputSchema).array(),z.lazy(() => BookUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => BookUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => BookCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BookWhereUniqueInputSchema),z.lazy(() => BookWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BookUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.BookUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookCreateWithoutCategoryInputSchema),z.lazy(() => BookCreateWithoutCategoryInputSchema).array(),z.lazy(() => BookUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => BookUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => BookCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BookUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => BookUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BookWhereUniqueInputSchema),z.lazy(() => BookWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BookWhereUniqueInputSchema),z.lazy(() => BookWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BookWhereUniqueInputSchema),z.lazy(() => BookWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BookWhereUniqueInputSchema),z.lazy(() => BookWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BookUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => BookUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BookUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => BookUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BookScalarWhereInputSchema),z.lazy(() => BookScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BookUncheckedUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.BookUncheckedUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookCreateWithoutCategoryInputSchema),z.lazy(() => BookCreateWithoutCategoryInputSchema).array(),z.lazy(() => BookUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => BookUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => BookCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BookUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => BookUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BookWhereUniqueInputSchema),z.lazy(() => BookWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BookWhereUniqueInputSchema),z.lazy(() => BookWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BookWhereUniqueInputSchema),z.lazy(() => BookWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BookWhereUniqueInputSchema),z.lazy(() => BookWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BookUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => BookUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BookUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => BookUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BookScalarWhereInputSchema),z.lazy(() => BookScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AuthorCreateNestedOneWithoutBooksInputSchema: z.ZodType<Prisma.AuthorCreateNestedOneWithoutBooksInput> = z.object({
  create: z.union([ z.lazy(() => AuthorCreateWithoutBooksInputSchema),z.lazy(() => AuthorUncheckedCreateWithoutBooksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AuthorCreateOrConnectWithoutBooksInputSchema).optional(),
  connect: z.lazy(() => AuthorWhereUniqueInputSchema).optional()
}).strict();

export const CategoryCreateNestedOneWithoutBooksInputSchema: z.ZodType<Prisma.CategoryCreateNestedOneWithoutBooksInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutBooksInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutBooksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutBooksInputSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional()
}).strict();

export const FeedbackCreateNestedManyWithoutBookInputSchema: z.ZodType<Prisma.FeedbackCreateNestedManyWithoutBookInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutBookInputSchema),z.lazy(() => FeedbackCreateWithoutBookInputSchema).array(),z.lazy(() => FeedbackUncheckedCreateWithoutBookInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutBookInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCreateOrConnectWithoutBookInputSchema),z.lazy(() => FeedbackCreateOrConnectWithoutBookInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCreateManyBookInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserBookSubscriptionCreateNestedManyWithoutBookInputSchema: z.ZodType<Prisma.UserBookSubscriptionCreateNestedManyWithoutBookInput> = z.object({
  create: z.union([ z.lazy(() => UserBookSubscriptionCreateWithoutBookInputSchema),z.lazy(() => UserBookSubscriptionCreateWithoutBookInputSchema).array(),z.lazy(() => UserBookSubscriptionUncheckedCreateWithoutBookInputSchema),z.lazy(() => UserBookSubscriptionUncheckedCreateWithoutBookInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserBookSubscriptionCreateOrConnectWithoutBookInputSchema),z.lazy(() => UserBookSubscriptionCreateOrConnectWithoutBookInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserBookSubscriptionCreateManyBookInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FeedbackUncheckedCreateNestedManyWithoutBookInputSchema: z.ZodType<Prisma.FeedbackUncheckedCreateNestedManyWithoutBookInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutBookInputSchema),z.lazy(() => FeedbackCreateWithoutBookInputSchema).array(),z.lazy(() => FeedbackUncheckedCreateWithoutBookInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutBookInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCreateOrConnectWithoutBookInputSchema),z.lazy(() => FeedbackCreateOrConnectWithoutBookInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCreateManyBookInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserBookSubscriptionUncheckedCreateNestedManyWithoutBookInputSchema: z.ZodType<Prisma.UserBookSubscriptionUncheckedCreateNestedManyWithoutBookInput> = z.object({
  create: z.union([ z.lazy(() => UserBookSubscriptionCreateWithoutBookInputSchema),z.lazy(() => UserBookSubscriptionCreateWithoutBookInputSchema).array(),z.lazy(() => UserBookSubscriptionUncheckedCreateWithoutBookInputSchema),z.lazy(() => UserBookSubscriptionUncheckedCreateWithoutBookInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserBookSubscriptionCreateOrConnectWithoutBookInputSchema),z.lazy(() => UserBookSubscriptionCreateOrConnectWithoutBookInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserBookSubscriptionCreateManyBookInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumReadStatusEnumFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumReadStatusEnumFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ReadStatusEnumSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const AuthorUpdateOneRequiredWithoutBooksNestedInputSchema: z.ZodType<Prisma.AuthorUpdateOneRequiredWithoutBooksNestedInput> = z.object({
  create: z.union([ z.lazy(() => AuthorCreateWithoutBooksInputSchema),z.lazy(() => AuthorUncheckedCreateWithoutBooksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AuthorCreateOrConnectWithoutBooksInputSchema).optional(),
  upsert: z.lazy(() => AuthorUpsertWithoutBooksInputSchema).optional(),
  connect: z.lazy(() => AuthorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AuthorUpdateToOneWithWhereWithoutBooksInputSchema),z.lazy(() => AuthorUpdateWithoutBooksInputSchema),z.lazy(() => AuthorUncheckedUpdateWithoutBooksInputSchema) ]).optional(),
}).strict();

export const CategoryUpdateOneRequiredWithoutBooksNestedInputSchema: z.ZodType<Prisma.CategoryUpdateOneRequiredWithoutBooksNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutBooksInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutBooksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutBooksInputSchema).optional(),
  upsert: z.lazy(() => CategoryUpsertWithoutBooksInputSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CategoryUpdateToOneWithWhereWithoutBooksInputSchema),z.lazy(() => CategoryUpdateWithoutBooksInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutBooksInputSchema) ]).optional(),
}).strict();

export const FeedbackUpdateManyWithoutBookNestedInputSchema: z.ZodType<Prisma.FeedbackUpdateManyWithoutBookNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutBookInputSchema),z.lazy(() => FeedbackCreateWithoutBookInputSchema).array(),z.lazy(() => FeedbackUncheckedCreateWithoutBookInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutBookInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCreateOrConnectWithoutBookInputSchema),z.lazy(() => FeedbackCreateOrConnectWithoutBookInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackUpsertWithWhereUniqueWithoutBookInputSchema),z.lazy(() => FeedbackUpsertWithWhereUniqueWithoutBookInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCreateManyBookInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackUpdateWithWhereUniqueWithoutBookInputSchema),z.lazy(() => FeedbackUpdateWithWhereUniqueWithoutBookInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackUpdateManyWithWhereWithoutBookInputSchema),z.lazy(() => FeedbackUpdateManyWithWhereWithoutBookInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackScalarWhereInputSchema),z.lazy(() => FeedbackScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserBookSubscriptionUpdateManyWithoutBookNestedInputSchema: z.ZodType<Prisma.UserBookSubscriptionUpdateManyWithoutBookNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserBookSubscriptionCreateWithoutBookInputSchema),z.lazy(() => UserBookSubscriptionCreateWithoutBookInputSchema).array(),z.lazy(() => UserBookSubscriptionUncheckedCreateWithoutBookInputSchema),z.lazy(() => UserBookSubscriptionUncheckedCreateWithoutBookInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserBookSubscriptionCreateOrConnectWithoutBookInputSchema),z.lazy(() => UserBookSubscriptionCreateOrConnectWithoutBookInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserBookSubscriptionUpsertWithWhereUniqueWithoutBookInputSchema),z.lazy(() => UserBookSubscriptionUpsertWithWhereUniqueWithoutBookInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserBookSubscriptionCreateManyBookInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserBookSubscriptionUpdateWithWhereUniqueWithoutBookInputSchema),z.lazy(() => UserBookSubscriptionUpdateWithWhereUniqueWithoutBookInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserBookSubscriptionUpdateManyWithWhereWithoutBookInputSchema),z.lazy(() => UserBookSubscriptionUpdateManyWithWhereWithoutBookInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserBookSubscriptionScalarWhereInputSchema),z.lazy(() => UserBookSubscriptionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FeedbackUncheckedUpdateManyWithoutBookNestedInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateManyWithoutBookNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutBookInputSchema),z.lazy(() => FeedbackCreateWithoutBookInputSchema).array(),z.lazy(() => FeedbackUncheckedCreateWithoutBookInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutBookInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCreateOrConnectWithoutBookInputSchema),z.lazy(() => FeedbackCreateOrConnectWithoutBookInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackUpsertWithWhereUniqueWithoutBookInputSchema),z.lazy(() => FeedbackUpsertWithWhereUniqueWithoutBookInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCreateManyBookInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackUpdateWithWhereUniqueWithoutBookInputSchema),z.lazy(() => FeedbackUpdateWithWhereUniqueWithoutBookInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackUpdateManyWithWhereWithoutBookInputSchema),z.lazy(() => FeedbackUpdateManyWithWhereWithoutBookInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackScalarWhereInputSchema),z.lazy(() => FeedbackScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserBookSubscriptionUncheckedUpdateManyWithoutBookNestedInputSchema: z.ZodType<Prisma.UserBookSubscriptionUncheckedUpdateManyWithoutBookNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserBookSubscriptionCreateWithoutBookInputSchema),z.lazy(() => UserBookSubscriptionCreateWithoutBookInputSchema).array(),z.lazy(() => UserBookSubscriptionUncheckedCreateWithoutBookInputSchema),z.lazy(() => UserBookSubscriptionUncheckedCreateWithoutBookInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserBookSubscriptionCreateOrConnectWithoutBookInputSchema),z.lazy(() => UserBookSubscriptionCreateOrConnectWithoutBookInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserBookSubscriptionUpsertWithWhereUniqueWithoutBookInputSchema),z.lazy(() => UserBookSubscriptionUpsertWithWhereUniqueWithoutBookInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserBookSubscriptionCreateManyBookInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserBookSubscriptionUpdateWithWhereUniqueWithoutBookInputSchema),z.lazy(() => UserBookSubscriptionUpdateWithWhereUniqueWithoutBookInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserBookSubscriptionUpdateManyWithWhereWithoutBookInputSchema),z.lazy(() => UserBookSubscriptionUpdateManyWithWhereWithoutBookInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserBookSubscriptionScalarWhereInputSchema),z.lazy(() => UserBookSubscriptionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutFeedbackInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFeedbackInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFeedbackInputSchema),z.lazy(() => UserUncheckedCreateWithoutFeedbackInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFeedbackInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const BookCreateNestedOneWithoutFeedbackInputSchema: z.ZodType<Prisma.BookCreateNestedOneWithoutFeedbackInput> = z.object({
  create: z.union([ z.lazy(() => BookCreateWithoutFeedbackInputSchema),z.lazy(() => BookUncheckedCreateWithoutFeedbackInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BookCreateOrConnectWithoutFeedbackInputSchema).optional(),
  connect: z.lazy(() => BookWhereUniqueInputSchema).optional()
}).strict();

export const FeedbackCommentCreateNestedManyWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackCommentCreateNestedManyWithoutFeedbackInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCommentCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackCommentCreateWithoutFeedbackInputSchema).array(),z.lazy(() => FeedbackCommentUncheckedCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackCommentUncheckedCreateWithoutFeedbackInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCommentCreateOrConnectWithoutFeedbackInputSchema),z.lazy(() => FeedbackCommentCreateOrConnectWithoutFeedbackInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCommentCreateManyFeedbackInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackCommentWhereUniqueInputSchema),z.lazy(() => FeedbackCommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FeedbackCommentUncheckedCreateNestedManyWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackCommentUncheckedCreateNestedManyWithoutFeedbackInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCommentCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackCommentCreateWithoutFeedbackInputSchema).array(),z.lazy(() => FeedbackCommentUncheckedCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackCommentUncheckedCreateWithoutFeedbackInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCommentCreateOrConnectWithoutFeedbackInputSchema),z.lazy(() => FeedbackCommentCreateOrConnectWithoutFeedbackInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCommentCreateManyFeedbackInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackCommentWhereUniqueInputSchema),z.lazy(() => FeedbackCommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutFeedbackNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFeedbackNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFeedbackInputSchema),z.lazy(() => UserUncheckedCreateWithoutFeedbackInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFeedbackInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFeedbackInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutFeedbackInputSchema),z.lazy(() => UserUpdateWithoutFeedbackInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFeedbackInputSchema) ]).optional(),
}).strict();

export const BookUpdateOneRequiredWithoutFeedbackNestedInputSchema: z.ZodType<Prisma.BookUpdateOneRequiredWithoutFeedbackNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookCreateWithoutFeedbackInputSchema),z.lazy(() => BookUncheckedCreateWithoutFeedbackInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BookCreateOrConnectWithoutFeedbackInputSchema).optional(),
  upsert: z.lazy(() => BookUpsertWithoutFeedbackInputSchema).optional(),
  connect: z.lazy(() => BookWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BookUpdateToOneWithWhereWithoutFeedbackInputSchema),z.lazy(() => BookUpdateWithoutFeedbackInputSchema),z.lazy(() => BookUncheckedUpdateWithoutFeedbackInputSchema) ]).optional(),
}).strict();

export const FeedbackCommentUpdateManyWithoutFeedbackNestedInputSchema: z.ZodType<Prisma.FeedbackCommentUpdateManyWithoutFeedbackNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCommentCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackCommentCreateWithoutFeedbackInputSchema).array(),z.lazy(() => FeedbackCommentUncheckedCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackCommentUncheckedCreateWithoutFeedbackInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCommentCreateOrConnectWithoutFeedbackInputSchema),z.lazy(() => FeedbackCommentCreateOrConnectWithoutFeedbackInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackCommentUpsertWithWhereUniqueWithoutFeedbackInputSchema),z.lazy(() => FeedbackCommentUpsertWithWhereUniqueWithoutFeedbackInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCommentCreateManyFeedbackInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackCommentWhereUniqueInputSchema),z.lazy(() => FeedbackCommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackCommentWhereUniqueInputSchema),z.lazy(() => FeedbackCommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackCommentWhereUniqueInputSchema),z.lazy(() => FeedbackCommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackCommentWhereUniqueInputSchema),z.lazy(() => FeedbackCommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackCommentUpdateWithWhereUniqueWithoutFeedbackInputSchema),z.lazy(() => FeedbackCommentUpdateWithWhereUniqueWithoutFeedbackInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackCommentUpdateManyWithWhereWithoutFeedbackInputSchema),z.lazy(() => FeedbackCommentUpdateManyWithWhereWithoutFeedbackInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackCommentScalarWhereInputSchema),z.lazy(() => FeedbackCommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FeedbackCommentUncheckedUpdateManyWithoutFeedbackNestedInputSchema: z.ZodType<Prisma.FeedbackCommentUncheckedUpdateManyWithoutFeedbackNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCommentCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackCommentCreateWithoutFeedbackInputSchema).array(),z.lazy(() => FeedbackCommentUncheckedCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackCommentUncheckedCreateWithoutFeedbackInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCommentCreateOrConnectWithoutFeedbackInputSchema),z.lazy(() => FeedbackCommentCreateOrConnectWithoutFeedbackInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackCommentUpsertWithWhereUniqueWithoutFeedbackInputSchema),z.lazy(() => FeedbackCommentUpsertWithWhereUniqueWithoutFeedbackInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCommentCreateManyFeedbackInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackCommentWhereUniqueInputSchema),z.lazy(() => FeedbackCommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackCommentWhereUniqueInputSchema),z.lazy(() => FeedbackCommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackCommentWhereUniqueInputSchema),z.lazy(() => FeedbackCommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackCommentWhereUniqueInputSchema),z.lazy(() => FeedbackCommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackCommentUpdateWithWhereUniqueWithoutFeedbackInputSchema),z.lazy(() => FeedbackCommentUpdateWithWhereUniqueWithoutFeedbackInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackCommentUpdateManyWithWhereWithoutFeedbackInputSchema),z.lazy(() => FeedbackCommentUpdateManyWithWhereWithoutFeedbackInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackCommentScalarWhereInputSchema),z.lazy(() => FeedbackCommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FeedbackCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.FeedbackCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutCommentsInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FeedbackCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => FeedbackWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutFeedbackCommentInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFeedbackCommentInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFeedbackCommentInputSchema),z.lazy(() => UserUncheckedCreateWithoutFeedbackCommentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFeedbackCommentInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const FeedbackUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.FeedbackUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutCommentsInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FeedbackCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => FeedbackUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => FeedbackWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FeedbackUpdateToOneWithWhereWithoutCommentsInputSchema),z.lazy(() => FeedbackUpdateWithoutCommentsInputSchema),z.lazy(() => FeedbackUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutFeedbackCommentNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFeedbackCommentNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFeedbackCommentInputSchema),z.lazy(() => UserUncheckedCreateWithoutFeedbackCommentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFeedbackCommentInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFeedbackCommentInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutFeedbackCommentInputSchema),z.lazy(() => UserUpdateWithoutFeedbackCommentInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFeedbackCommentInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSubscriptionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSubscriptionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSubscriptionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSubscriptionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSubscriptionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const BookCreateNestedOneWithoutSubscriptionsInputSchema: z.ZodType<Prisma.BookCreateNestedOneWithoutSubscriptionsInput> = z.object({
  create: z.union([ z.lazy(() => BookCreateWithoutSubscriptionsInputSchema),z.lazy(() => BookUncheckedCreateWithoutSubscriptionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BookCreateOrConnectWithoutSubscriptionsInputSchema).optional(),
  connect: z.lazy(() => BookWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSubscriptionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSubscriptionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSubscriptionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSubscriptionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSubscriptionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSubscriptionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSubscriptionsInputSchema),z.lazy(() => UserUpdateWithoutSubscriptionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSubscriptionsInputSchema) ]).optional(),
}).strict();

export const BookUpdateOneRequiredWithoutSubscriptionsNestedInputSchema: z.ZodType<Prisma.BookUpdateOneRequiredWithoutSubscriptionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookCreateWithoutSubscriptionsInputSchema),z.lazy(() => BookUncheckedCreateWithoutSubscriptionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BookCreateOrConnectWithoutSubscriptionsInputSchema).optional(),
  upsert: z.lazy(() => BookUpsertWithoutSubscriptionsInputSchema).optional(),
  connect: z.lazy(() => BookWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BookUpdateToOneWithWhereWithoutSubscriptionsInputSchema),z.lazy(() => BookUpdateWithoutSubscriptionsInputSchema),z.lazy(() => BookUncheckedUpdateWithoutSubscriptionsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedEnumUserRoleEnumFilterSchema: z.ZodType<Prisma.NestedEnumUserRoleEnumFilter> = z.object({
  equals: z.lazy(() => UserRoleEnumSchema).optional(),
  in: z.lazy(() => UserRoleEnumSchema).array().optional(),
  notIn: z.lazy(() => UserRoleEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => UserRoleEnumSchema),z.lazy(() => NestedEnumUserRoleEnumFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedEnumUserRoleEnumWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumUserRoleEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UserRoleEnumSchema).optional(),
  in: z.lazy(() => UserRoleEnumSchema).array().optional(),
  notIn: z.lazy(() => UserRoleEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => UserRoleEnumSchema),z.lazy(() => NestedEnumUserRoleEnumWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserRoleEnumFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserRoleEnumFilterSchema).optional()
}).strict();

export const NestedEnumReadStatusEnumFilterSchema: z.ZodType<Prisma.NestedEnumReadStatusEnumFilter> = z.object({
  equals: z.lazy(() => ReadStatusEnumSchema).optional(),
  in: z.lazy(() => ReadStatusEnumSchema).array().optional(),
  notIn: z.lazy(() => ReadStatusEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => NestedEnumReadStatusEnumFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumReadStatusEnumWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumReadStatusEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ReadStatusEnumSchema).optional(),
  in: z.lazy(() => ReadStatusEnumSchema).array().optional(),
  notIn: z.lazy(() => ReadStatusEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => NestedEnumReadStatusEnumWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumReadStatusEnumFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumReadStatusEnumFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const FeedbackCreateWithoutUserInputSchema: z.ZodType<Prisma.FeedbackCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  rating: z.number().int(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  book: z.lazy(() => BookCreateNestedOneWithoutFeedbackInputSchema),
  comments: z.lazy(() => FeedbackCommentCreateNestedManyWithoutFeedbackInputSchema).optional()
}).strict();

export const FeedbackUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.FeedbackUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  rating: z.number().int(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => FeedbackCommentUncheckedCreateNestedManyWithoutFeedbackInputSchema).optional()
}).strict();

export const FeedbackCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.FeedbackCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => FeedbackWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FeedbackCreateWithoutUserInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FeedbackCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.FeedbackCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FeedbackCreateManyUserInputSchema),z.lazy(() => FeedbackCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserBookSubscriptionCreateWithoutUserInputSchema: z.ZodType<Prisma.UserBookSubscriptionCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  readStatus: z.lazy(() => ReadStatusEnumSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  book: z.lazy(() => BookCreateNestedOneWithoutSubscriptionsInputSchema)
}).strict();

export const UserBookSubscriptionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserBookSubscriptionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  readStatus: z.lazy(() => ReadStatusEnumSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserBookSubscriptionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserBookSubscriptionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserBookSubscriptionCreateWithoutUserInputSchema),z.lazy(() => UserBookSubscriptionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserBookSubscriptionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserBookSubscriptionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserBookSubscriptionCreateManyUserInputSchema),z.lazy(() => UserBookSubscriptionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FeedbackCommentCreateWithoutUserInputSchema: z.ZodType<Prisma.FeedbackCommentCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  feedback: z.lazy(() => FeedbackCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const FeedbackCommentUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.FeedbackCommentUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  feedbackId: z.string(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FeedbackCommentCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.FeedbackCommentCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => FeedbackCommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FeedbackCommentCreateWithoutUserInputSchema),z.lazy(() => FeedbackCommentUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FeedbackCommentCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.FeedbackCommentCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FeedbackCommentCreateManyUserInputSchema),z.lazy(() => FeedbackCommentCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FeedbackUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FeedbackUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => FeedbackWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FeedbackUpdateWithoutUserInputSchema),z.lazy(() => FeedbackUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => FeedbackCreateWithoutUserInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FeedbackUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FeedbackUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => FeedbackWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FeedbackUpdateWithoutUserInputSchema),z.lazy(() => FeedbackUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const FeedbackUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.FeedbackUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => FeedbackScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FeedbackUpdateManyMutationInputSchema),z.lazy(() => FeedbackUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const FeedbackScalarWhereInputSchema: z.ZodType<Prisma.FeedbackScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FeedbackScalarWhereInputSchema),z.lazy(() => FeedbackScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackScalarWhereInputSchema),z.lazy(() => FeedbackScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bookId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rating: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  comment: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserBookSubscriptionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserBookSubscriptionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserBookSubscriptionUpdateWithoutUserInputSchema),z.lazy(() => UserBookSubscriptionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserBookSubscriptionCreateWithoutUserInputSchema),z.lazy(() => UserBookSubscriptionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserBookSubscriptionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserBookSubscriptionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserBookSubscriptionUpdateWithoutUserInputSchema),z.lazy(() => UserBookSubscriptionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserBookSubscriptionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserBookSubscriptionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserBookSubscriptionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserBookSubscriptionUpdateManyMutationInputSchema),z.lazy(() => UserBookSubscriptionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UserBookSubscriptionScalarWhereInputSchema: z.ZodType<Prisma.UserBookSubscriptionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserBookSubscriptionScalarWhereInputSchema),z.lazy(() => UserBookSubscriptionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserBookSubscriptionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserBookSubscriptionScalarWhereInputSchema),z.lazy(() => UserBookSubscriptionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bookId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  readStatus: z.union([ z.lazy(() => EnumReadStatusEnumFilterSchema),z.lazy(() => ReadStatusEnumSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FeedbackCommentUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FeedbackCommentUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => FeedbackCommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FeedbackCommentUpdateWithoutUserInputSchema),z.lazy(() => FeedbackCommentUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => FeedbackCommentCreateWithoutUserInputSchema),z.lazy(() => FeedbackCommentUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FeedbackCommentUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FeedbackCommentUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => FeedbackCommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FeedbackCommentUpdateWithoutUserInputSchema),z.lazy(() => FeedbackCommentUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const FeedbackCommentUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.FeedbackCommentUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => FeedbackCommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FeedbackCommentUpdateManyMutationInputSchema),z.lazy(() => FeedbackCommentUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const FeedbackCommentScalarWhereInputSchema: z.ZodType<Prisma.FeedbackCommentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FeedbackCommentScalarWhereInputSchema),z.lazy(() => FeedbackCommentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackCommentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackCommentScalarWhereInputSchema),z.lazy(() => FeedbackCommentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  feedbackId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  comment: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const BookCreateWithoutAuthorInputSchema: z.ZodType<Prisma.BookCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  readStatus: z.lazy(() => ReadStatusEnumSchema),
  name: z.string(),
  description: z.string(),
  publishedOn: z.coerce.date(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutBooksInputSchema),
  feedback: z.lazy(() => FeedbackCreateNestedManyWithoutBookInputSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionCreateNestedManyWithoutBookInputSchema).optional()
}).strict();

export const BookUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.BookUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  categoryId: z.string(),
  readStatus: z.lazy(() => ReadStatusEnumSchema),
  name: z.string(),
  description: z.string(),
  publishedOn: z.coerce.date(),
  feedback: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionUncheckedCreateNestedManyWithoutBookInputSchema).optional()
}).strict();

export const BookCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.BookCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BookCreateWithoutAuthorInputSchema),z.lazy(() => BookUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const BookCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.BookCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BookCreateManyAuthorInputSchema),z.lazy(() => BookCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BookUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.BookUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BookUpdateWithoutAuthorInputSchema),z.lazy(() => BookUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => BookCreateWithoutAuthorInputSchema),z.lazy(() => BookUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const BookUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.BookUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BookUpdateWithoutAuthorInputSchema),z.lazy(() => BookUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export const BookUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.BookUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => BookScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BookUpdateManyMutationInputSchema),z.lazy(() => BookUncheckedUpdateManyWithoutAuthorInputSchema) ]),
}).strict();

export const BookScalarWhereInputSchema: z.ZodType<Prisma.BookScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BookScalarWhereInputSchema),z.lazy(() => BookScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BookScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BookScalarWhereInputSchema),z.lazy(() => BookScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  readStatus: z.union([ z.lazy(() => EnumReadStatusEnumFilterSchema),z.lazy(() => ReadStatusEnumSchema) ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  publishedOn: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const BookCreateWithoutCategoryInputSchema: z.ZodType<Prisma.BookCreateWithoutCategoryInput> = z.object({
  id: z.string().cuid().optional(),
  readStatus: z.lazy(() => ReadStatusEnumSchema),
  name: z.string(),
  description: z.string(),
  publishedOn: z.coerce.date(),
  author: z.lazy(() => AuthorCreateNestedOneWithoutBooksInputSchema),
  feedback: z.lazy(() => FeedbackCreateNestedManyWithoutBookInputSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionCreateNestedManyWithoutBookInputSchema).optional()
}).strict();

export const BookUncheckedCreateWithoutCategoryInputSchema: z.ZodType<Prisma.BookUncheckedCreateWithoutCategoryInput> = z.object({
  id: z.string().cuid().optional(),
  authorId: z.string(),
  readStatus: z.lazy(() => ReadStatusEnumSchema),
  name: z.string(),
  description: z.string(),
  publishedOn: z.coerce.date(),
  feedback: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionUncheckedCreateNestedManyWithoutBookInputSchema).optional()
}).strict();

export const BookCreateOrConnectWithoutCategoryInputSchema: z.ZodType<Prisma.BookCreateOrConnectWithoutCategoryInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BookCreateWithoutCategoryInputSchema),z.lazy(() => BookUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const BookCreateManyCategoryInputEnvelopeSchema: z.ZodType<Prisma.BookCreateManyCategoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BookCreateManyCategoryInputSchema),z.lazy(() => BookCreateManyCategoryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BookUpsertWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.BookUpsertWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BookUpdateWithoutCategoryInputSchema),z.lazy(() => BookUncheckedUpdateWithoutCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => BookCreateWithoutCategoryInputSchema),z.lazy(() => BookUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const BookUpdateWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.BookUpdateWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BookUpdateWithoutCategoryInputSchema),z.lazy(() => BookUncheckedUpdateWithoutCategoryInputSchema) ]),
}).strict();

export const BookUpdateManyWithWhereWithoutCategoryInputSchema: z.ZodType<Prisma.BookUpdateManyWithWhereWithoutCategoryInput> = z.object({
  where: z.lazy(() => BookScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BookUpdateManyMutationInputSchema),z.lazy(() => BookUncheckedUpdateManyWithoutCategoryInputSchema) ]),
}).strict();

export const AuthorCreateWithoutBooksInputSchema: z.ZodType<Prisma.AuthorCreateWithoutBooksInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  about: z.string()
}).strict();

export const AuthorUncheckedCreateWithoutBooksInputSchema: z.ZodType<Prisma.AuthorUncheckedCreateWithoutBooksInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  about: z.string()
}).strict();

export const AuthorCreateOrConnectWithoutBooksInputSchema: z.ZodType<Prisma.AuthorCreateOrConnectWithoutBooksInput> = z.object({
  where: z.lazy(() => AuthorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AuthorCreateWithoutBooksInputSchema),z.lazy(() => AuthorUncheckedCreateWithoutBooksInputSchema) ]),
}).strict();

export const CategoryCreateWithoutBooksInputSchema: z.ZodType<Prisma.CategoryCreateWithoutBooksInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string()
}).strict();

export const CategoryUncheckedCreateWithoutBooksInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutBooksInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string()
}).strict();

export const CategoryCreateOrConnectWithoutBooksInputSchema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutBooksInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CategoryCreateWithoutBooksInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutBooksInputSchema) ]),
}).strict();

export const FeedbackCreateWithoutBookInputSchema: z.ZodType<Prisma.FeedbackCreateWithoutBookInput> = z.object({
  id: z.string().cuid().optional(),
  rating: z.number().int(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutFeedbackInputSchema),
  comments: z.lazy(() => FeedbackCommentCreateNestedManyWithoutFeedbackInputSchema).optional()
}).strict();

export const FeedbackUncheckedCreateWithoutBookInputSchema: z.ZodType<Prisma.FeedbackUncheckedCreateWithoutBookInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  rating: z.number().int(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => FeedbackCommentUncheckedCreateNestedManyWithoutFeedbackInputSchema).optional()
}).strict();

export const FeedbackCreateOrConnectWithoutBookInputSchema: z.ZodType<Prisma.FeedbackCreateOrConnectWithoutBookInput> = z.object({
  where: z.lazy(() => FeedbackWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FeedbackCreateWithoutBookInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutBookInputSchema) ]),
}).strict();

export const FeedbackCreateManyBookInputEnvelopeSchema: z.ZodType<Prisma.FeedbackCreateManyBookInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FeedbackCreateManyBookInputSchema),z.lazy(() => FeedbackCreateManyBookInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserBookSubscriptionCreateWithoutBookInputSchema: z.ZodType<Prisma.UserBookSubscriptionCreateWithoutBookInput> = z.object({
  id: z.string().cuid().optional(),
  readStatus: z.lazy(() => ReadStatusEnumSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSubscriptionsInputSchema)
}).strict();

export const UserBookSubscriptionUncheckedCreateWithoutBookInputSchema: z.ZodType<Prisma.UserBookSubscriptionUncheckedCreateWithoutBookInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  readStatus: z.lazy(() => ReadStatusEnumSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserBookSubscriptionCreateOrConnectWithoutBookInputSchema: z.ZodType<Prisma.UserBookSubscriptionCreateOrConnectWithoutBookInput> = z.object({
  where: z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserBookSubscriptionCreateWithoutBookInputSchema),z.lazy(() => UserBookSubscriptionUncheckedCreateWithoutBookInputSchema) ]),
}).strict();

export const UserBookSubscriptionCreateManyBookInputEnvelopeSchema: z.ZodType<Prisma.UserBookSubscriptionCreateManyBookInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserBookSubscriptionCreateManyBookInputSchema),z.lazy(() => UserBookSubscriptionCreateManyBookInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AuthorUpsertWithoutBooksInputSchema: z.ZodType<Prisma.AuthorUpsertWithoutBooksInput> = z.object({
  update: z.union([ z.lazy(() => AuthorUpdateWithoutBooksInputSchema),z.lazy(() => AuthorUncheckedUpdateWithoutBooksInputSchema) ]),
  create: z.union([ z.lazy(() => AuthorCreateWithoutBooksInputSchema),z.lazy(() => AuthorUncheckedCreateWithoutBooksInputSchema) ]),
  where: z.lazy(() => AuthorWhereInputSchema).optional()
}).strict();

export const AuthorUpdateToOneWithWhereWithoutBooksInputSchema: z.ZodType<Prisma.AuthorUpdateToOneWithWhereWithoutBooksInput> = z.object({
  where: z.lazy(() => AuthorWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AuthorUpdateWithoutBooksInputSchema),z.lazy(() => AuthorUncheckedUpdateWithoutBooksInputSchema) ]),
}).strict();

export const AuthorUpdateWithoutBooksInputSchema: z.ZodType<Prisma.AuthorUpdateWithoutBooksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  about: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AuthorUncheckedUpdateWithoutBooksInputSchema: z.ZodType<Prisma.AuthorUncheckedUpdateWithoutBooksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  about: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoryUpsertWithoutBooksInputSchema: z.ZodType<Prisma.CategoryUpsertWithoutBooksInput> = z.object({
  update: z.union([ z.lazy(() => CategoryUpdateWithoutBooksInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutBooksInputSchema) ]),
  create: z.union([ z.lazy(() => CategoryCreateWithoutBooksInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutBooksInputSchema) ]),
  where: z.lazy(() => CategoryWhereInputSchema).optional()
}).strict();

export const CategoryUpdateToOneWithWhereWithoutBooksInputSchema: z.ZodType<Prisma.CategoryUpdateToOneWithWhereWithoutBooksInput> = z.object({
  where: z.lazy(() => CategoryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CategoryUpdateWithoutBooksInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutBooksInputSchema) ]),
}).strict();

export const CategoryUpdateWithoutBooksInputSchema: z.ZodType<Prisma.CategoryUpdateWithoutBooksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoryUncheckedUpdateWithoutBooksInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateWithoutBooksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackUpsertWithWhereUniqueWithoutBookInputSchema: z.ZodType<Prisma.FeedbackUpsertWithWhereUniqueWithoutBookInput> = z.object({
  where: z.lazy(() => FeedbackWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FeedbackUpdateWithoutBookInputSchema),z.lazy(() => FeedbackUncheckedUpdateWithoutBookInputSchema) ]),
  create: z.union([ z.lazy(() => FeedbackCreateWithoutBookInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutBookInputSchema) ]),
}).strict();

export const FeedbackUpdateWithWhereUniqueWithoutBookInputSchema: z.ZodType<Prisma.FeedbackUpdateWithWhereUniqueWithoutBookInput> = z.object({
  where: z.lazy(() => FeedbackWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FeedbackUpdateWithoutBookInputSchema),z.lazy(() => FeedbackUncheckedUpdateWithoutBookInputSchema) ]),
}).strict();

export const FeedbackUpdateManyWithWhereWithoutBookInputSchema: z.ZodType<Prisma.FeedbackUpdateManyWithWhereWithoutBookInput> = z.object({
  where: z.lazy(() => FeedbackScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FeedbackUpdateManyMutationInputSchema),z.lazy(() => FeedbackUncheckedUpdateManyWithoutBookInputSchema) ]),
}).strict();

export const UserBookSubscriptionUpsertWithWhereUniqueWithoutBookInputSchema: z.ZodType<Prisma.UserBookSubscriptionUpsertWithWhereUniqueWithoutBookInput> = z.object({
  where: z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserBookSubscriptionUpdateWithoutBookInputSchema),z.lazy(() => UserBookSubscriptionUncheckedUpdateWithoutBookInputSchema) ]),
  create: z.union([ z.lazy(() => UserBookSubscriptionCreateWithoutBookInputSchema),z.lazy(() => UserBookSubscriptionUncheckedCreateWithoutBookInputSchema) ]),
}).strict();

export const UserBookSubscriptionUpdateWithWhereUniqueWithoutBookInputSchema: z.ZodType<Prisma.UserBookSubscriptionUpdateWithWhereUniqueWithoutBookInput> = z.object({
  where: z.lazy(() => UserBookSubscriptionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserBookSubscriptionUpdateWithoutBookInputSchema),z.lazy(() => UserBookSubscriptionUncheckedUpdateWithoutBookInputSchema) ]),
}).strict();

export const UserBookSubscriptionUpdateManyWithWhereWithoutBookInputSchema: z.ZodType<Prisma.UserBookSubscriptionUpdateManyWithWhereWithoutBookInput> = z.object({
  where: z.lazy(() => UserBookSubscriptionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserBookSubscriptionUpdateManyMutationInputSchema),z.lazy(() => UserBookSubscriptionUncheckedUpdateManyWithoutBookInputSchema) ]),
}).strict();

export const UserCreateWithoutFeedbackInputSchema: z.ZodType<Prisma.UserCreateWithoutFeedbackInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => UserRoleEnumSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionCreateNestedManyWithoutUserInputSchema).optional(),
  FeedbackComment: z.lazy(() => FeedbackCommentCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutFeedbackInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutFeedbackInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => UserRoleEnumSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  FeedbackComment: z.lazy(() => FeedbackCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutFeedbackInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFeedbackInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFeedbackInputSchema),z.lazy(() => UserUncheckedCreateWithoutFeedbackInputSchema) ]),
}).strict();

export const BookCreateWithoutFeedbackInputSchema: z.ZodType<Prisma.BookCreateWithoutFeedbackInput> = z.object({
  id: z.string().cuid().optional(),
  readStatus: z.lazy(() => ReadStatusEnumSchema),
  name: z.string(),
  description: z.string(),
  publishedOn: z.coerce.date(),
  author: z.lazy(() => AuthorCreateNestedOneWithoutBooksInputSchema),
  category: z.lazy(() => CategoryCreateNestedOneWithoutBooksInputSchema),
  subscriptions: z.lazy(() => UserBookSubscriptionCreateNestedManyWithoutBookInputSchema).optional()
}).strict();

export const BookUncheckedCreateWithoutFeedbackInputSchema: z.ZodType<Prisma.BookUncheckedCreateWithoutFeedbackInput> = z.object({
  id: z.string().cuid().optional(),
  authorId: z.string(),
  categoryId: z.string(),
  readStatus: z.lazy(() => ReadStatusEnumSchema),
  name: z.string(),
  description: z.string(),
  publishedOn: z.coerce.date(),
  subscriptions: z.lazy(() => UserBookSubscriptionUncheckedCreateNestedManyWithoutBookInputSchema).optional()
}).strict();

export const BookCreateOrConnectWithoutFeedbackInputSchema: z.ZodType<Prisma.BookCreateOrConnectWithoutFeedbackInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BookCreateWithoutFeedbackInputSchema),z.lazy(() => BookUncheckedCreateWithoutFeedbackInputSchema) ]),
}).strict();

export const FeedbackCommentCreateWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackCommentCreateWithoutFeedbackInput> = z.object({
  id: z.string().cuid().optional(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutFeedbackCommentInputSchema)
}).strict();

export const FeedbackCommentUncheckedCreateWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackCommentUncheckedCreateWithoutFeedbackInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FeedbackCommentCreateOrConnectWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackCommentCreateOrConnectWithoutFeedbackInput> = z.object({
  where: z.lazy(() => FeedbackCommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FeedbackCommentCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackCommentUncheckedCreateWithoutFeedbackInputSchema) ]),
}).strict();

export const FeedbackCommentCreateManyFeedbackInputEnvelopeSchema: z.ZodType<Prisma.FeedbackCommentCreateManyFeedbackInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FeedbackCommentCreateManyFeedbackInputSchema),z.lazy(() => FeedbackCommentCreateManyFeedbackInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutFeedbackInputSchema: z.ZodType<Prisma.UserUpsertWithoutFeedbackInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutFeedbackInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFeedbackInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFeedbackInputSchema),z.lazy(() => UserUncheckedCreateWithoutFeedbackInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutFeedbackInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutFeedbackInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutFeedbackInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFeedbackInputSchema) ]),
}).strict();

export const UserUpdateWithoutFeedbackInputSchema: z.ZodType<Prisma.UserUpdateWithoutFeedbackInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleEnumSchema),z.lazy(() => EnumUserRoleEnumFieldUpdateOperationsInputSchema) ]).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionUpdateManyWithoutUserNestedInputSchema).optional(),
  FeedbackComment: z.lazy(() => FeedbackCommentUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutFeedbackInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFeedbackInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleEnumSchema),z.lazy(() => EnumUserRoleEnumFieldUpdateOperationsInputSchema) ]).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  FeedbackComment: z.lazy(() => FeedbackCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const BookUpsertWithoutFeedbackInputSchema: z.ZodType<Prisma.BookUpsertWithoutFeedbackInput> = z.object({
  update: z.union([ z.lazy(() => BookUpdateWithoutFeedbackInputSchema),z.lazy(() => BookUncheckedUpdateWithoutFeedbackInputSchema) ]),
  create: z.union([ z.lazy(() => BookCreateWithoutFeedbackInputSchema),z.lazy(() => BookUncheckedCreateWithoutFeedbackInputSchema) ]),
  where: z.lazy(() => BookWhereInputSchema).optional()
}).strict();

export const BookUpdateToOneWithWhereWithoutFeedbackInputSchema: z.ZodType<Prisma.BookUpdateToOneWithWhereWithoutFeedbackInput> = z.object({
  where: z.lazy(() => BookWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BookUpdateWithoutFeedbackInputSchema),z.lazy(() => BookUncheckedUpdateWithoutFeedbackInputSchema) ]),
}).strict();

export const BookUpdateWithoutFeedbackInputSchema: z.ZodType<Prisma.BookUpdateWithoutFeedbackInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readStatus: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => EnumReadStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publishedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => AuthorUpdateOneRequiredWithoutBooksNestedInputSchema).optional(),
  category: z.lazy(() => CategoryUpdateOneRequiredWithoutBooksNestedInputSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionUpdateManyWithoutBookNestedInputSchema).optional()
}).strict();

export const BookUncheckedUpdateWithoutFeedbackInputSchema: z.ZodType<Prisma.BookUncheckedUpdateWithoutFeedbackInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readStatus: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => EnumReadStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publishedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionUncheckedUpdateManyWithoutBookNestedInputSchema).optional()
}).strict();

export const FeedbackCommentUpsertWithWhereUniqueWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackCommentUpsertWithWhereUniqueWithoutFeedbackInput> = z.object({
  where: z.lazy(() => FeedbackCommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FeedbackCommentUpdateWithoutFeedbackInputSchema),z.lazy(() => FeedbackCommentUncheckedUpdateWithoutFeedbackInputSchema) ]),
  create: z.union([ z.lazy(() => FeedbackCommentCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackCommentUncheckedCreateWithoutFeedbackInputSchema) ]),
}).strict();

export const FeedbackCommentUpdateWithWhereUniqueWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackCommentUpdateWithWhereUniqueWithoutFeedbackInput> = z.object({
  where: z.lazy(() => FeedbackCommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FeedbackCommentUpdateWithoutFeedbackInputSchema),z.lazy(() => FeedbackCommentUncheckedUpdateWithoutFeedbackInputSchema) ]),
}).strict();

export const FeedbackCommentUpdateManyWithWhereWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackCommentUpdateManyWithWhereWithoutFeedbackInput> = z.object({
  where: z.lazy(() => FeedbackCommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FeedbackCommentUpdateManyMutationInputSchema),z.lazy(() => FeedbackCommentUncheckedUpdateManyWithoutFeedbackInputSchema) ]),
}).strict();

export const FeedbackCreateWithoutCommentsInputSchema: z.ZodType<Prisma.FeedbackCreateWithoutCommentsInput> = z.object({
  id: z.string().cuid().optional(),
  rating: z.number().int(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutFeedbackInputSchema),
  book: z.lazy(() => BookCreateNestedOneWithoutFeedbackInputSchema)
}).strict();

export const FeedbackUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.FeedbackUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  bookId: z.string(),
  rating: z.number().int(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FeedbackCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.FeedbackCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => FeedbackWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FeedbackCreateWithoutCommentsInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const UserCreateWithoutFeedbackCommentInputSchema: z.ZodType<Prisma.UserCreateWithoutFeedbackCommentInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => UserRoleEnumSchema).optional(),
  feedback: z.lazy(() => FeedbackCreateNestedManyWithoutUserInputSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutFeedbackCommentInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutFeedbackCommentInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => UserRoleEnumSchema).optional(),
  feedback: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutFeedbackCommentInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFeedbackCommentInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFeedbackCommentInputSchema),z.lazy(() => UserUncheckedCreateWithoutFeedbackCommentInputSchema) ]),
}).strict();

export const FeedbackUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.FeedbackUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => FeedbackUpdateWithoutCommentsInputSchema),z.lazy(() => FeedbackUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => FeedbackCreateWithoutCommentsInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutCommentsInputSchema) ]),
  where: z.lazy(() => FeedbackWhereInputSchema).optional()
}).strict();

export const FeedbackUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.FeedbackUpdateToOneWithWhereWithoutCommentsInput> = z.object({
  where: z.lazy(() => FeedbackWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => FeedbackUpdateWithoutCommentsInputSchema),z.lazy(() => FeedbackUncheckedUpdateWithoutCommentsInputSchema) ]),
}).strict();

export const FeedbackUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.FeedbackUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFeedbackNestedInputSchema).optional(),
  book: z.lazy(() => BookUpdateOneRequiredWithoutFeedbackNestedInputSchema).optional()
}).strict();

export const FeedbackUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bookId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpsertWithoutFeedbackCommentInputSchema: z.ZodType<Prisma.UserUpsertWithoutFeedbackCommentInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutFeedbackCommentInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFeedbackCommentInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFeedbackCommentInputSchema),z.lazy(() => UserUncheckedCreateWithoutFeedbackCommentInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutFeedbackCommentInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutFeedbackCommentInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutFeedbackCommentInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFeedbackCommentInputSchema) ]),
}).strict();

export const UserUpdateWithoutFeedbackCommentInputSchema: z.ZodType<Prisma.UserUpdateWithoutFeedbackCommentInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleEnumSchema),z.lazy(() => EnumUserRoleEnumFieldUpdateOperationsInputSchema) ]).optional(),
  feedback: z.lazy(() => FeedbackUpdateManyWithoutUserNestedInputSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutFeedbackCommentInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFeedbackCommentInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleEnumSchema),z.lazy(() => EnumUserRoleEnumFieldUpdateOperationsInputSchema) ]).optional(),
  feedback: z.lazy(() => FeedbackUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSubscriptionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSubscriptionsInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => UserRoleEnumSchema).optional(),
  feedback: z.lazy(() => FeedbackCreateNestedManyWithoutUserInputSchema).optional(),
  FeedbackComment: z.lazy(() => FeedbackCommentCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSubscriptionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSubscriptionsInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => UserRoleEnumSchema).optional(),
  feedback: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  FeedbackComment: z.lazy(() => FeedbackCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSubscriptionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSubscriptionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSubscriptionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSubscriptionsInputSchema) ]),
}).strict();

export const BookCreateWithoutSubscriptionsInputSchema: z.ZodType<Prisma.BookCreateWithoutSubscriptionsInput> = z.object({
  id: z.string().cuid().optional(),
  readStatus: z.lazy(() => ReadStatusEnumSchema),
  name: z.string(),
  description: z.string(),
  publishedOn: z.coerce.date(),
  author: z.lazy(() => AuthorCreateNestedOneWithoutBooksInputSchema),
  category: z.lazy(() => CategoryCreateNestedOneWithoutBooksInputSchema),
  feedback: z.lazy(() => FeedbackCreateNestedManyWithoutBookInputSchema).optional()
}).strict();

export const BookUncheckedCreateWithoutSubscriptionsInputSchema: z.ZodType<Prisma.BookUncheckedCreateWithoutSubscriptionsInput> = z.object({
  id: z.string().cuid().optional(),
  authorId: z.string(),
  categoryId: z.string(),
  readStatus: z.lazy(() => ReadStatusEnumSchema),
  name: z.string(),
  description: z.string(),
  publishedOn: z.coerce.date(),
  feedback: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutBookInputSchema).optional()
}).strict();

export const BookCreateOrConnectWithoutSubscriptionsInputSchema: z.ZodType<Prisma.BookCreateOrConnectWithoutSubscriptionsInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BookCreateWithoutSubscriptionsInputSchema),z.lazy(() => BookUncheckedCreateWithoutSubscriptionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSubscriptionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSubscriptionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSubscriptionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSubscriptionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSubscriptionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSubscriptionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSubscriptionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSubscriptionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSubscriptionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSubscriptionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSubscriptionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSubscriptionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleEnumSchema),z.lazy(() => EnumUserRoleEnumFieldUpdateOperationsInputSchema) ]).optional(),
  feedback: z.lazy(() => FeedbackUpdateManyWithoutUserNestedInputSchema).optional(),
  FeedbackComment: z.lazy(() => FeedbackCommentUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSubscriptionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSubscriptionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleEnumSchema),z.lazy(() => EnumUserRoleEnumFieldUpdateOperationsInputSchema) ]).optional(),
  feedback: z.lazy(() => FeedbackUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  FeedbackComment: z.lazy(() => FeedbackCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const BookUpsertWithoutSubscriptionsInputSchema: z.ZodType<Prisma.BookUpsertWithoutSubscriptionsInput> = z.object({
  update: z.union([ z.lazy(() => BookUpdateWithoutSubscriptionsInputSchema),z.lazy(() => BookUncheckedUpdateWithoutSubscriptionsInputSchema) ]),
  create: z.union([ z.lazy(() => BookCreateWithoutSubscriptionsInputSchema),z.lazy(() => BookUncheckedCreateWithoutSubscriptionsInputSchema) ]),
  where: z.lazy(() => BookWhereInputSchema).optional()
}).strict();

export const BookUpdateToOneWithWhereWithoutSubscriptionsInputSchema: z.ZodType<Prisma.BookUpdateToOneWithWhereWithoutSubscriptionsInput> = z.object({
  where: z.lazy(() => BookWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BookUpdateWithoutSubscriptionsInputSchema),z.lazy(() => BookUncheckedUpdateWithoutSubscriptionsInputSchema) ]),
}).strict();

export const BookUpdateWithoutSubscriptionsInputSchema: z.ZodType<Prisma.BookUpdateWithoutSubscriptionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readStatus: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => EnumReadStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publishedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => AuthorUpdateOneRequiredWithoutBooksNestedInputSchema).optional(),
  category: z.lazy(() => CategoryUpdateOneRequiredWithoutBooksNestedInputSchema).optional(),
  feedback: z.lazy(() => FeedbackUpdateManyWithoutBookNestedInputSchema).optional()
}).strict();

export const BookUncheckedUpdateWithoutSubscriptionsInputSchema: z.ZodType<Prisma.BookUncheckedUpdateWithoutSubscriptionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readStatus: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => EnumReadStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publishedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  feedback: z.lazy(() => FeedbackUncheckedUpdateManyWithoutBookNestedInputSchema).optional()
}).strict();

export const FeedbackCreateManyUserInputSchema: z.ZodType<Prisma.FeedbackCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  rating: z.number().int(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserBookSubscriptionCreateManyUserInputSchema: z.ZodType<Prisma.UserBookSubscriptionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  readStatus: z.lazy(() => ReadStatusEnumSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FeedbackCommentCreateManyUserInputSchema: z.ZodType<Prisma.FeedbackCommentCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  feedbackId: z.string(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FeedbackUpdateWithoutUserInputSchema: z.ZodType<Prisma.FeedbackUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  book: z.lazy(() => BookUpdateOneRequiredWithoutFeedbackNestedInputSchema).optional(),
  comments: z.lazy(() => FeedbackCommentUpdateManyWithoutFeedbackNestedInputSchema).optional()
}).strict();

export const FeedbackUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bookId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => FeedbackCommentUncheckedUpdateManyWithoutFeedbackNestedInputSchema).optional()
}).strict();

export const FeedbackUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bookId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserBookSubscriptionUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserBookSubscriptionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readStatus: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => EnumReadStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  book: z.lazy(() => BookUpdateOneRequiredWithoutSubscriptionsNestedInputSchema).optional()
}).strict();

export const UserBookSubscriptionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserBookSubscriptionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bookId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readStatus: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => EnumReadStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserBookSubscriptionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserBookSubscriptionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bookId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readStatus: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => EnumReadStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackCommentUpdateWithoutUserInputSchema: z.ZodType<Prisma.FeedbackCommentUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  feedback: z.lazy(() => FeedbackUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const FeedbackCommentUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.FeedbackCommentUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feedbackId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackCommentUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.FeedbackCommentUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feedbackId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookCreateManyAuthorInputSchema: z.ZodType<Prisma.BookCreateManyAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  categoryId: z.string(),
  readStatus: z.lazy(() => ReadStatusEnumSchema),
  name: z.string(),
  description: z.string(),
  publishedOn: z.coerce.date()
}).strict();

export const BookUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.BookUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readStatus: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => EnumReadStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publishedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.lazy(() => CategoryUpdateOneRequiredWithoutBooksNestedInputSchema).optional(),
  feedback: z.lazy(() => FeedbackUpdateManyWithoutBookNestedInputSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionUpdateManyWithoutBookNestedInputSchema).optional()
}).strict();

export const BookUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.BookUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readStatus: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => EnumReadStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publishedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  feedback: z.lazy(() => FeedbackUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionUncheckedUpdateManyWithoutBookNestedInputSchema).optional()
}).strict();

export const BookUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.BookUncheckedUpdateManyWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readStatus: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => EnumReadStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publishedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookCreateManyCategoryInputSchema: z.ZodType<Prisma.BookCreateManyCategoryInput> = z.object({
  id: z.string().cuid().optional(),
  authorId: z.string(),
  readStatus: z.lazy(() => ReadStatusEnumSchema),
  name: z.string(),
  description: z.string(),
  publishedOn: z.coerce.date()
}).strict();

export const BookUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.BookUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readStatus: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => EnumReadStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publishedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => AuthorUpdateOneRequiredWithoutBooksNestedInputSchema).optional(),
  feedback: z.lazy(() => FeedbackUpdateManyWithoutBookNestedInputSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionUpdateManyWithoutBookNestedInputSchema).optional()
}).strict();

export const BookUncheckedUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.BookUncheckedUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readStatus: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => EnumReadStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publishedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  feedback: z.lazy(() => FeedbackUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  subscriptions: z.lazy(() => UserBookSubscriptionUncheckedUpdateManyWithoutBookNestedInputSchema).optional()
}).strict();

export const BookUncheckedUpdateManyWithoutCategoryInputSchema: z.ZodType<Prisma.BookUncheckedUpdateManyWithoutCategoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readStatus: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => EnumReadStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publishedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackCreateManyBookInputSchema: z.ZodType<Prisma.FeedbackCreateManyBookInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  rating: z.number().int(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserBookSubscriptionCreateManyBookInputSchema: z.ZodType<Prisma.UserBookSubscriptionCreateManyBookInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  readStatus: z.lazy(() => ReadStatusEnumSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FeedbackUpdateWithoutBookInputSchema: z.ZodType<Prisma.FeedbackUpdateWithoutBookInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFeedbackNestedInputSchema).optional(),
  comments: z.lazy(() => FeedbackCommentUpdateManyWithoutFeedbackNestedInputSchema).optional()
}).strict();

export const FeedbackUncheckedUpdateWithoutBookInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateWithoutBookInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => FeedbackCommentUncheckedUpdateManyWithoutFeedbackNestedInputSchema).optional()
}).strict();

export const FeedbackUncheckedUpdateManyWithoutBookInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateManyWithoutBookInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserBookSubscriptionUpdateWithoutBookInputSchema: z.ZodType<Prisma.UserBookSubscriptionUpdateWithoutBookInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readStatus: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => EnumReadStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSubscriptionsNestedInputSchema).optional()
}).strict();

export const UserBookSubscriptionUncheckedUpdateWithoutBookInputSchema: z.ZodType<Prisma.UserBookSubscriptionUncheckedUpdateWithoutBookInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readStatus: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => EnumReadStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserBookSubscriptionUncheckedUpdateManyWithoutBookInputSchema: z.ZodType<Prisma.UserBookSubscriptionUncheckedUpdateManyWithoutBookInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readStatus: z.union([ z.lazy(() => ReadStatusEnumSchema),z.lazy(() => EnumReadStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackCommentCreateManyFeedbackInputSchema: z.ZodType<Prisma.FeedbackCommentCreateManyFeedbackInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FeedbackCommentUpdateWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackCommentUpdateWithoutFeedbackInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFeedbackCommentNestedInputSchema).optional()
}).strict();

export const FeedbackCommentUncheckedUpdateWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackCommentUncheckedUpdateWithoutFeedbackInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackCommentUncheckedUpdateManyWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackCommentUncheckedUpdateManyWithoutFeedbackInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const AuthorFindFirstArgsSchema: z.ZodType<Prisma.AuthorFindFirstArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  where: AuthorWhereInputSchema.optional(),
  orderBy: z.union([ AuthorOrderByWithRelationInputSchema.array(),AuthorOrderByWithRelationInputSchema ]).optional(),
  cursor: AuthorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuthorScalarFieldEnumSchema,AuthorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AuthorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AuthorFindFirstOrThrowArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  where: AuthorWhereInputSchema.optional(),
  orderBy: z.union([ AuthorOrderByWithRelationInputSchema.array(),AuthorOrderByWithRelationInputSchema ]).optional(),
  cursor: AuthorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuthorScalarFieldEnumSchema,AuthorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AuthorFindManyArgsSchema: z.ZodType<Prisma.AuthorFindManyArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  where: AuthorWhereInputSchema.optional(),
  orderBy: z.union([ AuthorOrderByWithRelationInputSchema.array(),AuthorOrderByWithRelationInputSchema ]).optional(),
  cursor: AuthorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuthorScalarFieldEnumSchema,AuthorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AuthorAggregateArgsSchema: z.ZodType<Prisma.AuthorAggregateArgs> = z.object({
  where: AuthorWhereInputSchema.optional(),
  orderBy: z.union([ AuthorOrderByWithRelationInputSchema.array(),AuthorOrderByWithRelationInputSchema ]).optional(),
  cursor: AuthorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AuthorGroupByArgsSchema: z.ZodType<Prisma.AuthorGroupByArgs> = z.object({
  where: AuthorWhereInputSchema.optional(),
  orderBy: z.union([ AuthorOrderByWithAggregationInputSchema.array(),AuthorOrderByWithAggregationInputSchema ]).optional(),
  by: AuthorScalarFieldEnumSchema.array(),
  having: AuthorScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AuthorFindUniqueArgsSchema: z.ZodType<Prisma.AuthorFindUniqueArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  where: AuthorWhereUniqueInputSchema,
}).strict() ;

export const AuthorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AuthorFindUniqueOrThrowArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  where: AuthorWhereUniqueInputSchema,
}).strict() ;

export const CategoryFindFirstArgsSchema: z.ZodType<Prisma.CategoryFindFirstArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CategoryFindFirstOrThrowArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryFindManyArgsSchema: z.ZodType<Prisma.CategoryFindManyArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryAggregateArgsSchema: z.ZodType<Prisma.CategoryAggregateArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CategoryGroupByArgsSchema: z.ZodType<Prisma.CategoryGroupByArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithAggregationInputSchema.array(),CategoryOrderByWithAggregationInputSchema ]).optional(),
  by: CategoryScalarFieldEnumSchema.array(),
  having: CategoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CategoryFindUniqueArgsSchema: z.ZodType<Prisma.CategoryFindUniqueArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CategoryFindUniqueOrThrowArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const BookFindFirstArgsSchema: z.ZodType<Prisma.BookFindFirstArgs> = z.object({
  select: BookSelectSchema.optional(),
  include: BookIncludeSchema.optional(),
  where: BookWhereInputSchema.optional(),
  orderBy: z.union([ BookOrderByWithRelationInputSchema.array(),BookOrderByWithRelationInputSchema ]).optional(),
  cursor: BookWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BookScalarFieldEnumSchema,BookScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BookFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BookFindFirstOrThrowArgs> = z.object({
  select: BookSelectSchema.optional(),
  include: BookIncludeSchema.optional(),
  where: BookWhereInputSchema.optional(),
  orderBy: z.union([ BookOrderByWithRelationInputSchema.array(),BookOrderByWithRelationInputSchema ]).optional(),
  cursor: BookWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BookScalarFieldEnumSchema,BookScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BookFindManyArgsSchema: z.ZodType<Prisma.BookFindManyArgs> = z.object({
  select: BookSelectSchema.optional(),
  include: BookIncludeSchema.optional(),
  where: BookWhereInputSchema.optional(),
  orderBy: z.union([ BookOrderByWithRelationInputSchema.array(),BookOrderByWithRelationInputSchema ]).optional(),
  cursor: BookWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BookScalarFieldEnumSchema,BookScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BookAggregateArgsSchema: z.ZodType<Prisma.BookAggregateArgs> = z.object({
  where: BookWhereInputSchema.optional(),
  orderBy: z.union([ BookOrderByWithRelationInputSchema.array(),BookOrderByWithRelationInputSchema ]).optional(),
  cursor: BookWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BookGroupByArgsSchema: z.ZodType<Prisma.BookGroupByArgs> = z.object({
  where: BookWhereInputSchema.optional(),
  orderBy: z.union([ BookOrderByWithAggregationInputSchema.array(),BookOrderByWithAggregationInputSchema ]).optional(),
  by: BookScalarFieldEnumSchema.array(),
  having: BookScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BookFindUniqueArgsSchema: z.ZodType<Prisma.BookFindUniqueArgs> = z.object({
  select: BookSelectSchema.optional(),
  include: BookIncludeSchema.optional(),
  where: BookWhereUniqueInputSchema,
}).strict() ;

export const BookFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BookFindUniqueOrThrowArgs> = z.object({
  select: BookSelectSchema.optional(),
  include: BookIncludeSchema.optional(),
  where: BookWhereUniqueInputSchema,
}).strict() ;

export const FeedbackFindFirstArgsSchema: z.ZodType<Prisma.FeedbackFindFirstArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackOrderByWithRelationInputSchema.array(),FeedbackOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FeedbackScalarFieldEnumSchema,FeedbackScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FeedbackFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FeedbackFindFirstOrThrowArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackOrderByWithRelationInputSchema.array(),FeedbackOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FeedbackScalarFieldEnumSchema,FeedbackScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FeedbackFindManyArgsSchema: z.ZodType<Prisma.FeedbackFindManyArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackOrderByWithRelationInputSchema.array(),FeedbackOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FeedbackScalarFieldEnumSchema,FeedbackScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FeedbackAggregateArgsSchema: z.ZodType<Prisma.FeedbackAggregateArgs> = z.object({
  where: FeedbackWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackOrderByWithRelationInputSchema.array(),FeedbackOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FeedbackGroupByArgsSchema: z.ZodType<Prisma.FeedbackGroupByArgs> = z.object({
  where: FeedbackWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackOrderByWithAggregationInputSchema.array(),FeedbackOrderByWithAggregationInputSchema ]).optional(),
  by: FeedbackScalarFieldEnumSchema.array(),
  having: FeedbackScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FeedbackFindUniqueArgsSchema: z.ZodType<Prisma.FeedbackFindUniqueArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereUniqueInputSchema,
}).strict() ;

export const FeedbackFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FeedbackFindUniqueOrThrowArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereUniqueInputSchema,
}).strict() ;

export const FeedbackCommentFindFirstArgsSchema: z.ZodType<Prisma.FeedbackCommentFindFirstArgs> = z.object({
  select: FeedbackCommentSelectSchema.optional(),
  include: FeedbackCommentIncludeSchema.optional(),
  where: FeedbackCommentWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackCommentOrderByWithRelationInputSchema.array(),FeedbackCommentOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackCommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FeedbackCommentScalarFieldEnumSchema,FeedbackCommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FeedbackCommentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FeedbackCommentFindFirstOrThrowArgs> = z.object({
  select: FeedbackCommentSelectSchema.optional(),
  include: FeedbackCommentIncludeSchema.optional(),
  where: FeedbackCommentWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackCommentOrderByWithRelationInputSchema.array(),FeedbackCommentOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackCommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FeedbackCommentScalarFieldEnumSchema,FeedbackCommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FeedbackCommentFindManyArgsSchema: z.ZodType<Prisma.FeedbackCommentFindManyArgs> = z.object({
  select: FeedbackCommentSelectSchema.optional(),
  include: FeedbackCommentIncludeSchema.optional(),
  where: FeedbackCommentWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackCommentOrderByWithRelationInputSchema.array(),FeedbackCommentOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackCommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FeedbackCommentScalarFieldEnumSchema,FeedbackCommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FeedbackCommentAggregateArgsSchema: z.ZodType<Prisma.FeedbackCommentAggregateArgs> = z.object({
  where: FeedbackCommentWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackCommentOrderByWithRelationInputSchema.array(),FeedbackCommentOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackCommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FeedbackCommentGroupByArgsSchema: z.ZodType<Prisma.FeedbackCommentGroupByArgs> = z.object({
  where: FeedbackCommentWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackCommentOrderByWithAggregationInputSchema.array(),FeedbackCommentOrderByWithAggregationInputSchema ]).optional(),
  by: FeedbackCommentScalarFieldEnumSchema.array(),
  having: FeedbackCommentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FeedbackCommentFindUniqueArgsSchema: z.ZodType<Prisma.FeedbackCommentFindUniqueArgs> = z.object({
  select: FeedbackCommentSelectSchema.optional(),
  include: FeedbackCommentIncludeSchema.optional(),
  where: FeedbackCommentWhereUniqueInputSchema,
}).strict() ;

export const FeedbackCommentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FeedbackCommentFindUniqueOrThrowArgs> = z.object({
  select: FeedbackCommentSelectSchema.optional(),
  include: FeedbackCommentIncludeSchema.optional(),
  where: FeedbackCommentWhereUniqueInputSchema,
}).strict() ;

export const UserBookSubscriptionFindFirstArgsSchema: z.ZodType<Prisma.UserBookSubscriptionFindFirstArgs> = z.object({
  select: UserBookSubscriptionSelectSchema.optional(),
  include: UserBookSubscriptionIncludeSchema.optional(),
  where: UserBookSubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ UserBookSubscriptionOrderByWithRelationInputSchema.array(),UserBookSubscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: UserBookSubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserBookSubscriptionScalarFieldEnumSchema,UserBookSubscriptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserBookSubscriptionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserBookSubscriptionFindFirstOrThrowArgs> = z.object({
  select: UserBookSubscriptionSelectSchema.optional(),
  include: UserBookSubscriptionIncludeSchema.optional(),
  where: UserBookSubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ UserBookSubscriptionOrderByWithRelationInputSchema.array(),UserBookSubscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: UserBookSubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserBookSubscriptionScalarFieldEnumSchema,UserBookSubscriptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserBookSubscriptionFindManyArgsSchema: z.ZodType<Prisma.UserBookSubscriptionFindManyArgs> = z.object({
  select: UserBookSubscriptionSelectSchema.optional(),
  include: UserBookSubscriptionIncludeSchema.optional(),
  where: UserBookSubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ UserBookSubscriptionOrderByWithRelationInputSchema.array(),UserBookSubscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: UserBookSubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserBookSubscriptionScalarFieldEnumSchema,UserBookSubscriptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserBookSubscriptionAggregateArgsSchema: z.ZodType<Prisma.UserBookSubscriptionAggregateArgs> = z.object({
  where: UserBookSubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ UserBookSubscriptionOrderByWithRelationInputSchema.array(),UserBookSubscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: UserBookSubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserBookSubscriptionGroupByArgsSchema: z.ZodType<Prisma.UserBookSubscriptionGroupByArgs> = z.object({
  where: UserBookSubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ UserBookSubscriptionOrderByWithAggregationInputSchema.array(),UserBookSubscriptionOrderByWithAggregationInputSchema ]).optional(),
  by: UserBookSubscriptionScalarFieldEnumSchema.array(),
  having: UserBookSubscriptionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserBookSubscriptionFindUniqueArgsSchema: z.ZodType<Prisma.UserBookSubscriptionFindUniqueArgs> = z.object({
  select: UserBookSubscriptionSelectSchema.optional(),
  include: UserBookSubscriptionIncludeSchema.optional(),
  where: UserBookSubscriptionWhereUniqueInputSchema,
}).strict() ;

export const UserBookSubscriptionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserBookSubscriptionFindUniqueOrThrowArgs> = z.object({
  select: UserBookSubscriptionSelectSchema.optional(),
  include: UserBookSubscriptionIncludeSchema.optional(),
  where: UserBookSubscriptionWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const AuthorCreateArgsSchema: z.ZodType<Prisma.AuthorCreateArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  data: z.union([ AuthorCreateInputSchema,AuthorUncheckedCreateInputSchema ]),
}).strict() ;

export const AuthorUpsertArgsSchema: z.ZodType<Prisma.AuthorUpsertArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  where: AuthorWhereUniqueInputSchema,
  create: z.union([ AuthorCreateInputSchema,AuthorUncheckedCreateInputSchema ]),
  update: z.union([ AuthorUpdateInputSchema,AuthorUncheckedUpdateInputSchema ]),
}).strict() ;

export const AuthorCreateManyArgsSchema: z.ZodType<Prisma.AuthorCreateManyArgs> = z.object({
  data: z.union([ AuthorCreateManyInputSchema,AuthorCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AuthorCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AuthorCreateManyAndReturnArgs> = z.object({
  data: z.union([ AuthorCreateManyInputSchema,AuthorCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AuthorDeleteArgsSchema: z.ZodType<Prisma.AuthorDeleteArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  where: AuthorWhereUniqueInputSchema,
}).strict() ;

export const AuthorUpdateArgsSchema: z.ZodType<Prisma.AuthorUpdateArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  data: z.union([ AuthorUpdateInputSchema,AuthorUncheckedUpdateInputSchema ]),
  where: AuthorWhereUniqueInputSchema,
}).strict() ;

export const AuthorUpdateManyArgsSchema: z.ZodType<Prisma.AuthorUpdateManyArgs> = z.object({
  data: z.union([ AuthorUpdateManyMutationInputSchema,AuthorUncheckedUpdateManyInputSchema ]),
  where: AuthorWhereInputSchema.optional(),
}).strict() ;

export const AuthorDeleteManyArgsSchema: z.ZodType<Prisma.AuthorDeleteManyArgs> = z.object({
  where: AuthorWhereInputSchema.optional(),
}).strict() ;

export const CategoryCreateArgsSchema: z.ZodType<Prisma.CategoryCreateArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  data: z.union([ CategoryCreateInputSchema,CategoryUncheckedCreateInputSchema ]),
}).strict() ;

export const CategoryUpsertArgsSchema: z.ZodType<Prisma.CategoryUpsertArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
  create: z.union([ CategoryCreateInputSchema,CategoryUncheckedCreateInputSchema ]),
  update: z.union([ CategoryUpdateInputSchema,CategoryUncheckedUpdateInputSchema ]),
}).strict() ;

export const CategoryCreateManyArgsSchema: z.ZodType<Prisma.CategoryCreateManyArgs> = z.object({
  data: z.union([ CategoryCreateManyInputSchema,CategoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CategoryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CategoryCreateManyAndReturnArgs> = z.object({
  data: z.union([ CategoryCreateManyInputSchema,CategoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CategoryDeleteArgsSchema: z.ZodType<Prisma.CategoryDeleteArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryUpdateArgsSchema: z.ZodType<Prisma.CategoryUpdateArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  data: z.union([ CategoryUpdateInputSchema,CategoryUncheckedUpdateInputSchema ]),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryUpdateManyArgsSchema: z.ZodType<Prisma.CategoryUpdateManyArgs> = z.object({
  data: z.union([ CategoryUpdateManyMutationInputSchema,CategoryUncheckedUpdateManyInputSchema ]),
  where: CategoryWhereInputSchema.optional(),
}).strict() ;

export const CategoryDeleteManyArgsSchema: z.ZodType<Prisma.CategoryDeleteManyArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
}).strict() ;

export const BookCreateArgsSchema: z.ZodType<Prisma.BookCreateArgs> = z.object({
  select: BookSelectSchema.optional(),
  include: BookIncludeSchema.optional(),
  data: z.union([ BookCreateInputSchema,BookUncheckedCreateInputSchema ]),
}).strict() ;

export const BookUpsertArgsSchema: z.ZodType<Prisma.BookUpsertArgs> = z.object({
  select: BookSelectSchema.optional(),
  include: BookIncludeSchema.optional(),
  where: BookWhereUniqueInputSchema,
  create: z.union([ BookCreateInputSchema,BookUncheckedCreateInputSchema ]),
  update: z.union([ BookUpdateInputSchema,BookUncheckedUpdateInputSchema ]),
}).strict() ;

export const BookCreateManyArgsSchema: z.ZodType<Prisma.BookCreateManyArgs> = z.object({
  data: z.union([ BookCreateManyInputSchema,BookCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BookCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BookCreateManyAndReturnArgs> = z.object({
  data: z.union([ BookCreateManyInputSchema,BookCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BookDeleteArgsSchema: z.ZodType<Prisma.BookDeleteArgs> = z.object({
  select: BookSelectSchema.optional(),
  include: BookIncludeSchema.optional(),
  where: BookWhereUniqueInputSchema,
}).strict() ;

export const BookUpdateArgsSchema: z.ZodType<Prisma.BookUpdateArgs> = z.object({
  select: BookSelectSchema.optional(),
  include: BookIncludeSchema.optional(),
  data: z.union([ BookUpdateInputSchema,BookUncheckedUpdateInputSchema ]),
  where: BookWhereUniqueInputSchema,
}).strict() ;

export const BookUpdateManyArgsSchema: z.ZodType<Prisma.BookUpdateManyArgs> = z.object({
  data: z.union([ BookUpdateManyMutationInputSchema,BookUncheckedUpdateManyInputSchema ]),
  where: BookWhereInputSchema.optional(),
}).strict() ;

export const BookDeleteManyArgsSchema: z.ZodType<Prisma.BookDeleteManyArgs> = z.object({
  where: BookWhereInputSchema.optional(),
}).strict() ;

export const FeedbackCreateArgsSchema: z.ZodType<Prisma.FeedbackCreateArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  data: z.union([ FeedbackCreateInputSchema,FeedbackUncheckedCreateInputSchema ]),
}).strict() ;

export const FeedbackUpsertArgsSchema: z.ZodType<Prisma.FeedbackUpsertArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereUniqueInputSchema,
  create: z.union([ FeedbackCreateInputSchema,FeedbackUncheckedCreateInputSchema ]),
  update: z.union([ FeedbackUpdateInputSchema,FeedbackUncheckedUpdateInputSchema ]),
}).strict() ;

export const FeedbackCreateManyArgsSchema: z.ZodType<Prisma.FeedbackCreateManyArgs> = z.object({
  data: z.union([ FeedbackCreateManyInputSchema,FeedbackCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FeedbackCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FeedbackCreateManyAndReturnArgs> = z.object({
  data: z.union([ FeedbackCreateManyInputSchema,FeedbackCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FeedbackDeleteArgsSchema: z.ZodType<Prisma.FeedbackDeleteArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereUniqueInputSchema,
}).strict() ;

export const FeedbackUpdateArgsSchema: z.ZodType<Prisma.FeedbackUpdateArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  data: z.union([ FeedbackUpdateInputSchema,FeedbackUncheckedUpdateInputSchema ]),
  where: FeedbackWhereUniqueInputSchema,
}).strict() ;

export const FeedbackUpdateManyArgsSchema: z.ZodType<Prisma.FeedbackUpdateManyArgs> = z.object({
  data: z.union([ FeedbackUpdateManyMutationInputSchema,FeedbackUncheckedUpdateManyInputSchema ]),
  where: FeedbackWhereInputSchema.optional(),
}).strict() ;

export const FeedbackDeleteManyArgsSchema: z.ZodType<Prisma.FeedbackDeleteManyArgs> = z.object({
  where: FeedbackWhereInputSchema.optional(),
}).strict() ;

export const FeedbackCommentCreateArgsSchema: z.ZodType<Prisma.FeedbackCommentCreateArgs> = z.object({
  select: FeedbackCommentSelectSchema.optional(),
  include: FeedbackCommentIncludeSchema.optional(),
  data: z.union([ FeedbackCommentCreateInputSchema,FeedbackCommentUncheckedCreateInputSchema ]),
}).strict() ;

export const FeedbackCommentUpsertArgsSchema: z.ZodType<Prisma.FeedbackCommentUpsertArgs> = z.object({
  select: FeedbackCommentSelectSchema.optional(),
  include: FeedbackCommentIncludeSchema.optional(),
  where: FeedbackCommentWhereUniqueInputSchema,
  create: z.union([ FeedbackCommentCreateInputSchema,FeedbackCommentUncheckedCreateInputSchema ]),
  update: z.union([ FeedbackCommentUpdateInputSchema,FeedbackCommentUncheckedUpdateInputSchema ]),
}).strict() ;

export const FeedbackCommentCreateManyArgsSchema: z.ZodType<Prisma.FeedbackCommentCreateManyArgs> = z.object({
  data: z.union([ FeedbackCommentCreateManyInputSchema,FeedbackCommentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FeedbackCommentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FeedbackCommentCreateManyAndReturnArgs> = z.object({
  data: z.union([ FeedbackCommentCreateManyInputSchema,FeedbackCommentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FeedbackCommentDeleteArgsSchema: z.ZodType<Prisma.FeedbackCommentDeleteArgs> = z.object({
  select: FeedbackCommentSelectSchema.optional(),
  include: FeedbackCommentIncludeSchema.optional(),
  where: FeedbackCommentWhereUniqueInputSchema,
}).strict() ;

export const FeedbackCommentUpdateArgsSchema: z.ZodType<Prisma.FeedbackCommentUpdateArgs> = z.object({
  select: FeedbackCommentSelectSchema.optional(),
  include: FeedbackCommentIncludeSchema.optional(),
  data: z.union([ FeedbackCommentUpdateInputSchema,FeedbackCommentUncheckedUpdateInputSchema ]),
  where: FeedbackCommentWhereUniqueInputSchema,
}).strict() ;

export const FeedbackCommentUpdateManyArgsSchema: z.ZodType<Prisma.FeedbackCommentUpdateManyArgs> = z.object({
  data: z.union([ FeedbackCommentUpdateManyMutationInputSchema,FeedbackCommentUncheckedUpdateManyInputSchema ]),
  where: FeedbackCommentWhereInputSchema.optional(),
}).strict() ;

export const FeedbackCommentDeleteManyArgsSchema: z.ZodType<Prisma.FeedbackCommentDeleteManyArgs> = z.object({
  where: FeedbackCommentWhereInputSchema.optional(),
}).strict() ;

export const UserBookSubscriptionCreateArgsSchema: z.ZodType<Prisma.UserBookSubscriptionCreateArgs> = z.object({
  select: UserBookSubscriptionSelectSchema.optional(),
  include: UserBookSubscriptionIncludeSchema.optional(),
  data: z.union([ UserBookSubscriptionCreateInputSchema,UserBookSubscriptionUncheckedCreateInputSchema ]),
}).strict() ;

export const UserBookSubscriptionUpsertArgsSchema: z.ZodType<Prisma.UserBookSubscriptionUpsertArgs> = z.object({
  select: UserBookSubscriptionSelectSchema.optional(),
  include: UserBookSubscriptionIncludeSchema.optional(),
  where: UserBookSubscriptionWhereUniqueInputSchema,
  create: z.union([ UserBookSubscriptionCreateInputSchema,UserBookSubscriptionUncheckedCreateInputSchema ]),
  update: z.union([ UserBookSubscriptionUpdateInputSchema,UserBookSubscriptionUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserBookSubscriptionCreateManyArgsSchema: z.ZodType<Prisma.UserBookSubscriptionCreateManyArgs> = z.object({
  data: z.union([ UserBookSubscriptionCreateManyInputSchema,UserBookSubscriptionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserBookSubscriptionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserBookSubscriptionCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserBookSubscriptionCreateManyInputSchema,UserBookSubscriptionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserBookSubscriptionDeleteArgsSchema: z.ZodType<Prisma.UserBookSubscriptionDeleteArgs> = z.object({
  select: UserBookSubscriptionSelectSchema.optional(),
  include: UserBookSubscriptionIncludeSchema.optional(),
  where: UserBookSubscriptionWhereUniqueInputSchema,
}).strict() ;

export const UserBookSubscriptionUpdateArgsSchema: z.ZodType<Prisma.UserBookSubscriptionUpdateArgs> = z.object({
  select: UserBookSubscriptionSelectSchema.optional(),
  include: UserBookSubscriptionIncludeSchema.optional(),
  data: z.union([ UserBookSubscriptionUpdateInputSchema,UserBookSubscriptionUncheckedUpdateInputSchema ]),
  where: UserBookSubscriptionWhereUniqueInputSchema,
}).strict() ;

export const UserBookSubscriptionUpdateManyArgsSchema: z.ZodType<Prisma.UserBookSubscriptionUpdateManyArgs> = z.object({
  data: z.union([ UserBookSubscriptionUpdateManyMutationInputSchema,UserBookSubscriptionUncheckedUpdateManyInputSchema ]),
  where: UserBookSubscriptionWhereInputSchema.optional(),
}).strict() ;

export const UserBookSubscriptionDeleteManyArgsSchema: z.ZodType<Prisma.UserBookSubscriptionDeleteManyArgs> = z.object({
  where: UserBookSubscriptionWhereInputSchema.optional(),
}).strict() ;