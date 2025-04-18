import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import {
  CreateCategoryInputSchema,
  TApiError,
  TApiResponse,
  CreateCategoryInput,
  CreateCategoryOutput,
  DeleteCategoryInput,
  DeleteCategoryOutput,
  FindCategoryByIdOutput,
  UpdateCategoryInput,
  UpdateCategoryOutput,
  UpdateCategoryInputSchema,
} from '@book-toshokan/libs/domain';
import { createCategory, updateCategory } from '../../data/category.data';
import { toastError, toastSuccess } from '../../components/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteCategory, findCategoryById } from '../../data/category.data';
import { z } from 'zod';
import { useDisclosure } from '@heroui/react';
import { Button, Input, Loading, ModalComponent } from '@book-toshokan/libs/shared-ui';

interface IAddCategoryModal {
  register: UseFormRegister<CreateCategoryInput>;
  addCategory: SubmitHandler<CreateCategoryInput>;
  errors: FieldErrors<CreateCategoryInput>;
  handleSubmit: UseFormHandleSubmit<CreateCategoryInput>;
  isAddingCategory: boolean;
  onClose: () => void;
}

const AddCategoryModal = ({
  onClose,
  errors,
  register,
  handleSubmit,
  addCategory,
  isAddingCategory,
}: IAddCategoryModal) => {
  return (
    <form onSubmit={handleSubmit(addCategory)}>
      <div className="flex flex-col gap-4">
        <div className="space-y-4">
          <Input
            type="text"
            label="Title"
            {...register('name')}
            required
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
          />
          <Input
            type="text"
            label="Description"
            {...register('description')}
            required
            isInvalid={!!errors.description}
            errorMessage={errors.description?.message}
          />
        </div>
        <div className="flex justify-end gap-4">
          <Button onPress={onClose} color="danger" type="button">
            Cancel
          </Button>
          <Button color="secondary" type="submit" disabled={isAddingCategory}>
            {isAddingCategory ? 'Adding...' : 'Add'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export const useAddCategoryModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const createCategoryMtn = useMutation<TApiResponse<CreateCategoryOutput>, TApiError, CreateCategoryInput>({
    mutationFn: createCategory,
  });
  const qc = useQueryClient();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategoryInput>({
    resolver: zodResolver(CreateCategoryInputSchema),
  });

  const closeAddCategoryModal = () => {
    setValue('name', '');
    setValue('description', '');
    onClose();
  };

  const addCategory: SubmitHandler<CreateCategoryInput> = async (input) => {
    await createCategoryMtn.mutateAsync(
      {
        name: input.name,
        description: input.description,
      },
      {
        onSuccess: (data) => {
          toastSuccess(data.body.message);
          qc.invalidateQueries({ queryKey: ['findAllCategory'] });
          closeAddCategoryModal();
        },
        onError: (error) => {
          console.log('Error:', error.body.message);
          toastError(error.body.message);
        },
      }
    );
  };

  return {
    openAddCategoryModal: onOpen,
    AddCategoryModalNode: (
      <ModalComponent isOpen={isOpen} onClose={closeAddCategoryModal} onOpen={onOpen} title="Add Category">
        <AddCategoryModal
          addCategory={addCategory}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          onClose={closeAddCategoryModal}
          isAddingCategory={createCategoryMtn.isPending}
        />
      </ModalComponent>
    ),
  };
};

export const DeleteCategorySchema = z.object({
  delete_command: z.string(),
});
export type TDeleteCategorySchema = z.infer<typeof DeleteCategorySchema>;

interface IDeleteCategoryModal {
  onClose: () => void;
  categoryName: string;
  isDeletingCategory: boolean;
  register: UseFormRegister<TDeleteCategorySchema>;
  handleSubmit: UseFormHandleSubmit<TDeleteCategorySchema>;
  submitDeleteCategoryForm: SubmitHandler<TDeleteCategorySchema>;
}

const DeleteCategoryModal = ({
  onClose,
  categoryName,
  register,
  handleSubmit,
  isDeletingCategory,
  submitDeleteCategoryForm,
}: IDeleteCategoryModal) => {
  return (
    <form onSubmit={handleSubmit(submitDeleteCategoryForm)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p>
            Enter <span className="font-semibold text-gray-100">sudo remove-category {categoryName}</span>
          </p>
          <Input label="" {...register('delete_command')} errorMessage="Command doesnot match" />
        </div>
        <div className="flex items-center justify-end gap-4">
          <Button color="danger" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button color="secondary" type="submit" disabled={isDeletingCategory}>
            {isDeletingCategory ? 'Deleting...' : 'Confirm'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export const useDeleteCategoryModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categoryIdForDeletion, setCategoryIdForDeletion] = useState('');

  const { register, handleSubmit, watch, setValue } = useForm<TDeleteCategorySchema>();

  const { data: findCategoryByIdData, isLoading } = useQuery<TApiResponse<FindCategoryByIdOutput>>({
    queryKey: ['findCategoryById', categoryIdForDeletion],
    queryFn: () => findCategoryById({ id: categoryIdForDeletion }),
    enabled: !!categoryIdForDeletion,
  });

  const deleteCategoryMtn = useMutation<TApiResponse<DeleteCategoryOutput>, TApiError, DeleteCategoryInput>({
    mutationFn: () => deleteCategory({ id: categoryIdForDeletion }),
  });

  const qc = useQueryClient();

  const categoryById = findCategoryByIdData?.status === 200 ? findCategoryByIdData.body.data : [];

  const { delete_command } = watch();

  const categoryName = Array.isArray(categoryById) ? '' : categoryById ? categoryById.name : '';

  const commandMatches = delete_command === `sudo remove-category ${categoryName}`;

  const submitDeleteCategoryForm: SubmitHandler<TDeleteCategorySchema> = async () => {
    if (!commandMatches) return toastError('The command should match');
    await deleteCategoryMtn.mutateAsync(
      {
        id: categoryIdForDeletion,
      },
      {
        onSuccess: (data) => {
          toastSuccess(data.body.message);
          qc.invalidateQueries({ queryKey: ['findAllCategory'] });
          onClose();
          setCategoryIdForDeletion('');
          setValue('delete_command', '');
        },
        onError: (error) => {
          toastError(error.body.message);
          console.log('Error while deleting category ', error);
        },
      }
    );
  };

  return {
    isDeleteCategoryModalOpen: isOpen,
    setCategoryIdForDeletion: setCategoryIdForDeletion,
    openDeleteCategoryModal: onOpen,
    closeDeleteCategoryModal: onClose,
    DeleteCategoryModalNode: (
      <ModalComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose} title="Delete Category">
        {isLoading ? (
          <Loading />
        ) : Array.isArray(categoryById) ? (
          <p>No category found</p>
        ) : (
          <DeleteCategoryModal
            categoryName={categoryName}
            register={register}
            handleSubmit={handleSubmit}
            isDeletingCategory={deleteCategoryMtn.isPending}
            submitDeleteCategoryForm={submitDeleteCategoryForm}
            onClose={onClose}
          />
        )}
      </ModalComponent>
    ),
  };
};

interface IUpdateCategoryModal {
  onClose: () => void;
  isUpdatingCatgory: boolean;
  errors: FieldErrors<UpdateCategoryInput>;
  watch: UseFormWatch<UpdateCategoryInput>;
  register: UseFormRegister<UpdateCategoryInput>;
  handleSubmit: UseFormHandleSubmit<UpdateCategoryInput>;
  submitUpdateCategoryForm: SubmitHandler<UpdateCategoryInput>;
}

const UpdateCategoryModal = ({
  onClose,
  watch,
  errors,
  register,
  handleSubmit,
  isUpdatingCatgory,
  submitUpdateCategoryForm,
}: IUpdateCategoryModal) => {
  return (
    <form onSubmit={handleSubmit(submitUpdateCategoryForm)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            label="Name"
            {...register('name')}
            value={watch('name')}
            isInvalid={!!errors.name?.message}
            errorMessage={errors.name?.message}
          />
          <Input
            type="text"
            label="Description"
            {...register('description')}
            value={watch('description')}
            isInvalid={!!errors.description?.message}
            errorMessage={errors.description?.message}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <Button color="danger" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button color="secondary" type="submit" disabled={isUpdatingCatgory}>
            {isUpdatingCatgory ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export const useUpdateCategoryModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categoryIdForModification, setCategoryIdForModification] = useState('');

  const qc = useQueryClient();

  const { data: findCategoryByIdData, isLoading } = useQuery<TApiResponse<FindCategoryByIdOutput>>({
    queryKey: ['findCategoryById', categoryIdForModification],
    queryFn: () => findCategoryById({ id: categoryIdForModification }),
    enabled: !!categoryIdForModification,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateCategoryInput>({
    resolver: zodResolver(UpdateCategoryInputSchema),
  });

  useEffect(() => {
    if (findCategoryByIdData?.body?.data) {
      setValue('name', findCategoryByIdData.body.data.name);
      setValue('description', findCategoryByIdData.body.data.description);
    }
  }, [setValue, findCategoryByIdData?.body?.data]);

  const updateCategoryMtn = useMutation<TApiResponse<UpdateCategoryOutput>, TApiError, UpdateCategoryInput>({
    mutationFn: updateCategory,
  });

  const submitUpdateCategoryForm: SubmitHandler<UpdateCategoryInput> = async (input) => {
    await updateCategoryMtn.mutateAsync(
      {
        id: categoryIdForModification,
        name: input.name,
        description: input.description,
      },
      {
        onSuccess: (data) => {
          toastSuccess(data.body.message);
          qc.invalidateQueries({ queryKey: ['findAllCategory'] });
          onClose();
          setCategoryIdForModification('');
        },
        onError: (error) => {
          toastError(error.body.message);
          console.log('Error while updating category ', error);
        },
      }
    );
  };

  return {
    isUpdateCategoryModalOpen: isOpen,
    openUpdateCategoryModal: onOpen,
    closeUpdateCategoryModal: onClose,
    setCategoryIdForModification: setCategoryIdForModification,
    UpdateCategoryModalNode: (
      <ModalComponent isOpen={isOpen} onClose={onClose} onOpen={onOpen} title="Update Category">
        {isLoading ? (
          <Loading />
        ) : (
          <UpdateCategoryModal
            onClose={onClose}
            watch={watch}
            errors={errors}
            register={register}
            handleSubmit={handleSubmit}
            isUpdatingCatgory={updateCategoryMtn.isPending}
            submitUpdateCategoryForm={submitUpdateCategoryForm}
          />
        )}
      </ModalComponent>
    ),
  };
};
