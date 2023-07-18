import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import IPaginationOption from '../../../interfaces/pagination';
import { bookSearchableFields } from './book.constants';
import { IBook, IBooksFilter } from './book.interface';
import { Books } from './book.model';
import { IGenericResponse } from '../../../interfaces/common';
import { IReview } from './book.controller';
import { JwtPayload } from 'jsonwebtoken';
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
  const { limit, skip, sortBy, sortOrder, page } =
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
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Books.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Books.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const singleBook = async (id: string): Promise<IBook | null> => {
  const result = await Books.findById(id);
  return result;
};

const editBook = async (
  id: string,
  editData: IBook,
  user: JwtPayload | null
): Promise<IBook | null> => {
  const isBookExist = await Books.findOne({ _id: id });
  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book Not Found');
  }

  if (isBookExist.userEmail !== user?.userEmail) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  const result = await Books.findByIdAndUpdate({ _id: id }, editData, {
    new: true,
  });
  return result;
};

const deleteBook = async (
  id: string,
  user: JwtPayload | null
): Promise<IBook | null> => {
  const isBookExist = await Books.findOne({ _id: id });
  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book Not Found');
  }

  if (isBookExist.userEmail !== user?.userEmail) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  const result = await Books.findByIdAndDelete(id);
  return result;
};

const getReview = async (id: string) => {
  const result = await Books.findOne({ _id: id }, { _id: 0, reviews: 1 });
  return result;
};
const addReview = async (id: string, review: IReview) => {
  const result = await Books.findOneAndUpdate(
    { _id: id },
    { $push: { reviews: review } }
  );
  return result;
};

export const BooksService = {
  createBook,
  getBooks,
  editBook,
  singleBook,
  deleteBook,
  addReview,
  getReview,
};
