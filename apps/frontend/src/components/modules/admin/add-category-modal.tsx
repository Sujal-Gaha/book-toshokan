import { useDisclosure, Input } from '@nextui-org/react';
// import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { ModalComponent } from '../../ui/modal';
import { SubmitHandler, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { TApiError, TApiResponse, TCreateCategoryInput, TCreateCategoryOutput } from '@book-toshokan/libs/domain';
import { useMutation } from '@tanstack/react-query';
import { createCategory } from '../../../data/category.data';
import { toastError, toastSuccess } from '../../toast';

interface IAddCategoryModal {
  register: UseFormRegister<TCreateCategoryInput>;
  addCategory: SubmitHandler<TCreateCategoryInput>;
  handleSubmit: UseFormHandleSubmit<TCreateCategoryInput>;
  onClose: () => void;
}

const AddCategoryModal = ({ onClose, register, handleSubmit, addCategory }: IAddCategoryModal) => {
  return (
    <form onSubmit={handleSubmit(addCategory)}>
      <div className="flex flex-col gap-4">
        <div className="space-y-4">
          <Input label="Title" {...register('name')} color="default" required />
          <Input label="Description" {...register('description')} required />
        </div>
        <div className="flex justify-end gap-4">
          <Button onPress={onClose} color="danger" type="button">
            Cancel
          </Button>
          <Button color="secondary" type="submit">
            Add
          </Button>
        </div>
      </div>
    </form>
  );
};

export const useAddCategoryModal = () => {
  const createCategoryMtn = useMutation<TApiResponse<TCreateCategoryOutput>, TApiError, TCreateCategoryInput>({
    mutationFn: createCategory,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit } = useForm<TCreateCategoryInput>();

  const addCategory: SubmitHandler<TCreateCategoryInput> = async (input) => {
    try {
      await createCategoryMtn.mutateAsync(
        {
          name: input.name,
          description: input.description,
        },
        {
          onSuccess: (data) => {
            toastSuccess(data.body.message);
          },
          onError: (error) => {
            console.log('Error:', error.body.message);
            toastError(error.body.message);
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return {
    openAddCategoryModal: onOpen,
    AddCategoryModalNode: (
      <ModalComponent isOpen={isOpen} onClose={onClose} onOpen={onOpen} title="Add Category">
        <AddCategoryModal addCategory={addCategory} handleSubmit={handleSubmit} register={register} onClose={onClose} />
      </ModalComponent>
    ),
  };
};
