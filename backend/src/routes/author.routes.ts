import { Router } from "express";
import { authenticate } from "../auth";
import { AuthorMutations } from "../controllers/author/mutation";
import { AuthorQueries } from "../controllers/author/query";

const authorRoutes = Router();

const { getAllAuthors } = AuthorQueries;
authorRoutes.get("/", getAllAuthors);

const { addAuthor, updateAuthor, deleteAuthor } = AuthorMutations;

authorRoutes.post("/add", addAuthor);
authorRoutes.put("/update/:authorId", updateAuthor);
authorRoutes.delete("/delete/:authorId", deleteAuthor);

export { authorRoutes };
