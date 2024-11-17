import { Router } from "express";
import { UserMutations } from "../controllers/user/mutation";
import { UserQueries } from "../controllers/user/query";
import { authenticate } from "../auth";

const userRoutes = Router();

const { getAllUsers } = UserQueries;

const { createUser, loginUser } = UserMutations;
userRoutes.post("/register", createUser);
userRoutes.post("/login", loginUser);

userRoutes.get("/", authenticate, getAllUsers);

export { userRoutes };
