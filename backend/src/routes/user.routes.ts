import { Router } from "express";
import { UserMutations } from "../controllers/user/mutation";

const router = Router();

const { createUser } = UserMutations;

router.post("/register", createUser);

export default router;
