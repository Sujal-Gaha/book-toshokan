import { useDisclosure } from '@nextui-org/react';
import { ModalComponent } from '../../ui/modal';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import {
  TApiError,
  TApiResponse,
  TCreateAuthorInput,
  TCreateAuthorOutput,
  TDeleteAuthorInput,
  TDeleteAuthorOutput,
  TFindAuthorByIdOutput,
  TUpdateAuthorInput,
  TUpdateAuthorOutput,
} from '@book-toshokan/libs/domain';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAuthor, deleteAuthor, findAuthorById, updateAuthor } from '../../../data/author.data';
import { toastError, toastSuccess } from '../../toast';
import { useEffect, useState } from 'react';
import { Loading } from '../../loading';
import { z } from 'zod';

interface IAddAuthorModal {
  register: UseFormRegister<TCreateAuthorInput>;
  errors: FieldErrors<TCreateAuthorInput>;
  isAddingAuthor: boolean;
  onClose: () => void;
  handleSubmit: UseFormHandleSubmit<TCreateAuthorInput>;
  submitAddAuthorForm: SubmitHandler<TCreateAuthorInput>;
}

const AddAuthorModal = ({
  register,
  errors,
  isAddingAuthor,
  onClose,
  handleSubmit,
  submitAddAuthorForm,
}: IAddAuthorModal) => {
  return (
    <form onSubmit={handleSubmit(submitAddAuthorForm)}>
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
          <Button color="secondary" type="submit" disabled={isAddingAuthor}>
            {isAddingAuthor ? 'Adding...' : 'Add'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export const useAddAuthorModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const qc = useQueryClient();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateAuthorInput>();

  const createAuthorMtn = useMutation<TApiResponse<TCreateAuthorOutput>, TApiError, TCreateAuthorInput>({
    mutationFn: createAuthor,
  });

  const closeAddAuthorModal = () => {
    setValue('name', '');
    setValue('description', '');
    onClose();
  };

  const submitAddAuthorForm: SubmitHandler<TCreateAuthorInput> = async (data) => {
    await createAuthorMtn.mutateAsync(
      {
        name: data.name,
        description: data.description,
      },
      {
        onSuccess: (data) => {
          toastSuccess(data.body.message);
          qc.invalidateQueries({ queryKey: ['findAllAuthor'] });
          closeAddAuthorModal();
        },
        onError: (error) => {
          toastError(error.body.message);
          console.error('Error while adding author ', error);
        },
      }
    );
  };

  return {
    openAddAuthorModal: onOpen,
    closeAddAuthorModal: closeAddAuthorModal,
    AddAuthorModalNode: (
      <ModalComponent isOpen={isOpen} onClose={closeAddAuthorModal} onOpen={onOpen} title="Add Author">
        <AddAuthorModal
          register={register}
          errors={errors}
          isAddingAuthor={createAuthorMtn.isPending}
          onClose={closeAddAuthorModal}
          handleSubmit={handleSubmit}
          submitAddAuthorForm={submitAddAuthorForm}
        />
      </ModalComponent>
    ),
  };
};

export const DeleteAuthorSchema = z.object({
  delete_command: z.string(),
});
export type TDeleteAuthorSchema = z.infer<typeof DeleteAuthorSchema>;

interface IDeleteAuthorModal {
  onClose: () => void;
  authorName: string;
  isDeletingAuthor: boolean;
  register: UseFormRegister<TDeleteAuthorSchema>;
  handleSubmit: UseFormHandleSubmit<TDeleteAuthorSchema>;
  submitDeleteAuthorForm: SubmitHandler<TDeleteAuthorSchema>;
}

const DeleteAuthorModal = ({
  onClose,
  authorName,
  register,
  handleSubmit,
  isDeletingAuthor,
  submitDeleteAuthorForm,
}: IDeleteAuthorModal) => {
  return (
    <form onSubmit={handleSubmit(submitDeleteAuthorForm)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p>
            Enter <span className="font-semibold text-gray-100">sudo remove-author {authorName}</span>
          </p>
          <Input label="" {...register('delete_command')} errorMessage="Command doesnot match" />
        </div>
        <div className="flex items-center justify-end gap-4">
          <Button color="default" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button color="danger" type="submit" disabled={isDeletingAuthor}>
            {isDeletingAuthor ? 'Deleting...' : 'Confirm'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export const useDeleteAuthorModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [authorIdForDeletion, setAuthorIdForDeletion] = useState('');

  const { register, handleSubmit, watch, setValue } = useForm<TDeleteAuthorSchema>();

  const { data: findAuthorByIdData, isLoading } = useQuery<TApiResponse<TFindAuthorByIdOutput>>({
    queryKey: ['findAuthorById', authorIdForDeletion],
    queryFn: () => findAuthorById({ id: authorIdForDeletion }),
    enabled: !!authorIdForDeletion,
  });

  const deleteAuthorMtn = useMutation<TApiResponse<TDeleteAuthorOutput>, TApiError, TDeleteAuthorInput>({
    mutationFn: () => deleteAuthor({ id: authorIdForDeletion }),
  });

  const qc = useQueryClient();

  const authorById = findAuthorByIdData?.status === 200 ? findAuthorByIdData.body.data : [];

  const { delete_command } = watch();

  const authorName = Array.isArray(authorById) ? '' : authorById ? authorById.name : '';

  const commandMatches = delete_command === `sudo remove-author ${authorName}`;

  const submitDeleteAuthorForm: SubmitHandler<TDeleteAuthorSchema> = async () => {
    if (!commandMatches) return toastError('The command should match');
    await deleteAuthorMtn.mutateAsync(
      {
        id: authorIdForDeletion,
      },
      {
        onSuccess: (data) => {
          toastSuccess(data.body.message);
          qc.invalidateQueries({ queryKey: ['findAllAuthor'] });
          onClose();
          setAuthorIdForDeletion('');
          setValue('delete_command', '');
        },
        onError: (error) => {
          toastError(error.body.message);
          console.error('Error while deleting author ', error);
        },
      }
    );
  };

  return {
    isDeleteAuthorModalOpen: isOpen,
    setAuthorIdForDeletion: setAuthorIdForDeletion,
    openDeleteAuthorModal: onOpen,
    closeDeleteAuthorModal: onClose,
    DeleteAuthorModalNode: (
      <ModalComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose} title="Delete Author">
        {isLoading ? (
          <Loading />
        ) : Array.isArray(authorById) ? (
          <p>No author found</p>
        ) : (
          <DeleteAuthorModal
            authorName={authorName}
            register={register}
            handleSubmit={handleSubmit}
            isDeletingAuthor={deleteAuthorMtn.isPending}
            submitDeleteAuthorForm={submitDeleteAuthorForm}
            onClose={onClose}
          />
        )}
      </ModalComponent>
    ),
  };
};

interface IUpdateAuthorModal {
  handleSubmit: UseFormHandleSubmit<TUpdateAuthorInput>;
  submitUpdateAuthorForm: SubmitHandler<TUpdateAuthorInput>;
  register: UseFormRegister<TUpdateAuthorInput>;
  errors: FieldErrors<TUpdateAuthorInput>;
  watch: UseFormWatch<TUpdateAuthorInput>;
  isUpdatingAuthor: boolean;
  onClose: () => void;
}

const UpdateAuthorModal = ({
  register,
  errors,
  watch,
  handleSubmit,
  submitUpdateAuthorForm,
  isUpdatingAuthor,
  onClose,
}: IUpdateAuthorModal) => {
  return (
    <form onSubmit={handleSubmit(submitUpdateAuthorForm)}>
      <div className="flex flex-col gap-4">
        <div className="space-y-4">
          <Input
            type="text"
            label="Title"
            {...register('name')}
            required
            value={watch('name')}
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
          />
          <Input
            type="text"
            label="Description"
            {...register('description')}
            required
            value={watch('description')}
            isInvalid={!!errors.description}
            errorMessage={errors.description?.message}
          />
        </div>
        <div className="flex justify-end gap-4">
          <Button onPress={onClose} color="danger" type="button">
            Cancel
          </Button>
          <Button color="secondary" type="submit" disabled={isUpdatingAuthor}>
            {isUpdatingAuthor ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export const useUpdateAuthorModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [authorIdForModification, setAuthorIdForModification] = useState('');

  const qc = useQueryClient();

  const { data: findAuthorByIdData, isLoading } = useQuery<TApiResponse<TFindAuthorByIdOutput>>({
    queryKey: ['findAuthorById', authorIdForModification],
    queryFn: () => findAuthorById({ id: authorIdForModification }),
    enabled: !!authorIdForModification,
  });

  const updateAuthorMtn = useMutation<TApiResponse<TUpdateAuthorOutput>, TApiError, TUpdateAuthorInput>({
    mutationFn: updateAuthor,
  });

  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TUpdateAuthorInput>();

  useEffect(() => {
    if (findAuthorByIdData?.body.data) {
      setValue('name', findAuthorByIdData.body.data.name);
      setValue('description', findAuthorByIdData.body.data.description);
    }
  }, [findAuthorByIdData?.body.data, setValue]);

  const submitUpdateAuthorForm: SubmitHandler<TUpdateAuthorInput> = async (data) => {
    await updateAuthorMtn.mutateAsync(
      {
        id: authorIdForModification,
        name: data.name,
        description: data.description,
      },
      {
        onSuccess: (data) => {
          toastSuccess(data.body.message);
          qc.invalidateQueries({ queryKey: ['findAllAuthor'] });
          onClose();
          setAuthorIdForModification('');
        },
        onError: (error) => {
          toastError(error.body.message);
          console.error('Error while updating author ', error);
        },
      }
    );
  };

  return {
    isUpdateAuthorModalOpen: isOpen,
    openUpdateAuthorModal: onOpen,
    closeUpdateAuthorModal: onClose,
    setAuthorIdForModification: setAuthorIdForModification,
    UpdateAuthorModalNode: (
      <ModalComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose} title="Update Author">
        {isLoading ? (
          <Loading />
        ) : (
          <UpdateAuthorModal
            handleSubmit={handleSubmit}
            submitUpdateAuthorForm={submitUpdateAuthorForm}
            watch={watch}
            register={register}
            errors={errors}
            onClose={onClose}
            isUpdatingAuthor={updateAuthorMtn.isPending}
          />
        )}
      </ModalComponent>
    ),
  };
};
