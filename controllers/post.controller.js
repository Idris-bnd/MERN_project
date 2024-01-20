const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.readPost = async (req, res) => {
    try {
        const posts = await PostModel.find({});
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ error });
    }
}
module.exports.createPost = async (req, res) => {
    const { posterId, message, video } = req.body;
    if (!ObjectID.isValid(posterId)) {
        return res.status(400).json({ message: "Id unknown: " + posterId })
    }

    const newPost = await PostModel.create({
        posterId,
        message,
        video,
        likers: [],
        comments: []
    });

    try {
        const post = await newPost.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error });
    }
}
module.exports.updatePost = async (req, res) => {

}
module.exports.deletePost = async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).json({ message: "Id unknown: " + id })
    }

    try {
        const resp = await PostModel.deleteOne({ _id: id });
        if (resp.deletedCount == 1) {
            res.status(200).json({ message: 'Successfuly deleted', resp });
        } else {
            res.status(400).json({ message: "Id unknown: " + id });
        }
    } catch (err) {
        res.status(400).json({ message: "Id unknown: " + id });
    }
}