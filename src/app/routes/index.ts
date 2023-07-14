import express from 'express';
import { UserRoute } from '../modules/user/user.route';
import { BookRoute } from '../modules/books/book.route';
const router = express.Router();
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/books',
    route: BookRoute,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
