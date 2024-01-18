const UserModel = require('../models/user.model');

module.exports.signUp = async (req, res) => {
    // recup des données déstrucutrée via le body
    const { pseudo, email, password } = req.body;

    try {
        const user = await UserModel.create({ pseudo, email, password });
        res.status(201).json(user);
    } catch (err) {
        res.status(200).json({ err });
    }
};