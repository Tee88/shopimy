import mongoose from 'mongoose';
import { productSchema } from '../models/productModel';
import { shopSchema } from '../models/shopModel';

import uniqueValidator from 'mongoose-unique-validator';

const Product = mongoose.model(
  'Product',
  productSchema.plugin(uniqueValidator)
);

const Shop = mongoose.model('Shop', shopSchema);

export const addNewProduct = (req, res) => {
  Shop.findById(req.body.shopId)
    .then(shop => {
      if (!shop) {
        return res.status(404).json({
          message:
            'Product must belong to an existing shop!  correct shopId required.'
        });
      }
      let newProduct = new Product(req.body);
      return newProduct.save();
    })

    .then(product => {
      res.status(201).json(product);
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
};

export const getProducts = (req, res) => {
  Product.find()
    .exec()
    .then(products => {
      res.status(200).json(products);
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
};

export const getProductById = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.productId);
  Product.findById(id)
    .then(product => {
      product
        ? res.status(200).json(product)
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

export const updateProduct = (req, res) => {
  const updates = { ...req.body, updatedAt: Date.now() };
  Product.findOneAndUpdate({ _id: req.params.productId }, updates, {
    new: true
  })
    .then(updatedProduct => {
      res.status(200).json(updatedProduct);
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
};

export const deleteProduct = (req, res) => {
  Product.deleteOne({ _id: req.params.productId })
    .then(() => {
      res.status(200).json({
        message: 'Successfully deleted product'
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
};
