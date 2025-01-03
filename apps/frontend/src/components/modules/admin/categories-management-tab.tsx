import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { PlusCircle, Search } from 'lucide-react';
import { useAddCategoryModal } from './add-category-modal';

export const CategoriesManagementTab = () => {
  const { AddCategoryModalNode, openAddCategoryModal } = useAddCategoryModal();

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
              isClearable
              type="search"
            />
            <Button color="secondary" endContent={<PlusCircle size={20} />} onPress={openAddCategoryModal}>
              Add New Category
            </Button>
          </div>
        </CardHeader>
        <CardBody>Category Table</CardBody>
      </Card>
    </>
  );
};
