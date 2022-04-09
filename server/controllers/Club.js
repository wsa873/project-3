const models = require('../models');
const ClubModel = require('../models/Club');

const { Club } = models;

const makerPage = (req, res) => {
  return res.render('app');
};

const makeClub = async (req, res) => {
  if (!req.body.name || !req.body.latitude || !req.body.longitude || !req.body.stadium) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  const ClubData = {
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    stadium: req.body.stadium,
    owner: req.session.account._id,
  };

  try {
    const newClub = new Club(ClubData);
    await newClub.save();
    return res.status(201).json({name: newClub.name, location: [newClub.longitude, newClub.latitude], stadium: newClub.stadium});
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Club already exists!' });
    }
    return res.status(400).json({ error: 'An error occured' });
  }
};

const getClubs = (req, res) => {
  return ClubModel.findByOwner(req.session.account._id, (err, docs) => {
    if(err) {
      console.log(err);
      return res.status(400).json({error: 'An error occured!'});
    }
    return res.json({Clubs:docs});
  });
}

const editClub = async (req, res) => {
  if (!req.body.name || !req.body.latitude || !req.body.longitude || !req.body.stadium) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  const newClubData = {
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    stadium: req.body.stadium,
    owner: req.session.account._id,
  };

  try{
    let oldClub = ClubModel.findByOwner(req.session.account._id);
    oldClub = newClubData;
    await oldClub.save();
    return res.status(204).json({name: oldClub.name, location: [oldClub.longitude, oldClub.latitude], stadium: oldClub.stadium});
  }
  catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occured' });
  }
}

module.exports = {
  makerPage,
  makeClub,
  getClubs,
  editClub
};
