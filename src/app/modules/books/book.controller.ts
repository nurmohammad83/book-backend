import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendRespons';
import httpStatus from 'http-status';
// import { IBook } from './book.interface';
import { BooksService } from './book.service';
import { IBook } from './book.interface';
import pick from '../../../shared/pick';
import { bookFilterableFields } from './book.constants';
import { IGenericResponse } from '../../../interfaces/common';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const bookData = req.body;
  const user = req.user;
  bookData.userEmail = user?.userEmail;
  const result = await BooksService.createBook(bookData);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully!',
    data: result,
  });
});

export type IReview = {
  reviews: string[];
};

const singleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BooksService.singleBook(id);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully!',
    data: result,
  });
});

const getBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const paginationOption = pick(req.query, [
    'page',
    'limit',
    'sortBy',
    'sortOrder',
  ]);
  const result = await BooksService.getBooks(filters, paginationOption);
  sendResponse<IGenericResponse<IBook[]>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully!',
    data: result,
  });
});
const editBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...editData } = req.body;
  const user = req.user;
  const result = await BooksService.editBook(id, editData, user);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books edit successfully!',
    data: result,
  });
});

const getReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BooksService.getReview(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review retrieved successfully!',
    data: result,
  });
});
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  const result = await BooksService.deleteBook(id, user);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books delete successfully!',
    data: result,
  });
});

const addReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { review } = req.body;
  const result = await BooksService.addReview(id, review);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'review added  successfully!',
    data: result,
  });
});

export const BooksController = {
  createBook,
  singleBook,
  getBooks,
  editBook,
  deleteBook,
  getReview,
  addReview,
};
