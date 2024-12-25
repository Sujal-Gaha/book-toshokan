import { Request, Response } from 'express';
import { CreateAuthorUseCase } from '../../application/use-cases/author/create-author';
import { AuthorRepository } from '../../infrastructure/database/author.repository.impl';
import { FindAllAuthorsUseCase } from '../../application/use-cases/author/find-all-authors';
import { FindAuthorByIdUseCase } from '../../application/use-cases/author/find-author-by-id';
import { FindAuthorByNameUseCase } from '../../application/use-cases/author/find-author-by-name';
import { UpdateAuthorUseCase } from '../../application/use-cases/author/update-author';

const authorRepository = new AuthorRepository();

const createAuthorUseCase = new CreateAuthorUseCase(authorRepository);
const findAllAuthorsUseCase = new FindAllAuthorsUseCase(authorRepository);
const findAuthorByIdUseCase = new FindAuthorByIdUseCase(authorRepository);
const findAuthorByNameUseCase = new FindAuthorByNameUseCase(authorRepository);
const updateAuthorUseCase = new UpdateAuthorUseCase(authorRepository);

export class AuthorController {
  static async createAuthor(req: Request, res: Response) {
    try {
      const author = await createAuthorUseCase.execute(req.body);
      res.status(201).json(author);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async findAllAuthors(req: Request, res: Response) {
    try {
      const authors = await findAllAuthorsUseCase.execute();
      res.status(200).json(authors);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async findAuthorById(req: Request, res: Response) {
    try {
      const authorById = await findAuthorByIdUseCase.execute({ id: req.params.id });
      res.status(200).json(authorById);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async findAuthorByName(req: Request, res: Response) {
    try {
      const authorByName = await findAuthorByNameUseCase.execute({ name: req.body.name });
      res.status(200).json(authorByName);
    } catch (error) {
      res.status(400).json({ error: error.messages });
    }
  }

  static async updateAuthor(req: Request, res: Response) {
    try {
      const updatedAuthor = await updateAuthorUseCase.execute(req.body);
      res.status(200).json(updatedAuthor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
