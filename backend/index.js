const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./Models/db');
const path = require('path'); // Ajoutez ceci pour importer le module 'path'

const app = express();
const PORT = process.env.PORT || 8080;

// Importation des routes
const AuthRouter = require('./Routes/AuthRouter');
const hotelRouter = require('./Routes/hotelRouter'); // Assurez-vous que le chemin est correct

app.get('/', (req, res) => {
  res.json('Bienvenue');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Utilisation des routes
app.use('/auth', AuthRouter);
app.use('/hotels', hotelRouter); // Route pour les hôtels

app.listen(PORT, () => {
  console.log(`Serveur backend à l'écoute sur http://localhost:${PORT}`);
});
