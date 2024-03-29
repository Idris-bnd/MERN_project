const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { SignUpErrors, SignInErrors } = require('../utils/errors.utils');

module.exports.signUp = async (req, res) => {
    // recup des données déstrucutrée via le body
    const { pseudo, email, password } = req.body;

    try {
        const user = await UserModel.create({ pseudo, email, password });
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = SignUpErrors(err);
        res.status(200).json({ errors });
    }
};

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge,
    });
}

module.exports.signIn = async (req, res) => {
    // recup des données déstrucutrée via le body
    const { email, password } = req.body;

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge });
        res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = SignInErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
};