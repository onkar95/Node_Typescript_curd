"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const ProductControllers_1 = __importDefault(require("../controllers/ProductControllers"));
const Joi_1 = require("../middleware/Joi");
const router = express_1.default.Router();
router.post('/create', (0, Joi_1.ValidateJoi)(Joi_1.Schemas.product.create), ProductControllers_1.default.createProduct);
router.get('/get/:productId', ProductControllers_1.default.readproduct);
router.get('/get', ProductControllers_1.default.readAll);
router.patch('/update/:productId', (0, Joi_1.ValidateJoi)(Joi_1.Schemas.product.update), ProductControllers_1.default.updateProduct);
router.delete('/delete/:productId', ProductControllers_1.default.deleteProduct);
module.exports = router;
