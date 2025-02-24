import { useDisclosure } from '@nextui-org/react';
import { ModalComponent } from '../../components/ui/modal';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

interface IAddBookModal {
  onClose: () => void;
}

const AddBookModal = ({ onClose }: IAddBookModal) => {
  return (
    <div className="flex flex-col gap-4">
      <form className="space-y-4">
        <Input label="Title" color="default" required />
        <Input label="Author" required />
        <Input label="Category" required />
        <Input label="Published Year" required />
      </form>
      <div className="flex justify-end gap-4">
        <Button onPress={onClose} color="danger">
          Cancel
        </Button>
        <Button onPress={onClose} color="secondary">
          Add
        </Button>
      </div>
    </div>
  );
};

export const useAddBookModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return {
    openAddBookModal: onOpen,
    AddBookModalNode: (
      <ModalComponent title="Add New Book" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <AddBookModal onClose={onClose} />
      </ModalComponent>
    ),
  };
};
