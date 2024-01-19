const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.status(201).json(users);
    } catch (err) {
        res.status(200).json(err);
    }
};