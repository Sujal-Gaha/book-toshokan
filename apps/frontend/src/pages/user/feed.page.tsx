import { useState } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Pagination,
} from '@nextui-org/react';
import { Star, BookOpen } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getAllBooks } from '../../api/data/book';

type BookResponse = {
  status: number;
  body: {
    data: Book[];
    pageInfo: PageInfo;
  };
  success: boolean;
  message: string;
};

type Book = {
  id: string;
  authorId: string;
  categoryId: string;
  readStatus: string | null;
  name: string;
  description: string;
  image: string;
  subImages: string[];
  pages: number;
  publishedOn: string;
  author: Author;
  category: Category;
  feedback: any;
};

type Author = {
  id: string;
  name: string;
};

type Category = {
  id: string;
  name: string;
};

type PageInfo = {
  page: number;
  perPage: number;
  totalPage: number;
};

const BookCard = ({ book }: { book: Book }) => {
  return (
    <Card key={book.id} className="bg-background/60 border hover:border-gray">
      <CardBody className="p-0">
        <Image
          src={book.image}
          alt={`${book.name} cover`}
          className="w-full object-cover h-[300px]"
        />
      </CardBody>
      <CardFooter className="flex-col items-start">
        <h4 className="font-bold text-large">{book.name}</h4>
        <p className="text-small text-default-500">{book.author.name}</p>
        <div className="flex justify-between items-center w-full mt-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-warning text-warning mr-1" />
            <span className="text-sm font-bold">{4.5}</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1 text-default-500" />
            <span className="text-sm text-default-500">
              {book.category.name}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export const BookFeedPage = () => {
  const [page, setPage] = useState(1);

  const perPage = 10;

  const { data } = useQuery<BookResponse>({
    queryKey: ['getAllBooks', page, perPage],
    queryFn: () => getAllBooks({ page, perPage }),
  });

  if (data?.status !== 200) return null;

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Book Recommendations
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {data?.body.data.map((book) => (
            <BookCard book={book} />
          ))}
        </div>
        <div className="flex justify-center">
          <Pagination
            total={data?.body.pageInfo.totalPage || 10}
            initialPage={1}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};
