import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { PlusCircle, Search, Edit, Trash } from 'lucide-react';
import { useAddCategoryModal } from './add-category-modal';
import { TableComponent } from '../../ui/table';
import { createColumnHelper } from '@tanstack/react-table';
import { Category, TApiResponse, TFindAllCategoryOutput } from '@book-toshokan/libs/domain';
import { useQuery } from '@tanstack/react-query';
import { findAllCategory } from '../../../data/category.data';
import { useState } from 'react';

const columnHelperForCategory = createColumnHelper<Category>();

const GetCategoryColumns = () => {
  const columns = [
    columnHelperForCategory.accessor('name', {
      header: 'Name',
      cell: (info) => info.getValue(),
    }),
    columnHelperForCategory.accessor('description', {
      header: 'Description',
      cell: (info) => info.getValue(),
    }),
    columnHelperForCategory.accessor('id', {
      header: 'Action',
      cell: (info) => {
        return (
          <div className="flex items-center gap-x-4">
            <Edit size={20} />
            <Trash color="magenta" size={20} />
          </div>
        );
      },
    }),
  ];
  return columns;
};

export const CategoriesManagementTab = () => {
  const [findAllCategoryQuery, setFindAllCategoryQuery] = useState({
    name: '',
    page: 1,
    perPage: 10,
  });

  const { data: findAllCategoryData, isLoading } = useQuery<TApiResponse<TFindAllCategoryOutput>>({
    queryKey: ['findAllCategory', findAllCategoryQuery],
    queryFn: () => findAllCategory({ name: findAllCategoryQuery.name }),
  });

  const { AddCategoryModalNode, openAddCategoryModal } = useAddCategoryModal();

  const columns = GetCategoryColumns();

  const data = findAllCategoryData?.status === 200 ? findAllCategoryData.body.data : [];

  return (
    <>
      {AddCategoryModalNode}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Categories</h2>
          <div className="flex space-x-2">
            <Input
              classNames={{
                base: 'max-w-full sm:max-w-[12rem] h-10',
                mainWrapper: 'h-full',
                input: 'text-small',
                inputWrapper: 'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
              }}
              label=""
              placeholder="Search categories..."
              size="sm"
              startContent={<Search size={18} />}
              type="search"
              value={findAllCategoryQuery.name}
              onChange={(e) =>
                setFindAllCategoryQuery((prevValue) => ({
                  ...prevValue,
                  name: e.target.value,
                }))
              }
            />
            <Button color="secondary" endContent={<PlusCircle size={20} />} onPress={openAddCategoryModal}>
              Add New Category
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <TableComponent
            aria-label="Table for category management"
            columns={columns}
            data={data}
            isLoading={isLoading}
            paginationProps={{
              color: 'secondary',
              total: 10,
              onChange: (e) => {
                setFindAllCategoryQuery((prevValue) => ({
                  ...prevValue,
                  page: e,
                }));
              },
            }}
          />
        </CardBody>
      </Card>
    </>
  );
};
