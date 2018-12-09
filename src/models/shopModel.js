import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const shopSchema = new Schema({
  name: {
    type: String,
    required: "Enter shops's name",
    unique: true,
    maxlength: 25
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});
