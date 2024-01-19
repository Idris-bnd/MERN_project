module.exports.SignUpErrors = (err) => {
    const errors = { pseudo: '', email: '', password: '' };

    if (err.message.includes('pseudo'))
        errors.pseudo = "Pseudo incorrect ou déjà mis";

    if (err.message.includes('email'))
        errors.email = "Email incorrect";

    if (err.message.includes('password'))
        errors.password = "Le mot de passe incorrect doit faire au moins 6 caractères";

    if (err.message.includes('pseudo') && err.code == 11000)
        errors.pseudo = "Ce pseudo est déjà enregistré";

    if (err.message.includes('email') && err.code == 11000)
        errors.email = "Cet email est déjà enregistré";

    return errors;
}