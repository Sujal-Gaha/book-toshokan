import userRoutes from './user.routes';
import authorRoutes from './author.routes';

export const routes = {
  userRoutes: userRoutes,
  authorRoutes: authorRoutes,
} as const;
