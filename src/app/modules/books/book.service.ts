import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import IPaginationOption from '../../../interfaces/pagination';
import { bookSearchableFields } from './book.constants';
import { IBook, IBooksFilter } from './book.interface';
import { Books } from './book.model';
import { IGenericResponse } from '../../../interfaces/common';
import ApiError from '../../../Errors/ApiError';
import httpStatus from 'http-status';

const createBook = async (bookData: IBook): Promise<IBook> => {
  const result = await Books.create(bookData);
  return result;
};
const getBooks = async (
  filters: IBooksFilter,
  paginationOptions: IPaginationOption
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { limit, sortBy, sortOrder, page } =
    paginationHelper.calculatePagination(paginationOptions);
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortOrder && sortBy) {
    sortCondition[sortBy] = sortOrder;
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Books.find(whereCondition);

  const total = await Books.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const editBook = async (
  id: string,
  editData: IBook,
  userEmail: string
): Promise<IBook | null> => {
  const isUserExist = await Books.findOne({ _id: id });

  if (isUserExist?.userEmail !== userEmail) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized this product'
    );
  }
  const result = await Books.findByIdAndUpdate({ _id: id }, editData, {
    new: true,
  });
  return result;
};
const singleBook = async (id: string): Promise<IBook | null> => {
  const result = await Books.findById(id);
  return result;
};
const deleteBook = async (
  id: string,
  userEmail: string
): Promise<IBook | null> => {
  const isUserExist = await Books.findOne({ _id: id });

  if (isUserExist?.userEmail !== userEmail) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized this product'
    );
  }

  const result = await Books.findByIdAndDelete(id);
  return result;
};
export const BooksService = {
  createBook,
  getBooks,
  editBook,
  singleBook,
  deleteBook,
};
