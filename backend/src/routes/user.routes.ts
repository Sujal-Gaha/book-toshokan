import { Router } from "express";
import { UserMutations } from "../controllers/user/mutation";
import { UserQueries } from "../controllers/user/query";
import { authenticate } from "../auth";

const router = Router();

const { getAllUsers } = UserQueries;

const { registerUser, loginUser } = UserMutations;
router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/", authenticate, getAllUsers);

export { router as userRoutes };
