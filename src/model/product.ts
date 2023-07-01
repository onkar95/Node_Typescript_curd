import { timeStamp } from 'console';
import mongoose, { Document, Schema } from 'mongoose';

export interface Product extends Document {
    productName: String,
    productDescription: String,
    price: Number,
    category: String,
    stockQuantity: Number,
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

export default mongoose.model<Product>('Product', ProductSchema);