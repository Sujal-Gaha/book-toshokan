import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  TableProps,
} from '@nextui-org/react';

interface TableComponentProps extends TableProps {
  aria: string;
  columns: string[];
  data: Record<string, string>[];
}

export const TableComponent = ({
  aria,
  columns,
  data,
  ...props
}: TableComponentProps) => {
  return (
    <Table aria-label={aria} {...props}>
      <TableHeader>
        {columns.map((column, index) => (
          <TableColumn key={index}>{column}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column, colIndex) => (
              <TableCell key={colIndex}>{row[column.toLowerCase()]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
