import { Schema, model } from "mongoose";

export interface Iproduct {
  _id?: string;
  productName: string;
  price: number;
  description: string;
  imageURL: string;
  stockQuantity: number;
}

/* The code is defining a Mongoose schema for a product. */
// Define the product schema
const productSchema = new Schema<Iproduct>({
  // The name of the product
  productName: { type: String, required: true }, // The price of the product

  price: {
    type: Number,
    required: true,
    min: [1, "Price of product must be greater than 1."],
  }, // The description of the product
  description: { type: String, required: true }, // The URL of the product image
  imageURL: { type: String, required: true }, // The quantity of the product in stock
  stockQuantity: {
    type: Number,
    required: true,
    min: [0, "Quantity must be greater than 0."],
  },
});

export const ProductModel = model<Iproduct>("product", productSchema);
