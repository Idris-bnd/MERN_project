const UserModel = require('../models/user.model');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const { UploadErrors } = require('../utils/errors.utils');

module.exports.uploadProfil = async (req, res) => {
    const file = req.file;
    const { userId, pseudo } = req.body;

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

    const fileName = `${pseudo}.jpg`;
    const chemin = `${__dirname}/../client/public/uploads/profil/${fileName}`;
    await pipeline(
        file.stream,
        fs.createWriteStream(chemin)
    );


    try {
        const user = await UserModel.findByIdAndUpdate(
            userId,
            { $set: { picture: `./uploads/profil/${fileName}` } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        if (user._id) return res.status(200).json(user);
        return res.status(400).json({ message: 'error' });
    } catch (error) {
        return res.status(400).json({ message: 'error', error: error });
    }
}