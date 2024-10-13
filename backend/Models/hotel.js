const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  currency: { type: String, required: true },
  photo: { type: String } // Pour stocker le chemin de l'image
});

const Hotelmodel= mongoose.model('hotels', hotelSchema);
module.exports = Hotelmodel;
