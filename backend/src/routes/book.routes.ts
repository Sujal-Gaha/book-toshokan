import { Router } from "express";
import { BookMutations } from "../controllers/book/mutation";
import { BookQueries } from "../controllers/book/query";

const bookRoutes = Router();

const { getAllBooks } = BookQueries;
bookRoutes.get("/", getAllBooks);

const { addBook } = BookMutations;
bookRoutes.post("/add", addBook);

export { bookRoutes };
