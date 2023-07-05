

import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Product, { IProduct } from '../model/product';

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
        const newProduct = await product
            .save();
        return res.status(201).json({ newProduct });
    } catch (error) {
        return res.status(500).json({ error });
    }


};
const createMultipleProduct = async (req: Request, res: Response, next: NextFunction) => {

    try {


        const productObj = req.body

        const savedResponse: IProduct[] = [];

        productObj.forEach((element: IProduct) => {
            console.log(element)
            const product = new Product({
                _id: new mongoose.Types.ObjectId(),
                productName: element.productName,
                productDescription: element.productDescription,
                price: element.price,
                category: element.category,
                stockQuantity: element.stockQuantity,
            })
            product.save()
            savedResponse.push(product)
        });


        // const newProduct = await product
        //     .save();
        return res.status(201).json(savedResponse);
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
                    .then((updatedProduct) => res.status(201).json({ updatedProduct }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'product not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;

    return Product.findByIdAndDelete(productId)
        .then((product) => (product ? res.status(201).json({ product, message: 'Deleted' }) : res.status(404).json({ message: 'product not found please check the id' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createProduct, createMultipleProduct, readproduct, readAll, updateProduct, deleteProduct };