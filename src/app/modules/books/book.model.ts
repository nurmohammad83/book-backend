import { Schema, model } from 'mongoose';
import { BookModel, IBook } from './book.interface';

const bookSchema = new Schema<IBook, BookModel>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: Date,
    required: true,
  },
});

export const Books = model<IBook, BookModel>('Books', bookSchema);
