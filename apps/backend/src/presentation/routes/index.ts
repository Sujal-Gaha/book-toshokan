// import userRoutes from './user.routes';
import authorRoutes from './author.routes';
import categoryRoutes from './category.routes';

export const routes = {
  // user: userRoutes,
  author: authorRoutes,
  category: categoryRoutes,
} as const;
