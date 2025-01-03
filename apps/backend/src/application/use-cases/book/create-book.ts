import { TCreateBookInput, TCreateBookOutput } from '@book-toshokan/libs/domain';
import { AbstractAuthorRepository } from '../../repository/author.repository';
import { AbstractBookRepository } from '../../repository/book.repository';

export class CreateBookUseCase {
  constructor(private bookRepository: AbstractBookRepository, private authorRepository: AbstractAuthorRepository) {}

  async execute(input: TCreateBookInput): Promise<TCreateBookOutput> {
    const authorExists = await this.authorRepository.findAuthorById({
      id: input.authorId,
    });

    if (!authorExists) {
      throw new Error('Author does not exist');
    }

    const bookExists = await this.bookRepository.findBookByName({
      name: input.name,
    });

    if (bookExists) {
      throw new Error('Book already exists');
    }

    return this.bookRepository.createBook({
      name: input.name,
      description: input.description,
      authorId: input.authorId,
      categoryId: input.categoryId,
      image: input.image,
      subImages: input.subImages,
      pages: input.pages,
      publishedOn: input.publishedOn,
    });
  }
}
