const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({}).select('-password');
        res.status(201).json(users);
    } catch (err) {
        res.status(200).json(err);
    }
};

module.exports.userInfo = async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).json({ message: "Id unknown: " + id })
    }
    
    try {
        const user = await UserModel.findById(id).select('-password');
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ message: "Id unknown: " + id });
    }
};