import { Model } from 'mongoose';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  userEmail: string;
  thumbnail: string;
  publicationDate: Date;
  reviews?: string[];
};

export type IBooksFilter = {
  searchTerm?: string;
  title?: string;
  author?: string;
  genre?: string;
  publicationDate?: Date;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
