import { Router } from "express";
import { CategoryMutations } from "../controllers/category/mutation";
import { CategoryQueries } from "../controllers/category/query";

const router = Router();

const { getAllQuery } = CategoryQueries;
router.get("/", getAllQuery);

const { addCategory, updateCategory, deleteCategory } = CategoryMutations;
router.post("/add", addCategory);
router.put("/update/:categoryId", updateCategory);
router.delete("/delete/:categoryId", deleteCategory);

export { router as categoryRoutes };
