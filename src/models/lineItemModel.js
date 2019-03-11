import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const lineItemSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: 'Line item must refer to an existing product.'
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: 'Line item must belong to an existing order.'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  quantity: {
    type: Number,
    required: "Enter item's qunatity",
    min: 1
  },
  totalPrice: {
    type: Number,
    default: 0
  }
});

lineItemSchema.index({ product: 1, order: 1 }, { unique: true });

exports.lineItemSchema = lineItemSchema;
