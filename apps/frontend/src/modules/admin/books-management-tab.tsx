import { Card, CardBody, CardHeader, Input, Button, Pagination } from '@nextui-org/react';
import { PlusCircle, Search } from 'lucide-react';
import { useAddBookModal } from './add-book-modal';
import { Dispatch, Key, SetStateAction, useCallback, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from '@nextui-org/react';
import { DeleteIcon, EyeIcon, EditIcon } from '../../icons';
import { useQuery } from '@tanstack/react-query';
import { getAllBooks } from '../../data/book';
import { Loading } from '@book-toshokan/libs/shared-ui';

type TColumn = {
  name: string;
  uid: string;
};

type TBook = {
  id: number;
  name: string;
  author: string;
  category: string;
};

type BookResponse = {
  status: number;
  body: {
    data: Book[];
    pageInfo: PageInfo;
    message: string;
  };
  success: boolean;
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

const columns: TColumn[] = [
  { name: 'NAME', uid: 'name' },
  { name: 'AUTHOR', uid: 'author' },
  { name: 'CATEGORY', uid: 'category' },
  { name: 'ACTIONS', uid: 'actions' },
];

const books: TBook[] = [
  {
    id: 1,
    name: 'The Stranger',
    author: 'Albert Camus',
    category: 'Philosophical Novel',
  },
  {
    id: 2,
    name: 'The Plaque',
    author: 'Albert Camus',
    category: 'Novel',
  },
  {
    id: 3,
    name: 'The Myth of Sisyphus',
    author: 'Albert Camus',
    category: 'Philosophical Novel',
  },
];

const BooksManagementTable = ({ page, setPage }: { page: number; setPage: Dispatch<SetStateAction<number>> }) => {
  const renderCell = useCallback((book: TBook, columnKey: Key) => {
    const cellValue = book[columnKey as keyof TBook];

    switch (columnKey) {
      case 'name':
        return book.name;
      case 'author':
        return book.author;
      case 'category':
        return book.category;
      case 'actions':
        return (
          <div className="flex items-center gap-2.5 justify-center">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      removeWrapper
      aria-label="Book Management Table"
      classNames={{
        wrapper: 'min-h-[222px]',
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={books}>
        {(item) => (
          <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export const BooksManagementTab = () => {
  const { AddBookModalNode, openAddBookModal } = useAddBookModal();
  const [page, setPage] = useState(1);

  const pages = 20;
  const perPage = 10;

  const { data, isLoading } = useQuery<BookResponse>({
    queryKey: ['getAllBooks', page, perPage],
    queryFn: () => getAllBooks({ page, perPage }),
  });

  return (
    <>
      {AddBookModalNode}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Books</h2>
          <div className="flex space-x-2">
            <Input
              classNames={{
                base: 'max-w-full sm:max-w-[10rem] h-10',
                mainWrapper: 'h-full',
                input: 'text-small',
                inputWrapper: 'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
              }}
              placeholder="Search books..."
              size="sm"
              startContent={<Search size={18} />}
              type="search"
            />
            <Button color="secondary" endContent={<PlusCircle size={20} />} onPress={openAddBookModal}>
              Add New Book
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          {isLoading && (
            <div className="py-20 absolute inset-0">
              <Loading />
            </div>
          )}
          <BooksManagementTable page={page} setPage={setPage} />
          <div className="flex w-full justify-center mt-8">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        </CardBody>
      </Card>
    </>
  );
};
