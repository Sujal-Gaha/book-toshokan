import { Card, CardBody, CardHeader, Input, Button } from '@nextui-org/react';
import { PlusCircle, Search } from 'lucide-react';
import { TableComponent } from '../../components/table';
import { useAddBookModal } from './add-book-modal';

const booksData = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Classic',
    published: '1925',
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Fiction',
    published: '1960',
  },
  {
    title: '1984',
    author: 'George Orwell',
    category: 'Dystopian',
    published: '1949',
  },
];

export const BooksManagementTab = () => {
  const { AddBookModalNode, openAddBookModal } = useAddBookModal();

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
                inputWrapper:
                  'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
              }}
              placeholder="Search books..."
              size="sm"
              startContent={<Search size={18} />}
              type="search"
            />
            <Button
              color="primary"
              endContent={<PlusCircle size={20} />}
              onPress={openAddBookModal}
            >
              Add New Book
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <TableComponent
            aria="Books list"
            columns={['TITLE', 'AUTHOR', 'CATEGORY', 'PUBLISHED']}
            data={booksData}
          />
        </CardBody>
      </Card>
    </>
  );
};
