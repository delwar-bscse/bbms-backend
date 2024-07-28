import express from 'express';
import { loginController, registerController, currentUserController } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

//routes
//REGISTER || POST
router.post('/register', registerController);

//LOGIN || POST
router.post('/login', loginController);

//CURREN USER || GET
  router.get('/current-user', authMiddleware, currentUserController);

export default router;