import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { IProduct } from '../model/product';
import Logging from '../library/logging';

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);

            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    product: {
        create: Joi.object<IProduct>({
            productName: Joi.string().required(),
            productDescription: Joi.string().required(),
            price: Joi.number().required(),
            category: Joi.string().required(),
            stockQuantity: Joi.number().required(),
        }),
        update: Joi.object<IProduct>({
            productName: Joi.string().required(),
            productDescription: Joi.string().required(),
            price: Joi.number().required(),
            category: Joi.string().required(),
            stockQuantity: Joi.number().required(),
        })
    }
};