const express = require('express');
const path = require('path');
const multer = require('multer');
const Hotel = require('../models/hotel');
const router = express.Router();

// Configurer le dossier des fichiers statiques
const app = express();
app.use('uploads', express.static(path.join(__dirname, 'uploads'))); // Servir le dossier uploads

// Configuration de multer pour l'upload d'images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Dossier où les images seront sauvegardées
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nom unique pour chaque fichier
  }
});

const upload = multer({ storage });

// Route pour lister les hôtels (en JSON)
router.get('/hotels', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des hôtels', error });
  }
});





// Route pour créer un hôtel avec upload de photo
router.post('/hotels', upload.single('photo'), async (req, res) => {
  const { name, address, email, phone, pricePerNight, currency } = req.body;

  try {
    const newHotel = new Hotel({
      name,
      address,
      email,
      phone,
      pricePerNight,
      currency,
      photo: req.file ? req.file.filename : null // Stocker uniquement le nom du fichier
    });

    await newHotel.save();
    res.status(201).json({ message: 'Hôtel créé avec succès', hotel: newHotel });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'hôtel', error });
  }
});

module.exports = router;
