import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const orderSchema = new Schema({
  totalPrice: {
    type: Number,
    min: 0
  }
});
