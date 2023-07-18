import express from 'express';
import { BooksController } from './book.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/create-book', auth(), BooksController.createBook);
router.get('/:id', BooksController.singleBook);
router.post('/review/:id', BooksController.addReview);
router.get('/review/:id', BooksController.getReview);
router.delete('/:id', auth(), BooksController.deleteBook);
router.patch('/:id', auth(), BooksController.editBook);
router.get('/', BooksController.getBooks);

export const BookRoute = router;
