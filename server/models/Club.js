const mongoose = require('mongoose');
const _ = require('underscore');

let ClubModel = {};

const setName = (name) => _.escape(name).trim();
const setStadium = (stadium) => _.escape(stadium).trim();

const ClubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  //https://mongoosejs.com/docs/geojson.html
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  stadium: {
    type: String,
    required: true,
    set: setStadium,
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

ClubSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  location: doc.location,
  stadium: doc.stadium,
});

ClubSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    // convert string ownerid to object id
    owner: mongoose.Types.ObjectId(ownerId),
  };

  return ClubModel.find(search).select('name location stadium').lean().exec(callback);
};

ClubModel = mongoose.model('Club', ClubSchema);

module.exports = ClubModel;
