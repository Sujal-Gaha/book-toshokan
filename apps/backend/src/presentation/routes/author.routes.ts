import { Router } from 'express';
import { AuthorController } from '../controllers/author.controller';

const router = Router();

router.post('/create', AuthorController.createAuthor);
router.post('/findAllAuthors', AuthorController.findAllAuthors);
router.post('/findAuthorById/:authorId', AuthorController.findAuthorById);
router.post('/findAuthorByName/:authorName', AuthorController.findAuthorByName);

export default router;
