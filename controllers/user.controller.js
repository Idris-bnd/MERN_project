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

module.exports.updateUser = async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).json({ message: "Id unknown: " + id })
    }

    try {
        const user = await UserModel.findOneAndUpdate(
            { _id: id, },
            {
                $set: {
                    bio: req.body.bio
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "err: " + err });
    }
};

module.exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).json({ message: "Id unknown: " + id })
    }

    try {
        const resp = await UserModel.deleteOne({ _id: id });
        if (resp.deletedCount == 1) {
            res.status(200).json({ message: 'Successfuly deleted', resp });
        } else {
            res.status(400).json({ message: "Id unknown: " + id });
        }
    } catch (err) {
        res.status(400).json({ message: "Id unknown: " + id });
    }
};
