import { Book } from '../../domain/entities/book.entity';

export interface IBookRepository {
  create(book: Book): Promise<Book>;
  findAll(): Promise<Book[]>;
  findById(id: string): Promise<Book>;
  findByAuthorId(id: string): Promise<Book[]>;
  findByCategoryId(id: string): Promise<Book[]>;
  update(id: string, book: Book): Promise<Book>;
  delete(id: string): Promise<Book>;
}
