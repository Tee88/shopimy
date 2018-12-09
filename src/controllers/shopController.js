import mongoose from 'mongoose';
import { shopSchema } from '../models/shopModel';
import uniqueValidator from 'mongoose-unique-validator';

const Shop = mongoose.model('Shop', shopSchema.plugin(uniqueValidator));

export const addNewShop = (req, res) => {
  let newShop = new Shop(req.body);

  newShop
    .save()
    .then(shop => {
      res.status(201).json(shop);
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
};

export const getShops = (req, res) => {
  Shop.find()
    .select('_id name createdAt')
    .exec()
    .then(shops => {
      res.status(200).json(shops);
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
};

export const getShopById = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.shopId);
  Shop.findById(id)
    .then(shop => {
      shop
        ? res.status(200).json(shop)
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

export const updateShop = (req, res) => {
  const updates = { ...req.body, updatedAt: Date.now() };
  Shop.findOneAndUpdate({ _id: req.params.shopId }, updates, {
    new: true
  })
    .then(updatedShop => {
      res.status(200).json(updatedShop);
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
};

export const deleteShop = (req, res) => {
  Shop.deleteOne({ _id: req.params.shopId })
    .then(() => {
      res.status(200).json({
        message: 'Successfully deleted shop'
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
};
