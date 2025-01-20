import { Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import { Edit, PlusCircle, Search, Trash } from 'lucide-react';
import { Button } from '../../ui/button';
import { useAddAuthorModal, useDeleteAuthorModal, useUpdateAuthorModal } from './author-modals';
import { TableComponent } from '../../ui/table';
import { createColumnHelper } from '@tanstack/react-table';
import { Author, TApiResponse, TFindAllAuthorOutput } from '@book-toshokan/libs/domain';
import { useQuery } from '@tanstack/react-query';
import { findAllAuthor } from '../../../data/author.data';
import { Dispatch, SetStateAction, useState } from 'react';

const columnHelperForCategory = createColumnHelper<Author>();

interface IGetAuthorColumns {
  openDeleteAuthorModal: () => void;
  setAuthorIdForDeletion: Dispatch<SetStateAction<string>>;
  openUpdateAuthorModal: () => void;
  setAuthorIdForModification: Dispatch<SetStateAction<string>>;
}
const GetAuthorColumns = ({
  openDeleteAuthorModal,
  setAuthorIdForDeletion,
  openUpdateAuthorModal,
  setAuthorIdForModification,
}: IGetAuthorColumns) => {
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
        const authorId = info.getValue();
        return (
          <div className="flex items-center gap-x-4">
            <Edit
              size={20}
              className="cursor-pointer hover:text-gray-400"
              onClick={() => {
                setAuthorIdForModification(authorId);
                openUpdateAuthorModal();
              }}
            />
            <Trash
              size={20}
              className="text-secondary cursor-pointer hover:text-purple-400"
              onClick={() => {
                setAuthorIdForDeletion(authorId);
                openDeleteAuthorModal();
              }}
            />
          </div>
        );
      },
    }),
  ];
  return columns;
};

export const AuthorManagementTab = () => {
  const [nameFilter, setNameFilter] = useState('');

  const [pageInfo, setPageInfo] = useState({
    page: 1,
    perPage: 10,
  });
  const { openAddAuthorModal, AddAuthorModalNode } = useAddAuthorModal();

  const { openDeleteAuthorModal, DeleteAuthorModalNode, setAuthorIdForDeletion } = useDeleteAuthorModal();

  const { openUpdateAuthorModal, UpdateAuthorModalNode, setAuthorIdForModification } = useUpdateAuthorModal();

  const columns = GetAuthorColumns({
    openDeleteAuthorModal: openDeleteAuthorModal,
    setAuthorIdForDeletion: setAuthorIdForDeletion,
    openUpdateAuthorModal: openUpdateAuthorModal,
    setAuthorIdForModification: setAuthorIdForModification,
  });

  const { data: findAllAuthorData, isLoading } = useQuery<TApiResponse<TFindAllAuthorOutput>>({
    queryKey: ['findAllAuthor', nameFilter, pageInfo.page, pageInfo.perPage],
    queryFn: () => findAllAuthor({ name: nameFilter, pageInfo: pageInfo }),
  });

  const authors = findAllAuthorData?.status === 200 ? findAllAuthorData.body.data.authors : [];
  const paginationInfo = findAllAuthorData?.body.data.pageInfo;

  return (
    <>
      {AddAuthorModalNode}
      {DeleteAuthorModalNode}
      {UpdateAuthorModalNode}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Authors</h2>
          <div className="flex space-x-2">
            <Input
              classNames={{
                base: 'max-w-full sm:max-w-[12rem] h-10',
                mainWrapper: 'h-full',
                input: 'text-small',
                inputWrapper: 'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
              }}
              label=""
              placeholder="Search authors..."
              size="sm"
              startContent={<Search size={18} />}
              type="search"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
            <Button color="secondary" endContent={<PlusCircle size={20} />} onClick={openAddAuthorModal}>
              Add New Author
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <TableComponent
            aria-label="Table for author management"
            columns={columns}
            data={authors}
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
