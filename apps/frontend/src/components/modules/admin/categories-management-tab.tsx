import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

export const CategoriesManagementTab = () => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Add New Book</h2>
      </CardHeader>
      <CardBody>
        <form className="space-y-4">
          <Input label="Title" placeholder="Enter book title" />
          <Input label="Author" placeholder="Enter author name" />
          <Input label="Genre" placeholder="Enter book genre" />
          <Input label="Published Year" placeholder="Enter published year" />
          <div className="flex justify-end space-x-2">
            <Button color="danger" variant="light">
              Cancel
            </Button>
            <Button color="primary">Add Book</Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
