import { Book } from '../../../domain/entities/book.entity';
import { IBookRepository } from '../../repository/book.repository';

export class CreateBookUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(book: Book): Promise<Book> {
    const bookExists = await this.bookRepository.findById(book.id);

    if (!bookExists) {
      throw new Error('Book already exists');
    }

    return this.bookRepository.create(book);
  }
}
