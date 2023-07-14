import { IBook } from './book.interface';
import { Books } from './book.model';

const createBook = async (bookData: IBook): Promise<IBook> => {
  const result = await Books.create(bookData);
  return result;
};

export const BooksService = {
  createBook,
};
