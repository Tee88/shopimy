import mongoose from 'mongoose';
import { orderSchema } from '../models/orderModel';
import { shopSchema } from '../models/shopModel';

import uniqueValidator from 'mongoose-unique-validator';

const Order = mongoose.model('Order', orderSchema.plugin(uniqueValidator));

const Shop = mongoose.model('Shop', shopSchema);

export const addNewOrder = (req, res) => {
  const shopId = req.query.shopId;

  Shop.findById(shopId)
    .then(shop => {
      if (!shop) {
        return res.status(404).json({
          message:
            'Order must belong to an existing shop!  correct shopId required.'
        });
      }
      req.body.shop = shopId;
      let newOrder = new Order(req.body);
      return newOrder.save();
    })
    .then(order => {
      res.status(201).json(order);
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
};

export const getOrders = (req, res) => {
  const filter = req.query.shopId ? { shop: req.query.shopId } : {};
  Order.find(filter)
    .populate('shop')
    .exec()
    .then(orders => {
      res.status(200).json(orders);
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
};

export const getOrderById = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.orderId);
  Order.findById(id)
    .populate('shop')
    .then(order => {
      order
        ? res.status(200).json(order)
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

export const updateOrder = (req, res) => {
  const updates = { ...req.body, updatedAt: Date.now() };
  Order.findOneAndUpdate({ _id: req.params.orderId }, updates, {
    new: true
  })
    .then(updatedOrder => {
      res.status(200).json(updatedOrder);
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
};

export const deleteOrder = (req, res) => {
  Order.deleteOne({ _id: req.params.orderId })
    .then(() => {
      res.status(200).json({
        message: 'Successfully deleted order'
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
};
