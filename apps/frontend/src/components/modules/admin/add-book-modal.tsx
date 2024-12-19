import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';

interface IAddBookModal {
  isOpen: boolean;
  onClose: () => void;
}

const AddBookModal = ({ isOpen, onClose }: IAddBookModal) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="transparent" size="4xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Add New Book</ModalHeader>
        <ModalBody>
          <form className="space-y-4">
            <Input label="Title" placeholder="Enter book title" required />
            <Input label="Author" placeholder="Enter author name" required />
            <Input label="Category" placeholder="Enter book genre" required />
            <Input
              label="Published Year"
              placeholder="Enter published year"
              required
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary">Add Book</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const useAddBookModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return {
    openAddBookModal: onOpen,
    AddBookModalNode: <AddBookModal isOpen={isOpen} onClose={onClose} />,
  };
};
