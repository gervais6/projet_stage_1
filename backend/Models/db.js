const dotenv = require('dotenv'); // Utilisation de CommonJS
dotenv.config();

const mongoose = require('mongoose');

// Vérifiez que MONGO_URI est bien défini
const uri = process.env.MONGO_URI;
if (!uri) {
    console.error('MONGO_URI is not defined. Please check your .env file.');
    process.exit(1); // Arrêtez le programme si MONGO_URI n'est pas défini
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB successfully');
    })
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
    });
