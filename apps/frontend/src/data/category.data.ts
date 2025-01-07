import { TCreateCategoryInput, TFindAllCategoryInput } from '@book-toshokan/libs/domain';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';

export const createCategory = async (input: TCreateCategoryInput) => {
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

export const findAllCategory = async (input: TFindAllCategoryInput) => {
  const response = await fetch(`${BACKEND_URL}/api/v1/categories/findAllCategory?name=${input.name}`, {
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
