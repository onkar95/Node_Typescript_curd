// // import { classToClass } from 'class-transformer'
// import { Request, Response } from 'express'
// import CreateProductService from '../services/CresteProductService'
// // import { DeleteUserService } from '../services/DeleteUserService'
// // import { ShowUserService } from '../services/ShowUserService'
// // import { UpdateUserService } from '../services/UpdateUserService'

// class UsersController {
//     async create(request: Request, response: Response): Promise<Response> {
//         const { email, password } = request.body

//         const createUser = new CreateProductService()

//         const user = await createUser.execute({ email, password })

//         return response.status(201).json(user)
//     }

//     //   async delete(request: Request, response: Response): Promise<Response> {
//     //     const { id } = request.params // users/:id

//     //     const deleteUser = new DeleteUserService()

//     //     await deleteUser.execute({ user_id: id })

//     //     return response.status(200).json({ ok: true })
//     //   }

//     //   async show(request: Request, response: Response): Promise<Response> {
//     //     const { id } = request.params // users/:id

//     //     const showUser = new ShowUserService()

//     //     const user = await showUser.execute({ user_id: id })

//     //     return response.status(201).json(classToClass(user))
//     //   }

//     //   async update(request: Request, response: Response): Promise<Response> {
//     //     const { prevPassword, newPassword } = request.body
//     //     const { id } = request.params

//     //     const updateUser = new UpdateUserService()

//     //     const user = await updateUser.execute({
//     //       prevPassword,
//     //       newPassword,
//     //       user_id: id
//     //     })

//     //     return response.status(201).json(classToClass(user))
//     //   }
// }

// export { UsersController }



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