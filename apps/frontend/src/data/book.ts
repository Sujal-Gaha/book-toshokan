const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';

export const getRecommendedBooks = async () => {
  const response = await fetch(`${BACKEND_URL}/api/books/getRecommendedBooks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const getBookById = async (bookId: string) => {
  const response = await fetch(
    `${BACKEND_URL}/api/books/getBookById/${bookId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const getAllBooks = async ({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}) => {
  const response = await fetch(
    `${BACKEND_URL}/api/books/getAllBooks?page=${page}&perPage=${perPage}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
