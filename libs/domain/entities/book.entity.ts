import { ReadStatusEnum } from '@prisma/client';

export class Book {
  constructor(
    public id: string,
    public authorId: string,
    public categoryId: string,
    public name: string,
    public description: string,
    public image: string,
    public subImages: string[] = [],
    public pages: number,
    public publishedOn: Date,
    public readStatus?: ReadStatusEnum
  ) {}
}
