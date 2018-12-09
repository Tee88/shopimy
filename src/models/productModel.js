import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const productSchema = new Schema({
  name: {
    type: String,
    required: "Enter product's name",
    unique: true,
    maxlength: 50
  },
  description: {
    type: String,
    required: "Enter product's description",
    unique: true
  },
  price: {
    type: Number,
    required: "Enter product's price",
    min: 0
  },
  onSale: {
    type: Boolean,
    default: false
  },
  salePrice: {
    type: Number,
    min: 0
  },
  inStock: {
    type: Boolean,
    default: true
  },
  totalSales: {
    type: Number,
    default: 0,
    min: 0
  },
  genre: {
    type: String,
    enum: ['camera', 'lense', 'drone', 'other'],
    required: "Enter product's genre : 'camera', 'lense', 'drone' or 'other'."
  },
  shop: {
    type: String,
    required: 'Product must belong to an existing shop'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
