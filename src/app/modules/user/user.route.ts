import express from 'express';
const router = express.Router();

router.post('/createUser', UserController.createUser);

export const UserRoute = router;
