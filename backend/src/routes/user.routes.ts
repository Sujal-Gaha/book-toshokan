import { Router } from "express";
import { UserMutations } from "../controllers/user/mutation";
import { UserQueries } from "../controllers/user/query";

const router = Router();

const { getAllUsers } = UserQueries;
router.get("/", getAllUsers);

const { createUser } = UserMutations;
router.post("/register", createUser);

export default router;
