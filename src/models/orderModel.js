import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const orderSchema = new Schema({
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
