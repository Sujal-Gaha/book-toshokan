import { Router } from "express";
import { BookMutations } from "../controllers/book/mutation";
import { BookQueries } from "../controllers/book/query";

const bookRoutes = Router();

const { getAllBooks, getBooksByCategoryId, getBooksByAuthorId } = BookQueries;
bookRoutes.get("/", getAllBooks);
bookRoutes.get("/getBooksByCategoryId/:categoryId", getBooksByCategoryId);
bookRoutes.get("/getBooksByAuthorId/:authorId", getBooksByAuthorId);

const { addBook } = BookMutations;
bookRoutes.post("/add", addBook);

export { bookRoutes };
