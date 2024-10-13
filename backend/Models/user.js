const mongoose = require('mongoose');

// Définir un schéma pour un hôtel
const UserSchema = new mongoose.Schema({
    name: 
    { type: String, required: true },
     // Nom de l'hôtel
    email: 
    { type: String, required: true }, // Email de contact
   
    password:
    
    { type: String, required:true } // 
});

// Créer un modèle à partir du schéma
const UserModel = mongoose.model('users', UserSchema);

// Exporter le modèle pour l'utiliser ailleurs
module.exports = UserModel;

