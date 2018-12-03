import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const productSchema = new Schema({
  productName: {
    type: String,
    required: "Enter product's name"
  },
  price: {
    type: Number,
    required: 'Enter product price'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
