"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const product_1 = __importDefault(require("../model/product"));
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productName, productDescription, price, category, stockQuantity, createdAt, updatedAt } = req.body;
        const product = new product_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            productName,
            productDescription,
            price,
            category,
            stockQuantity,
            createdAt,
            updatedAt
        });
        const newProduct = yield product
            .save();
        return res.status(201).json({ newProduct });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const readproduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const product = yield product_1.default.findById(productId);
        return (product ? res.status(200).json({ product }) : res.status(404).json({ message: 'not found' }));
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.find();
        return res.status(200).json({ products });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const updateProduct = (req, res, next) => {
    const productId = req.params.productId;
    return product_1.default.findById(productId)
        .then((product) => {
        if (product) {
            product.set(Object.assign(Object.assign({}, req.body), { updatedAt: Date.now() }));
            return product
                .save()
                .then((updatedProduct) => res.status(201).json({ updatedProduct }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ message: 'not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteProduct = (req, res, next) => {
    const productId = req.params.productId;
    return product_1.default.findByIdAndDelete(productId)
        .then((product) => (product ? res.status(201).json({ product, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createProduct, readproduct, readAll, updateProduct, deleteProduct };
