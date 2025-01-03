import { TCreateCategoryInput } from '../contracts/category.schema';

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
