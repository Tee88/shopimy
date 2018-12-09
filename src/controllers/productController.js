import mongoose from 'mongoose';
import { productSchema } from '../models/productModel';
import uniqueValidator from 'mongoose-unique-validator';

const Product = mongoose.model(
  'Product',
  productSchema.plugin(uniqueValidator)
);

export const addNewProduct = (req, res) => {
  let newProduct = new Product(req.body);

  // newProduct.save((err, product) => {
  //   if (err) {
  //     res.send(err);
  //   }
  //   res.status(201).json(product);
  // });

  newProduct
    .save()
    .then(product => {
      res.status(201).json(product);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

export const getProducts = (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json(products);
  });
};

export const getProductById = (req, res) => {
  Product.findById(req.params.productId, (err, products) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json(products);
  });
};

export const updateProduct = (req, res) => {
  Product.findOneAndUpdate(
    { _id: req.params.productId },
    req.body,
    { new: true },
    (err, product) => {
      if (err) {
        res.send(err);
      }
      res.status(200).json(product);
    }
  );
};

export const deleteProduct = (req, res) => {
  Product.remove({ _id: req.params.productId }, (err, product) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json({ message: 'Successfully deleted product' });
  });
};
