import {
  CreateCategoryInput,
  DeleteCategoryInput,
  FindAllCategoryInput,
  FindCategoryByIdInput,
  UpdateCategoryInput,
} from '@book-toshokan/libs/domain';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';

export const createCategory = async (input: CreateCategoryInput) => {
  const response = await fetch(`${BACKEND_URL}/api/v1/categories/createCategory`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: input.name,
      description: input.description,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const findAllCategory = async (input: FindAllCategoryInput) => {
  const response = await fetch(
    `${BACKEND_URL}/api/v1/categories/findAllCategory?name=${input.name}&page=${input.pageInfo?.page}&perPage=${input.pageInfo?.perPage}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.body.message);
  }

  return data;
};

export const findCategoryById = async (input: FindCategoryByIdInput) => {
  const response = await fetch(`${BACKEND_URL}/api/v1/categories/findCategoryById/${input.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.body.message);
  }

  return data;
};

export const updateCategory = async (input: UpdateCategoryInput) => {
  const response = await fetch(`${BACKEND_URL}/api/v1/categories/updateCategory/${input.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: input.name,
      description: input.description,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.body.message);
  }

  return data;
};

export const deleteCategory = async (input: DeleteCategoryInput) => {
  const response = await fetch(`${BACKEND_URL}/api/v1/categories/deleteCategory/${input.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.body.message);
  }

  return data;
};
