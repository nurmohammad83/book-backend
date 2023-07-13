import { SortOrder } from 'mongoose';

type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  minPrice?: number | null;
  maxPrice?: number | null;
};

type IOptionsResults = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
  minPrice: number | null;
  maxPrice: number | null;
};

const calculatePagination = (option: IOptions): IOptionsResults => {
  const page = Number(option.page || 1);
  const limit = Number(option.limit || 10);
  const skip = (page - 1) * limit;
  const sortBy = option.sortBy || 'createAt';
  const sortOrder = option.sortOrder || 'desc';
  const minPrice = Number(option.minPrice);
  const maxPrice = Number(option.maxPrice);

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
  };
};

export const paginationHelper = {
  calculatePagination,
};
