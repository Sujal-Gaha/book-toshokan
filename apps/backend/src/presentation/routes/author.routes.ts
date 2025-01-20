import { Router } from 'express';
import { AuthorController } from '../controllers/author.controller';

const router = Router();

router.post('/createAuthor', AuthorController.createAuthor);
router.get('/findAllAuthor', AuthorController.findAllAuthor);
router.get('/findAuthorById/:authorId', AuthorController.findAuthorById);
router.put('/updateAuthor/:authorId', AuthorController.updateAuthor);
router.delete('/deleteAuthor/:authorId', AuthorController.deleteAuthor);

export default router;
