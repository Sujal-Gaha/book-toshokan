import { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Pagination,
} from "@nextui-org/react";
import { Star, BookOpen } from "lucide-react";

interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  rating: number;
  genre: string;
}

const booksPerPage = 9;

const dummyBooks: Book[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Book Title ${i + 1}`,
  author: `Author ${i + 1}`,
  coverImage: `/placeholder.svg?height=300&width=200&text=Book${i + 1}`,
  rating: 4 + Math.random(),
  genre: ["Fiction", "Non-Fiction", "Mystery", "Sci-Fi", "Romance"][
    Math.floor(Math.random() * 5)
  ],
}));

export const BookRecommendationsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dummyBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = dummyBooks.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Book Recommendations
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentBooks.map((book) => (
            <Card key={book.id} className="bg-background/60 border-none">
              <CardBody className="p-0">
                <Image
                  src={book.coverImage}
                  alt={`${book.title} cover`}
                  className="w-full object-cover h-[300px]"
                />
              </CardBody>
              <CardFooter className="flex-col items-start">
                <h4 className="font-bold text-large">{book.title}</h4>
                <p className="text-small text-default-500">{book.author}</p>
                <div className="flex justify-between items-center w-full mt-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-warning text-warning mr-1" />
                    <span className="text-sm font-bold">
                      {book.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1 text-default-500" />
                    <span className="text-sm text-default-500">
                      {book.genre}
                    </span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <Pagination
            total={totalPages}
            initialPage={1}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};
