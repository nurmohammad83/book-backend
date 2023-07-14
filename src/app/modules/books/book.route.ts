import express from 'express';
import { BooksController } from './book.controller';

const router = express.Router();

router.post('/create-book', BooksController.createBook);
router.get('/', BooksController.getBooks);
router.patch('/:id', BooksController.editBook);

export const BookRoute = router;
