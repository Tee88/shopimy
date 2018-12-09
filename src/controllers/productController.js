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
  const shopName = req.body.shop;
  Shop.find()
    .select('name')
    .then(shops => {
      const shopsNames = shops.map(shop => {
        return shop.name;
      });
      if (!shopsNames.includes(shopName)) {
        res.status(404).json({
          message: `${shopName} not found. shop must be one of the following list [${shopsNames}]`
        });
      } else {
        let newProduct = new Product(req.body);

        newProduct.save().then(product => {
          res.status(201).json(product);
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
};

export const getProducts = (req, res) => {
  Product.find()
    .select('_id name price createdAt')
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
  Product.remove({ _id: req.params.productId })
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
