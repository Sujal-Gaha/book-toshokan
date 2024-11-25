import { Router } from "express";
import { BookMutations } from "../controllers/book/mutation";
import { BookQueries } from "../controllers/book/query";

const router = Router();

const {
  getRecommendedBooks,
  getAllBooks,
  getBooksByCategoryId,
  getBooksByAuthorId,
} = BookQueries;
router.get("/", getAllBooks);
router.get("/getRecommendedBooks", getRecommendedBooks);
router.get("/getBooksByCategoryId/:categoryId", getBooksByCategoryId);
router.get("/getBooksByAuthorId/:authorId", getBooksByAuthorId);

const { addBook } = BookMutations;
router.post("/add", addBook);

export { router as bookRoutes };
