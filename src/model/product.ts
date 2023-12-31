import { timeStamp } from 'console';
import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    productName: string,
    productDescription: string,
    price: number,
    category: string,
    stockQuantity: number,
    createdAt: Date,
    updatedAt: Date
}


const ProductSchema: Schema = new Schema(
    {
        productName: { type: String, required: true },
        productDescription: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: Number, required: true },
        stockQuantity: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now() },
        updatedAt: { type: Date },
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IProduct>('Product', ProductSchema);