const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const { UploadErrors } = require('../utils/errors.utils');
const ObjectID = require('mongoose').Types.ObjectId;

const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

module.exports.readPost = async (req, res) => {
    try {
        const posts = await PostModel.find({}).sort({ createdAt: -1 });
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

    let fileName;
    const { file } = req;
    if (file) {
        try {
            if (
                file.detectedMimeType != "image/jpg" &&
                file.detectedMimeType != "image/png" &&
                file.detectedMimeType != "image/jpeg"
            ) throw Error('invalid file');

            if (file.size > 500000) throw Error('max size');
        } catch (err) {
            const errors = UploadErrors(err, file);
            return res.status(400).json({ errors });
        }

        fileName = posterId + Date.now() + '.jpg';
        await pipeline(
            file.stream,
            fs.createWriteStream(`${__dirname}/../client/public/uploads/posts/${fileName}`)
        );
    }


    const newPost = await PostModel.create({
        posterId,
        message,
        picture: fileName ? `./uploads/posts/${fileName}` : '',
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
    const id = req.params.id;
    // const posterId = req.body.posterId;
    if (!ObjectID.isValid(id)) return res.status(400).json({ message: "Id unknown: " + id });
    // if (!ObjectID.isValid(posterId)) return res.status(400).json({ message: "Id unknown: " + posterId });

    const updatedRecord = {
        message: req.body.message
    }
    try {
        const updatedPost = await PostModel.findByIdAndUpdate(
            id,
            { $set: updatedRecord },
            { new: true }
        );
        if (updatedPost) res.status(200).json(updatedPost);
        else return res.status(400).json({ message: 'Post unknown' });
    } catch (error) {
        return res.status(400).json({ error });
    }
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
module.exports.likePost = async (req, res) => {
    const id = req.params.id;
    const likerId = req.body.likerId;
    if (!ObjectID.isValid(id)) return res.status(400).json({ message: "Id unknown: " + id });
    if (!ObjectID.isValid(likerId)) return res.status(400).json({ message: "Id unknown: " + likerId });

    try {
        const updatedPost = await PostModel.findByIdAndUpdate(
            id,
            { $addToSet: { likers: likerId } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        const user = await UserModel.findByIdAndUpdate(
            likerId,
            { $addToSet: { likes: id } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        if (updatedPost && user) res.status(200).json({ updatedPost, user });
        else return res.status(400).json({ message: 'Post or User unknown' });

    } catch (error) {
        return res.status(400).json({ error });
    }
}
module.exports.unlikePost = async (req, res) => {
    const id = req.params.id;
    const likerId = req.body.likerId;
    if (!ObjectID.isValid(id)) return res.status(400).json({ message: "Id unknown: " + id });
    if (!ObjectID.isValid(likerId)) return res.status(400).json({ message: "Id unknown: " + likerId });

    try {
        const updatedPost = await PostModel.findByIdAndUpdate(
            id,
            { $pull: { likers: likerId } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        const user = await UserModel.findByIdAndUpdate(
            likerId,
            { $pull: { likes: id } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        if (updatedPost && user) res.status(200).json({ updatedPost, user });
        else return res.status(400).json({ message: 'Post or User unknown' });
    } catch (error) {
        return res.status(400).json({ error });
    }
}


module.exports.commentPost = async (req, res) => {
    const id = req.params.id;
    const { commenterId, commenterPseudo, text } = req.body
    if (!ObjectID.isValid(id)) return res.status(400).json({ message: "Post Id unknown: " + id });
    if (!ObjectID.isValid(commenterId)) return res.status(400).json({ message: "Commenter Id unknown: " + commenterId });

    try {
        const updatedPost = await PostModel.findByIdAndUpdate(
            id,
            {
                $push: {
                    comments: {
                        commenterId,
                        commenterPseudo,
                        text,
                        timestamp: new Date().getTime(),
                    }
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        if (updatedPost) res.status(200).json(updatedPost);
        else return res.status(400).json({ message: 'Post unknown' });
    } catch (error) {
        return res.status(400).json({ error });
    }
}
module.exports.editCommentPost = async (req, res) => {
    const id = req.params.id;
    const { commentId, text } = req.body
    if (!ObjectID.isValid(id)) return res.status(400).json({ message: "Post Id unknown: " + id });
    if (!ObjectID.isValid(commentId)) return res.status(400).json({ message: "Comment Id unknown: " + commentId });

    try {
        const post = await PostModel.findById(id);
        if (!post) res.status(400).json({ message: 'Post unknown' });

        const theComment = post.comments.find((comment) => comment._id.equals(commentId));
        if (!theComment) res.status(404).json({ message: 'Comment not found' });
        theComment.text = text;

        const save = await post.save();
        return res.status(200).json({ save });

    } catch (error) {
        return res.status(400).json({ error });
    }
}
module.exports.deleteCommentPost = async (req, res) => {
    const id = req.params.id;
    const { commentId } = req.body
    if (!ObjectID.isValid(id)) return res.status(400).json({ message: "Post Id unknown: " + id });
    if (!ObjectID.isValid(commentId)) return res.status(400).json({ message: "Comment Id unknown: " + commentId });

    try {
        const post = await PostModel.findByIdAndUpdate(
            id,
            {
                $pull: {
                    comments: {
                        _id: commentId
                    }
                }
            },
            { new: true }
        );
        if (!post) res.status(400).json({ message: 'Post unknown' });
        return res.status(200).json(post);
    } catch (error) {
        return res.status(400).json({ error });
    }
}