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

module.exports.follow = async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id) || !ObjectID.isValid(req.body.idToFollow)) {
        return res.status(400).json({ message: "Id unknown" })
    }

    try {
        // add to the follower list
        const result1 = await UserModel.findByIdAndUpdate(
            id,
            { $addToSet: { following: req.body.idToFollow } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        );

        try {
            // add to the following list
            const result2 = await UserModel.findByIdAndUpdate(
                req.body.idToFollow,
                { $addToSet: { followers: id } },
                { new: true, upsert: true, setDefaultsOnInsert: true }
            );
            res.status(200).json({ message: "Follows OK" });
        } catch (error) {
            res.status(400).json({ err: error });
        }

    } catch (err) {
        res.status(400).json({ err: err });
    }

};

module.exports.unfollow = async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id) || !ObjectID.isValid(req.body.idToUnfollow)) {
        return res.status(400).json({ message: "Id unknown" })
    }

    try {
        // add to the follower list
        const result1 = await UserModel.findByIdAndUpdate(
            id,
            { $pull: { following: req.body.idToUnfollow } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        );

        try {
            // add to the following list
            const result2 = await UserModel.findByIdAndUpdate(
                req.body.idToUnfollow,
                { $pull: { followers: id } },
                { new: true, upsert: true, setDefaultsOnInsert: true }
            );
            res.status(200).json({ message: "Unfollows OK" });
        } catch (error) {
            res.status(400).json({ err: error });
        }

    } catch (err) {
        res.status(400).json({ err: err });
    }

};