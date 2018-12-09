import mongoose from 'mongoose';
import { productSchema } from '../models/productModel';
import uniqueValidator from 'mongoose-unique-validator';

const Product = mongoose.model(
  'Product',
  productSchema.plugin(uniqueValidator)
);

export const addNewProduct = (req, res) => {
  let newProduct = new Product(req.body);

  newProduct
    .save()
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
  Product.findOneAndUpdate({ _id: req.params.productId }, req.body, {
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
