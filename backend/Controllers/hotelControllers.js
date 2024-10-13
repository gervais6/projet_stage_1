const HotelModel = require('../Models/hotel'); // Assurez-vous que le chemin vers votre modèle est correct
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Fonction pour ajouter un nouvel hôtel
const addHotel = async (req, res) => {
    try {
        const { name, address, email, phone, pricePerNight, currency } = req.body;
        
        const newHotel = new HotelModel({
            name,
            address,
            email,
            phone,
            pricePerNight,
            currency,
            photo: req.file ? req.file.path : null // Chemin de la photo uploadée
        });

        await newHotel.save();

        res.status(201).json({
            message: 'Hôtel ajouté avec succès',
            success: true,
            hotel: newHotel
        });
    } catch (err) {
        console.error("Erreur lors de l'ajout de l'hôtel:", err);
        res.status(500).json({
            message: "Erreur interne du serveur",
            success: false
        });
    }
};

// Fonction pour obtenir tous les hôtels
const getAllHotels = async (req, res) => {
    try {
        const hotels = await HotelModel.find();
        res.status(200).json({
            message: 'Liste des hôtels récupérée avec succès',
            success: true,
            hotels
        });
    } catch (err) {
        console.error("Erreur lors de la récupération des hôtels:", err);
        res.status(500).json({
            message: "Erreur interne du serveur",
            success: false
        });
    }
};

// Fonction pour obtenir un hôtel par son ID
const getHotelById = async (req, res) => {
    try {
        const { id } = req.params;
        const hotel = await HotelModel.findById(id);

        if (!hotel) {
            return res.status(404).json({
                message: 'Hôtel non trouvé',
                success: false
            });
        }

        res.status(200).json({
            message: 'Hôtel récupéré avec succès',
            success: true,
            hotel
        });
    } catch (err) {
        console.error("Erreur lors de la récupération de l'hôtel:", err);
        res.status(500).json({
            message: "Erreur interne du serveur",
            success: false
        });
    }
};

// Fonction pour mettre à jour un hôtel
const updateHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedHotel = await HotelModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedHotel) {
            return res.status(404).json({
                message: 'Hôtel non trouvé',
                success: false
            });
        }

        res.status(200).json({
            message: 'Hôtel mis à jour avec succès',
            success: true,
            hotel: updatedHotel
        });
    } catch (err) {
        console.error("Erreur lors de la mise à jour de l'hôtel:", err);
        res.status(500).json({
            message: "Erreur interne du serveur",
            success: false
        });
    }
};

// Fonction pour supprimer un hôtel
const deleteHotel = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedHotel = await HotelModel.findByIdAndDelete(id);

        if (!deletedHotel) {
            return res.status(404).json({
                message: 'Hôtel non trouvé',
                success: false
            });
        }

        res.status(200).json({
            message: 'Hôtel supprimé avec succès',
            success: true
        });
    } catch (err) {
        console.error("Erreur lors de la suppression de l'hôtel:", err);
        res.status(500).json({
            message: "Erreur interne du serveur",
            success: false
        });
    }
};

module.exports = {
    addHotel,
    getAllHotels,
    getHotelById,
    updateHotel,
    deleteHotel,
};
