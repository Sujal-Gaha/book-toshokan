import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  AccessorKeyColumnDefBase,
  IdIdentifier,
} from '@tanstack/react-table';
import { IPaginationProps, Pagination } from './pagination';
import { Loading } from '../loading';
import React from 'react';

interface TableComponentProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[] | (AccessorKeyColumnDefBase<T, string> & Partial<IdIdentifier<T, string>>)[];
  isLoading?: boolean;
  'aria-label': string;
  paginationProps?: IPaginationProps;
}

export function TableComponent<T extends object>({
  data,
  columns,
  isLoading,
  paginationProps,
  ...props
}: TableComponentProps<T>) {
  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      <Table
        aria-label={props['aria-label']}
        bottomContent={
          paginationProps ? (
            <div className="flex w-full justify-center">
              <Pagination
                color={paginationProps.color}
                page={paginationProps.page}
                total={paginationProps.total}
                onChange={paginationProps.onChange}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <React.Fragment key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableColumn key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableColumn>
              ))}
            </React.Fragment>
          ))}
        </TableHeader>
        <TableBody emptyContent={isLoading ? <Loading /> : 'No data to display'}>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
