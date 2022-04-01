const mongoose = require('mongoose');
const _ = require('underscore');

let DomoModel = {};

const setName = (name) => _.escape(name).trim();
const setColor = (color) => _.escape(color).trim();

const DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  age: {
    type: Number,
    min: 0,
    require: true,
  },
  color: {
    type: String,
    required: true,
    trim: true,
    set: setColor,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

DomoSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  color: doc.color,
});

DomoSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    // convert string ownerid to object id
    owner: mongoose.Types.ObjectId(ownerId),
  };

  return DomoModel.find(search).select('name age color').lean().exec(callback);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports = DomoModel;
