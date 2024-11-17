import { Router } from "express";
import { CategoryMutations } from "../controllers/category/mutation";
import { CategoryQueries } from "../controllers/category/query";

const categoryRoutes = Router();

const { getAllQuery } = CategoryQueries;
categoryRoutes.get("/", getAllQuery);

const { addCategory, updateCategory, deleteCategory } = CategoryMutations;
categoryRoutes.post("/add", addCategory);
categoryRoutes.put("/update/:categoryId", updateCategory);
categoryRoutes.delete("/delete/:categoryId", deleteCategory);

export { categoryRoutes };
