import { Pagination as NextUIPagination, PaginationProps } from '@nextui-org/react';

export interface IPaginationProps extends Omit<PaginationProps, 'isCompact' | 'showControls' | 'showShadow'> {
  color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

export const Pagination = ({ color, ...props }: IPaginationProps) => {
  return (
    <div className="flex w-full justify-center">
      <NextUIPagination isCompact showControls showShadow color={color} {...props} />
    </div>
  );
};
