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
import { jwtHelpers } from '../../../helper/jwtHelper';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...bookData } = req.body;
  const result = await BooksService.createBook(bookData);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully!',
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
  const accessToken = req.headers.authorization;
  let verifiedUser = null;

  verifiedUser = jwtHelpers.verifiedToken(
    accessToken as string,
    config.jwt.secret_token as Secret
  );
  req.user = verifiedUser;
  const { userEmail } = verifiedUser;
  const result = await BooksService.editBook(id, editData, userEmail);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books edit successfully!',
    data: result,
  });
});
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
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const accessToken = req.headers.authorization;
  let verifiedUser = null;

  verifiedUser = jwtHelpers.verifiedToken(
    accessToken as string,
    config.jwt.secret_token as Secret
  );
  req.user = verifiedUser;
  const { userEmail } = verifiedUser;
  const result = await BooksService.deleteBook(id, userEmail);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books delete successfully!',
    data: result,
  });
});

export const BooksController = {
  createBook,
  singleBook,
  getBooks,
  editBook,
  deleteBook,
};
