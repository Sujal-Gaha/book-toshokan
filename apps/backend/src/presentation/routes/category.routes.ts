import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';

const router = Router();

router.post('/createCategory', CategoryController.createCategory);
router.get('/findAllCategory', CategoryController.findAllCategory);
router.get('/findCategoryById/:categoryId', CategoryController.findCategoryById);
router.put('/updateCategory/:categoryId', CategoryController.updateCategory);
router.delete('/deleteCategory/:categoryId', CategoryController.deleteCategory);

export default router;
