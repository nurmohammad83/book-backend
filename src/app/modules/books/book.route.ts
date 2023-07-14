import express from 'express';
import { BooksController } from './book.controller';

const router = express.Router();

router.post('/create-book', BooksController.createBook);
router.get('/:id', BooksController.singleBook);
router.delete('/:id', BooksController.deleteBook);
router.patch('/:id', BooksController.editBook);
router.get('/', BooksController.getBooks);

export const BookRoute = router;
