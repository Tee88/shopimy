import mongoose from 'mongoose';
import { lineItemSchema } from '../models/lineItemModel';
import { productSchema } from '../models/productModel';
import { orderSchema } from '../models/orderModel';

import uniqueValidator from 'mongoose-unique-validator';

const LineItem = mongoose.model(
  'LineItem',
  lineItemSchema.plugin(uniqueValidator)
);

const Order = mongoose.model('Order', orderSchema);
const Product = mongoose.model('Product', productSchema);

export const addNewLineItem = (req, res) => {
  const orderId = req.query.orderId;
  const productId = req.query.productId;

  Promise.all([Order.findById(orderId), Product.findById(productId)])
    .then(([order, product]) => {
      if (!order) {
        throw new Error('order');
      }

      if (!product) {
        throw new Error('product');
      }

      let newLineItem = new LineItem({ order, product });
      return newLineItem.save();
    })
    .then(lineItem => {
      res.status(201).json(lineItem);
    })
    .catch(err => {
      switch (err.message) {
        case 'order':
          res.status(404).json({
            message:
              'Line item must belong to an existing order!  correct orderId required.'
          });
        case 'product':
          res.status(404).json({
            message:
              'Line item must refer to an existing product!  correct productId required.'
          });
        default:
          res.status(500).json({
            error: err.message
          });
      }
    });
};

export const getLineItems = (req, res) => {
  let filter = {};

  if (req.query.orderId) {
    filter = { order: req.query.orderId };
  } else if (req.query.productId) {
    filter = { product: req.query.productId };
  }

  LineItem.find(filter)
    .exec()
    .then(lineItems => {
      res.status(200).json(lineItems);
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
};

export const getLineItemById = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.lineItemId);
  LineItem.findById(id)
    .populate('order')
    .populate('product')
    .then(lineItem => {
      lineItem
        ? res.status(200).json(lineItem)
        : res
            .status(404)
            .json({ message: 'No valid entry found for provided ID' });
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
};

export const updateLineItem = (req, res) => {
  const updates = { ...req.body, updatedAt: Date.now() };
  LineItem.findOneAndUpdate({ _id: req.params.lineItemId }, updates, {
    new: true
  })
    .then(updatedLineItem => {
      res.status(200).json(updatedLineItem);
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
};

export const deleteLineItem = (req, res) => {
  LineItem.deleteOne({ _id: req.params.lineItemId })
    .then(() => {
      res.status(200).json({
        message: 'Successfully deleted line item'
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
};
