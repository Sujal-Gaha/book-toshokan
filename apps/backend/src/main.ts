import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import { routes } from './presentation/routes';

dotenv.config();
export const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;

if (!FRONTEND_URL) {
  throw new Error('FRONTEND_URL is missing from the env');
}

app.use(helmet);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [FRONTEND_URL],
  })
);

app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 200,
    success: true,
    message: 'Hello from the server!',
  });
});

app.use('/api/v1/users', routes.userRoutes);
app.use('/api/v1/authors', routes.authorRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
