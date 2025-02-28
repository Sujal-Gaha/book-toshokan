import { db } from '@book-toshokan/libs/backend-db';
import { AbstractAuthorRepository } from '../../application/repository/author.repository';
import {
  CreateAuthorInput,
  CreateAuthorOutput,
  DeleteAuthorInput,
  DeleteAuthorOutput,
  FindAllAuthorInput,
  FindAllAuthorOutput,
  FindAuthorByIdInput,
  FindAuthorByIdOutput,
  UpdateAuthorInput,
  UpdateAuthorOutput,
} from '@book-toshokan/libs/domain';

export class AuthorRepository implements AbstractAuthorRepository {
  async createAuthor(input: CreateAuthorInput): Promise<CreateAuthorOutput> {
    const author = await db.author.create({
      data: {
        name: input.name,
        description: input.description,
      },
    });

    return {
      id: author.id,
      name: author.name,
      description: author.description,
    };
  }

  async findAuthorById(input: FindAuthorByIdInput): Promise<FindAuthorByIdOutput> {
    const authorById = await db.author.findFirst({
      where: {
        id: input.id,
      },
    });

    return {
      id: authorById.id,
      name: authorById.name,
      description: authorById.description,
    };
  }

  async findAllAuthor(input: FindAllAuthorInput): Promise<FindAllAuthorOutput> {
    const take = input.pageInfo?.perPage || 10;
    const skip = input.pageInfo?.page ? (input.pageInfo.page - 1) * take : 0;

    const authors = await db.author.findMany({
      ...(input.name
        ? {
            where: {
              name: {
                contains: input.name,
                mode: 'insensitive',
              },
            },
          }
        : null),
      skip: skip,
      take: take,
    });

    const totalCount = await db.author.count({
      ...(input.name && {
        where: {
          name: {
            contains: input.name,
            mode: 'insensitive',
          },
        },
      }),
    });

    const totalPages = Math.ceil(totalCount / take);

    return {
      authors: authors,
      pageInfo: {
        currentPage: input.pageInfo?.page || 1,
        perPage: take,
        totalCount: totalCount,
        totalPages: totalPages,
      },
    };
  }

  async updateAuthor(input: UpdateAuthorInput): Promise<UpdateAuthorOutput> {
    const updatedAuthor = await db.author.update({
      where: {
        id: input.id,
      },
      data: {
        id: input.id,
        name: input.name,
        description: input.description,
      },
    });

    return {
      id: updatedAuthor.id,
      name: updatedAuthor.name,
      description: updatedAuthor.description,
    };
  }

  async deleteAuthor(input: DeleteAuthorInput): Promise<DeleteAuthorOutput> {
    const deletedAuthor = await db.author.delete({
      where: {
        id: input.id,
      },
    });

    return {
      id: deletedAuthor.id,
      name: deletedAuthor.name,
      description: deletedAuthor.description,
    };
  }
}
