const Joi = require('joi');

// Validation pour l'ajout d'un hôtel
const addHotelValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        address: Joi.string().min(5).max(255).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).required(), // Exemple de validation pour un numéro de téléphone
        pricePerNight: Joi.number().positive().required(),
        currency: Joi.string().valid('USD', 'EUR', 'GBP', 'XAF').required(), // Exemples de devises autorisées
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error: error.details[0].message });
    }
    next();
};

// Validation pour la mise à jour d'un hôtel
const updateHotelValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100),
        address: Joi.string().min(5).max(255),
        email: Joi.string().email(),
        phone: Joi.string().pattern(/^[0-9]+$/).min(10).max(15),
        pricePerNight: Joi.number().positive(),
        currency: Joi.string().valid('USD', 'EUR', 'GBP', 'XAF'),
    }).min(1); // Au moins un champ doit être fourni pour la mise à jour

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error: error.details[0].message });
    }
    next();
};

module.exports = {
    addHotelValidation,
    updateHotelValidation,
};
