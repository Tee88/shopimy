import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const orderSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  totalPrice: {
    type: Number,
    min: 0,
    default: 0
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: 'Order must belong to an existing shop.'
  }
});
