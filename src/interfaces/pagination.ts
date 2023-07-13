type IPaginationOption = {
  page?: number;
  limit?: number;
  sortOrder?: 'asc' | 'desc';
  sortBy?: string;
  minPrice?: number;
  maxPrice?: number;
};

export default IPaginationOption;
