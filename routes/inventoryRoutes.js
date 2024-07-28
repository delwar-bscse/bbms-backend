import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createInventory, getInventory } from '../controllers/inventoryController.js';


//router object
const router = express.Router();

//routes
//ADD INVENTORY || POST
router.post('/create-inventory', authMiddleware, createInventory);

//ADD INVENTORY || POST
router.get('/get-inventory', authMiddleware, getInventory);


export default router;