import { Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import { Search } from 'lucide-react';
import { TableComponent } from '../../table';

const authorsData = [
  { name: 'F. Scott Fitzgerald', bookscount: '4', genres: 'Classic, Fiction' },
  { name: 'Harper Lee', bookscount: '2', genres: 'Fiction, Coming-of-age' },
  {
    name: 'George Orwell',
    bookscount: '6',
    genres: 'Dystopian, Political fiction',
  },
];

export const AuthorManagementTab = () => {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Authors</h2>
        <Input
          classNames={{
            base: 'max-w-full sm:max-w-[10rem] h-10',
            mainWrapper: 'h-full',
            input: 'text-small',
            inputWrapper:
              'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
          }}
          placeholder="Search authors..."
          size="sm"
          startContent={<Search size={18} />}
          type="search"
        />
      </CardHeader>
      <CardBody>
        <TableComponent
          aria="Authors list"
          columns={['NAME', 'BOOKS COUNT', 'GENRES']}
          data={authorsData}
        />
      </CardBody>
    </Card>
  );
};
