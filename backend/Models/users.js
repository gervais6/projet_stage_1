import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: String,
  resetTokenExpiry: Date,
});

const UsersModel = mongoose.model('users', UserSchema);

// Exporter le modèle pour l'utiliser ailleurs
module.exports = UsersModel;
