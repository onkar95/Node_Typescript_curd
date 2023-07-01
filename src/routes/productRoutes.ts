import express from 'express';
import ProductControllers from '../controllers/ProductControllers';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

router.post('/create', ValidateJoi(Schemas.product.create), ProductControllers.createProduct);
router.get('/get/:productId', ProductControllers.readproduct);
router.get('/get', ProductControllers.readAll);
router.patch('/update/:productId', ValidateJoi(Schemas.product.update), ProductControllers.updateProduct);
router.delete('/delete/:productId', ProductControllers.deleteProduct);

export = router;