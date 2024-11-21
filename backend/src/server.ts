import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {
  authorRoutes,
  bookRoutes,
  categoryRoutes,
  userRoutes,
  userBookSubscriptionRouter,
} from "./routes";
import cors from "cors";

dotenv.config();
export const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [FRONTEND_URL],
  })
);

app.get("/", (req: Request, res: Response) => {
  res.json({
    status: 200,
    success: true,
    message: "Hello from the server!",
  });
});

app.use("/api/users", userRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/userBookSubscription", userBookSubscriptionRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
