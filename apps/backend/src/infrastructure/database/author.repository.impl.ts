import { db } from '@book-toshokan/libs/backend-db';
import { AbstractAuthorRepository } from '../../application/repository/author.repository';
import {
  TCreateAuthorInput,
  TCreateAuthorOutput,
  TDeleteAuthorInput,
  TDeleteAuthorOutput,
  TFindAllAuthorsOutput,
  TFindAuthorByIdInput,
  TFindAuthorByIdOutput,
  TFindAuthorByNameInput,
  TFindAuthorByNameOutput,
  TUpdateAuthorInput,
  TUpdateAuthorOutput,
} from '@book-toshokan/libs/domain';

export class AuthorRepository implements AbstractAuthorRepository {
  async createAuthor(input: TCreateAuthorInput): Promise<TCreateAuthorOutput> {
    const author = await db.author.create({
      data: {
        name: input.name,
        about: input.about,
      },
    });

    return {
      id: author.id,
      name: author.name,
      about: author.about,
    };
  }

  async findAuthorById(input: TFindAuthorByIdInput): Promise<TFindAuthorByIdOutput> {
    const authorById = await db.author.findFirst({
      where: {
        id: input.id,
      },
    });

    return {
      id: authorById.id,
      name: authorById.name,
      about: authorById.about,
    };
  }

  async findAllAuthors(): Promise<TFindAllAuthorsOutput> {
    const allAuthors = await db.author.findMany({});
    return allAuthors.map((author) => ({
      id: author.id,
      name: author.name,
      about: author.about,
    }));
  }

  async findAuthorByName(input: TFindAuthorByNameInput): Promise<TFindAuthorByNameOutput> {
    const authorByName = await db.author.findFirst({
      where: {
        name: input.name,
      },
    });
    return {
      id: authorByName.id,
      name: authorByName.name,
      about: authorByName.about,
    };
  }

  async updateAuthor(input: TUpdateAuthorInput): Promise<TUpdateAuthorOutput> {
    const updatedAuthor = await db.author.update({
      where: {
        id: input.id,
      },
      data: {
        id: input.id,
        name: input.name,
        about: input.about,
      },
    });

    return {
      id: updatedAuthor.id,
      name: updatedAuthor.name,
      about: updatedAuthor.about,
    };
  }

  async deleteAuthor(input: TDeleteAuthorInput): Promise<TDeleteAuthorOutput> {
    const deletedAuthor = await db.author.delete({
      where: {
        id: input.id,
      },
    });

    return {
      id: deletedAuthor.id,
      name: deletedAuthor.name,
      about: deletedAuthor.about,
    };
  }
}
