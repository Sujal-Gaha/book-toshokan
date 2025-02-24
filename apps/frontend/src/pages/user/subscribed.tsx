import React, { useState, useMemo, useCallback } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  ChipProps,
  Pagination,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { Book, ChevronDown } from 'lucide-react';

type Book = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  status: 'to-read' | 'reading' | 'read';
  progress: number;
  rating: number | null;
};

const statusColorMap: Record<string, ChipProps['color']> = {
  'to-read': 'warning',
  reading: 'primary',
  read: 'success',
};

const dummyBooks: Book[] = Array.from({ length: 50 }, (_, i) => ({
  id: `book-${i + 1}`,
  title: `Book Title ${i + 1}`,
  author: `Author ${i + 1}`,
  coverImage: `/placeholder.svg?height=40&width=40&text=${i + 1}`,
  status: ['to-read', 'reading', 'read'][Math.floor(Math.random() * 3)] as Book['status'],
  progress: Math.floor(Math.random() * 101),
  rating: Math.random() > 0.3 ? Math.floor(Math.random() * 5) + 1 : null,
}));

const columns = [
  { name: 'TITLE', uid: 'title' },
  { name: 'AUTHOR', uid: 'author' },
  { name: 'STATUS', uid: 'status' },
  { name: 'PROGRESS', uid: 'progress' },
  { name: 'RATING', uid: 'rating' },
];

export const SubscribedBooksTable = () => {
  const [filterValue, setFilterValue] = useState<string>('all');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const filteredBooks = useMemo(() => {
    let filteredData = [...dummyBooks];
    if (filterValue !== 'all') {
      filteredData = filteredData.filter((book) => book.status === filterValue);
    }
    return filteredData;
  }, [filterValue]);

  const pages = Math.ceil(filteredBooks.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredBooks.slice(start, end);
  }, [page, filteredBooks]);

  const renderCell = useCallback((book: Book, columnKey: React.Key) => {
    const cellValue = book[columnKey as keyof Book];

    switch (columnKey) {
      case 'title':
        return (
          <User avatarProps={{ radius: 'lg', src: book.coverImage }} description={book.author} name={book.title}>
            {book.title}
          </User>
        );
      case 'author':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{book.author}</p>
          </div>
        );
      case 'status':
        return (
          <Chip className="capitalize" color={statusColorMap[book.status]} size="sm" variant="flat">
            {book.status}
          </Chip>
        );
      case 'progress':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{`${book.progress}%`}</p>
          </div>
        );
      case 'rating':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{book.rating ? `${book.rating}/5` : 'Not rated'}</p>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Subscribed Books</h1>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="flat" endContent={<ChevronDown className="text-small" />}>
              Status: {filterValue === 'all' ? 'All' : filterValue}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Filter by status"
            selectedKeys={filterValue}
            selectionMode="single"
            onSelectionChange={(keys) => setFilterValue(Array.from(keys)[0] as string)}
          >
            <DropdownItem key="all">All</DropdownItem>
            <DropdownItem key="to-read">To Read</DropdownItem>
            <DropdownItem key="reading">Reading</DropdownItem>
            <DropdownItem key="read">Read</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <Table
        aria-label="Subscribed books table"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
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
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
