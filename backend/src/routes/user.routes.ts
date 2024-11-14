import { Router } from "express";
import { UserMutations } from "../controllers/user/mutation";
import { UserQueries } from "../controllers/user/query";
import { authenticate } from "../auth";

const router = Router();

const { getAllUsers } = UserQueries;

const { createUser, loginUser } = UserMutations;
router.post("/register", createUser);
router.post("/login", loginUser);

router.get("/", authenticate, getAllUsers);

export default router;
