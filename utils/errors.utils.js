module.exports.SignUpErrors = (err) => {
    const errors = { pseudo: '', email: '', password: '' };

    if (err.message.includes('pseudo'))
        errors.pseudo = "Pseudo incorrect";

    if (err.message.includes('email'))
        errors.email = "Email incorrect";

    if (err.message.includes('password'))
        errors.password = "Le mot de passe incorrect doit faire au moins 6 caractères";

    if (err.message.includes('pseudo') && err.code == 11000)
        errors.pseudo = "Ce pseudo est déjà utilisé";

    if (err.message.includes('email') && err.code == 11000)
        errors.email = "Cet email est déjà enregistré";

    return errors;
}
module.exports.SignInErrors = (err) => {
    const errors = { email: '', password: '' };


    if (err.message.includes('email'))
        errors.email = "Email inconnu";

    if (err.message.includes('password'))
        errors.password = "Le mot de passe ne correspond pas";

    return errors;
}
module.exports.UploadErrors = (err, file) => {
    const errors = { format: '', maxSize: '', err: err.message, file:file };

    if (err.message.includes('invalid file')) errors.format = 'Format incompatible';
    if (err.message.includes('max size')) errors.maxSize = 'Le fichier dépasse 500ko';

    return errors;
}