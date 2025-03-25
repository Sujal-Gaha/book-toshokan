import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import { routes } from './presentation/routes';
import { toNodeHandler } from 'better-auth/node';
import { auth } from '@book-toshokan/libs/backend-db';

dotenv.config();
export const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;

if (!FRONTEND_URL) {
  throw new Error('FRONTEND_URL is missing from the env');
}
app.use(
  cors({
    origin: [FRONTEND_URL],
    credentials: true,
  })
);

app.all('/api/auth/*', toNodeHandler(auth));

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 200,
    success: true,
    message: 'Hello from the server!',
  });
});

app.use('/api/v1/authors', routes.author);
app.use('/api/v1/categories', routes.category);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
