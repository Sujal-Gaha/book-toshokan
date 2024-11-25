import { Router } from "express";
import { authenticate } from "../auth";
import { AuthorMutations } from "../controllers/author/mutation";
import { AuthorQueries } from "../controllers/author/query";
import { app } from "../server";

const router = Router();

const { getAllAuthors } = AuthorQueries;
router.get("/", getAllAuthors);

const { addAuthor, updateAuthor, deleteAuthor } = AuthorMutations;

router.post("/add", authenticate, addAuthor);
router.put("/update/:authorId", updateAuthor);
router.delete("/delete/:authorId", deleteAuthor);

export { router as authorRoutes };
