

import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../model/product';

const createProduct = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {
            productName,
            productDescription,
            price,
            category,
            stockQuantity,
            createdAt,
            updatedAt
        } = req.body;

        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            productName,
            productDescription,
            price,
            category,
            stockQuantity,
            createdAt,
            updatedAt
        });
        const product_1 = await product
            .save();
        return res.status(201).json({ product_1 });
    } catch (error) {
        return res.status(500).json({ error });
    }


};

const readproduct = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        return (product ? res.status(200).json({ product }) : res.status(404).json({ message: 'not found' }));
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.find();
        return res.status(200).json({ products });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const updateProduct = (req: Request, res: Response, next: NextFunction) => {

    const productId = req.params.productId;

    return Product.findById(productId)
        .then((product) => {
            if (product) {
                product.set({ ...req.body, updatedAt: Date.now() });

                return product
                    .save()
                    .then((product) => res.status(201).json({ product }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;

    return Product.findByIdAndDelete(productId)
        .then((product) => (product ? res.status(201).json({ product, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createProduct, readproduct, readAll, updateProduct, deleteProduct };