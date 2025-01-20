import {
  TCreateAuthorInput,
  TDeleteAuthorInput,
  TFindAllAuthorInput,
  TFindAuthorByIdInput,
  TUpdateAuthorInput,
} from '@book-toshokan/libs/domain';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';

export const createAuthor = async (input: TCreateAuthorInput) => {
  const response = await fetch(`${BACKEND_URL}/api/v1/authors/createAuthor`, {
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

export const findAllAuthor = async (input: TFindAllAuthorInput) => {
  const response = await fetch(
    `${BACKEND_URL}/api/v1/authors/findAllAuthor?name=${input.name}&page=${input.pageInfo?.page}&perPage=${input.pageInfo?.perPage}`,
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

export const findAuthorById = async (input: TFindAuthorByIdInput) => {
  const response = await fetch(`${BACKEND_URL}/api/v1/authors/findAuthorById/${input.id}`, {
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

export const updateAuthor = async (input: TUpdateAuthorInput) => {
  const response = await fetch(`${BACKEND_URL}/api/v1/authors/updateAuthor/${input.id}`, {
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

export const deleteAuthor = async (input: TDeleteAuthorInput) => {
  const response = await fetch(`${BACKEND_URL}/api/v1/authors/deleteAuthor/${input.id}`, {
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
