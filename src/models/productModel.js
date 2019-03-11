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
    required: "Enter product's description"
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
    min: 0,
    required: "Enter product's sale price"
  },
  inStock: {
    type: Boolean,
    default: true
  },
  genre: {
    type: String,
    enum: {
      values: ['camera', 'lense', 'drone', 'other'],
      message: "Enter product's genre : 'camera', 'lense', 'drone' or 'other'!"
    },
    required: "Enter product's genre : 'camera', 'lense', 'drone' or 'other'."
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: 'Product must belong to an existing shop.'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});
