import { Request, Response } from 'express';
import { asyncHandler } from '../../utils';
import { prisma } from '../../config/client';

const getRecommendedBooks = asyncHandler(
  async (req: Request, res: Response) => {
    const books = await prisma.book.findMany({
      take: 3,
      select: {
        id: true,
        name: true,
        description: true,
        category: {
          select: {
            name: true,
          },
        },
        author: {
          select: {
            name: true,
          },
        },
        feedback: {
          select: {
            averageRating: true,
            totalRatings: true,
            comments: true,
          },
        },
      },
    });

    return res.status(200).json({
      status: 200,
      body: {
        data: books,
        message: 'Fetched all the books successfully',
      },
      success: true,
    });
  }
);

const getAllBooks = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const perPage = parseInt(req.query.perPage as string) || 10;

  const skip = (page - 1) * perPage;
  const take = perPage;

  const books = await prisma.book.findMany({
    skip,
    take,
    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      feedback: {
        select: {
          id: true,
          averageRating: true,
        },
      },
    },
  });

  if (!books) {
    return res.status(404).json({
      status: 404,
      body: {
        data: null,
      },
      success: false,
      message: 'There are no books',
    });
  }

  const totalBooks = await prisma.book.count();

  const totalPage = Math.ceil(totalBooks / perPage);

  return res.status(200).json({
    status: 200,
    body: {
      data: books,
      pageInfo: {
        page: page,
        perPage: perPage,
        totalPage: totalPage,
      },
    },
    success: true,
    message: 'Fetched all the books successfully',
  });
});

const getBookById = asyncHandler(async (req: Request, res: Response) => {
  const { bookId } = req.params;

  if (!bookId) {
    return res.status(400).json({
      status: 400,
      body: {
        data: null,
        message: 'Please provide the book id',
      },
      success: false,
    });
  }

  const book = await prisma.book.findFirst({
    where: {
      id: bookId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
      subImages: true,
      pages: true,
      readStatus: true,
      publishedOn: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      author: {
        select: {
          id: true,
          name: true,
        },
      },
      feedback: {
        select: {
          averageRating: true,
          totalRatings: true,
          comments: true,
        },
      },
    },
  });

  if (!book) {
    return res.status(404).json({
      status: 404,
      body: {
        data: null,
        message: `Book with the id ${bookId} doesnot exist`,
      },
      success: false,
    });
  }

  return res.status(200).json({
    status: 200,
    body: {
      data: book,
      message: 'Fetched the book successfully',
    },
    success: true,
  });
});

const getBooksByCategoryId = asyncHandler(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({
        status: 400,
        body: {
          data: null,
        },
        success: false,
        message: 'Please provide the category id',
      });
    }

    const categoryExist = await prisma.category.findFirst({
      where: {
        id: categoryId,
      },
    });

    if (!categoryExist) {
      return res.status(404).json({
        status: 404,
        body: {
          data: null,
        },
        success: false,
        message: `Category with the id ${categoryId} doesnot exist`,
      });
    }

    const books = await prisma.book.findMany({
      where: {
        categoryId: categoryId,
      },
    });

    if (!books) {
      return res.status(404).json({
        status: 404,
        body: {
          data: null,
        },
        success: false,
        message: 'There are no books available with that category',
      });
    }

    return res.status(200).json({
      status: 200,
      body: {
        data: books,
      },
      success: true,
      message: `Fetched all the books of category ${categoryExist.name}`,
    });
  }
);

const getBooksByAuthorId = asyncHandler(async (req: Request, res: Response) => {
  const { authorId } = req.params;

  if (!authorId) {
    return res.status(400).json({
      status: 400,
      body: {
        data: null,
      },
      success: false,
      message: 'Please provide the author id',
    });
  }

  const authorExist = await prisma.author.findFirst({
    where: {
      id: authorId,
    },
  });

  if (!authorExist) {
    return res.status(404).json({
      status: 404,
      body: {
        data: null,
      },
      success: false,
      message: `Author with the id ${authorId} doesnot exist`,
    });
  }

  const books = await prisma.book.findMany({
    where: {
      authorId: authorId,
    },
  });

  if (!books) {
    return res.status(404).json({
      status: 404,
      body: {
        data: null,
      },
      success: false,
      message: `There are no books of the author ${authorExist.name}`,
    });
  }

  return res.status(200).json({
    status: 200,
    body: {
      data: books,
    },
    success: true,
    message: `Fetched all the books by the author ${authorExist.name}`,
  });
});

// const getAllUsersBooks = asyncHandler(
//   async (req: Request, res: Response) => {}
// );
// const getUsersBooksByReadStatus = asyncHandler(
//   async (req: Request, res: Response) => {}
// );

export const BookQueries = {
  getRecommendedBooks,
  getAllBooks,
  getBookById,
  getBooksByCategoryId,
  getBooksByAuthorId,
} as const;
