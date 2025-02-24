import { Card, CardBody, CardHeader } from "@heroui/react";
import { PlusCircle, Search, Edit, Trash } from 'lucide-react';
import { useAddCategoryModal, useDeleteCategoryModal, useUpdateCategoryModal } from './category-modals';
import { createColumnHelper } from '@tanstack/react-table';
import { Category, TApiResponse, TFindAllCategoryOutput } from '@book-toshokan/libs/domain';
import { useQuery } from '@tanstack/react-query';
import { findAllCategory } from '../../data/category.data';
import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Input, TableComponent } from '@book-toshokan/libs/shared-ui';

const columnHelperForCategory = createColumnHelper<Category>();

interface IGetCategoryColumns {
  openUpdateCategoryModal: () => void;
  setCategoryIdForModification: Dispatch<SetStateAction<string>>;
  openDeleteCategoryModal: () => void;
  setCategoryIdForDeletion: Dispatch<SetStateAction<string>>;
}

const GetCategoryColumns = ({
  openUpdateCategoryModal,
  setCategoryIdForModification,
  openDeleteCategoryModal,
  setCategoryIdForDeletion,
}: IGetCategoryColumns) => {
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
        const categoryId = info.getValue();

        return (
          <div className="flex items-center gap-x-4">
            <Edit
              size={20}
              className="cursor-pointer hover:text-gray-400"
              onClick={() => {
                setCategoryIdForModification(categoryId);
                openUpdateCategoryModal();
              }}
            />
            <Trash
              size={20}
              className="text-secondary cursor-pointer hover:text-purple-400"
              onClick={() => {
                setCategoryIdForDeletion(categoryId);
                openDeleteCategoryModal();
              }}
            />
          </div>
        );
      },
    }),
  ];
  return columns;
};

export const CategoriesManagementTab = () => {
  const [nameFilter, setNameFilter] = useState('');

  const [pageInfo, setPageInfo] = useState({
    page: 1,
    perPage: 10,
  });

  const { data: findAllCategoryData, isLoading } = useQuery<TApiResponse<TFindAllCategoryOutput>>({
    queryKey: ['findAllCategory', nameFilter, pageInfo.page, pageInfo.perPage],
    queryFn: () => findAllCategory({ name: nameFilter, pageInfo: pageInfo }),
  });

  const { AddCategoryModalNode, openAddCategoryModal } = useAddCategoryModal();

  const { UpdateCategoryModalNode, openUpdateCategoryModal, setCategoryIdForModification } = useUpdateCategoryModal();

  const { DeleteCategoryModalNode, openDeleteCategoryModal, setCategoryIdForDeletion } = useDeleteCategoryModal();

  const columns = GetCategoryColumns({
    openUpdateCategoryModal,
    setCategoryIdForModification,
    openDeleteCategoryModal,
    setCategoryIdForDeletion,
  });

  const categories = findAllCategoryData?.body.data.categories || [];
  const paginationInfo = findAllCategoryData?.body.data.pageInfo;

  return (
    <>
      {AddCategoryModalNode}
      {UpdateCategoryModalNode}
      {DeleteCategoryModalNode}
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
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
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
            data={categories}
            isLoading={isLoading}
            paginationProps={{
              color: 'secondary',
              total: paginationInfo?.totalPages || 1,
              onChange: (e) => {
                setPageInfo((prevValue) => ({
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
