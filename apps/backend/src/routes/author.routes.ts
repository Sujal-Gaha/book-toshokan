import { Router } from "express";
import { AuthorMutations } from "../controllers/author/mutation";
import { AuthorQueries } from "../controllers/author/query";

const router = Router();

const { getAllAuthors } = AuthorQueries;
router.get("/", getAllAuthors);

const { addAuthor, updateAuthor, deleteAuthor } = AuthorMutations;

router.post("/add", addAuthor);
router.put("/update/:authorId", updateAuthor);
router.delete("/delete/:authorId", deleteAuthor);

export { router as authorRoutes };
