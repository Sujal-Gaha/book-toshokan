import { Request, Response } from 'express';
import { CreateAuthorUseCase } from '../../application/use-cases/author/create-author';
import { AuthorRepository } from '../../infrastructure/database/author.repository.impl';
import { FindAllAuthorsUseCase } from '../../application/use-cases/author/find-all-authors';
import { FindAuthorByIdUseCase } from '../../application/use-cases/author/find-author-by-id';
import { FindAuthorByNameUseCase } from '../../application/use-cases/author/find-author-by-name';
import { UpdateAuthorUseCase } from '../../application/use-cases/author/update-author';
import { DeleteAuthorUseCase } from '../../application/use-cases/author/delete-author';
import {
  TApiResponse,
  TCreateAuthorOutput,
  TDeleteAuthorOutput,
  TFindAllAuthorsOutput,
  TFindAuthorByIdOutput,
  TFindAuthorByNameOutput,
  TUpdateAuthorOutput,
} from '@book-toshokan/libs/domain';
import { StatusCodes } from 'http-status-codes';

const authorRepository = new AuthorRepository();

const createAuthorUseCase = new CreateAuthorUseCase(authorRepository);
const findAllAuthorsUseCase = new FindAllAuthorsUseCase(authorRepository);
const findAuthorByIdUseCase = new FindAuthorByIdUseCase(authorRepository);
const findAuthorByNameUseCase = new FindAuthorByNameUseCase(authorRepository);
const updateAuthorUseCase = new UpdateAuthorUseCase(authorRepository);
const deleteAuthorUseCase = new DeleteAuthorUseCase(authorRepository);

export class AuthorController {
  static async createAuthor(req: Request, res: Response) {
    const { name, about } = req.body;

    if (!name || !about) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide all the necessary fields' });
    }

    try {
      const author = await createAuthorUseCase.execute({ name, about });

      const response: TApiResponse<TCreateAuthorOutput> = {
        status: StatusCodes.CREATED,
        body: {
          data: author,
          message: 'Created author successfully',
        },
      };

      res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  }

  static async findAllAuthors(req: Request, res: Response) {
    try {
      const authors = await findAllAuthorsUseCase.execute();

      const response: TApiResponse<TFindAllAuthorsOutput> = {
        status: StatusCodes.OK,
        body: {
          data: authors,
          message: 'Fetched all the authors successfully',
        },
      };

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  }

  static async findAuthorById(req: Request, res: Response) {
    const { authorId } = req.params;

    if (!authorId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Please provide the author's id" });
    }

    try {
      const authorById = await findAuthorByIdUseCase.execute({ id: authorId });

      if (!authorById) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Author not found' });
      }

      const response: TApiResponse<TFindAuthorByIdOutput> = {
        status: StatusCodes.OK,
        body: {
          data: authorById,
          message: 'Fetched the author successfully',
        },
      };

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  }

  static async findAuthorByName(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Please provide the author's name" });
    }

    try {
      const authorByName = await findAuthorByNameUseCase.execute({ name });

      if (!authorByName) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Author not found' });
      }

      const response: TApiResponse<TFindAuthorByNameOutput> = {
        status: StatusCodes.OK,
        body: {
          data: authorByName,
          message: 'Fetched the author successfully',
        },
      };

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.messages });
    }
  }

  static async updateAuthor(req: Request, res: Response) {
    const { authorId } = req.params;
    const { name, about } = req.body;

    if (!authorId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Please provide the author's id" });
    }

    if (!name || !about) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide all the necessary fields' });
    }

    try {
      const updatedAuthor = await updateAuthorUseCase.execute({ id: authorId, name: name, about: about });

      const response: TApiResponse<TUpdateAuthorOutput> = {
        status: StatusCodes.OK,
        body: {
          data: updatedAuthor,
          message: 'Updated author successfully',
        },
      };

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  }

  static async deleteAuthor(req: Request, res: Response) {
    const { authorId } = req.params;

    if (!authorId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Please provide the author's id" });
    }

    try {
      const deletedAuthor = await deleteAuthorUseCase.execute({ id: authorId });

      const response: TApiResponse<TDeleteAuthorOutput> = {
        status: StatusCodes.OK,
        body: {
          data: deletedAuthor,
          message: 'Deleted author successfully',
        },
      };

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  }
}
