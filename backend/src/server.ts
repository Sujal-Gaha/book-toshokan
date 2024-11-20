import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {
  authorRoutes,
  bookRoutes,
  categoryRoutes,
  userRoutes,
  userBookSubscriptionRouter,
} from "./routes";

dotenv.config();
export const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/userBookSubscription", userBookSubscriptionRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
