import React, { useState } from 'react';
import axios from 'axios';
import SignInForm from './SignInForm';

function SignUpForm() {
    const [formSubmit, SetFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const [pseudoError, setPseudoError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [controlPasswordError, setControlPasswordError] = useState('');
    const [controlTermsError, setControlTermsError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const terms = document.getElementById('terms');
        let go_to_bdd = true;
        setPseudoError('');
        setEmailError('');
        setPasswordError('');
        setControlPasswordError('');
        setControlTermsError('');

        if (password !== controlPassword) {
            setControlPasswordError('Les mots de passe ne correspondent pas');
            go_to_bdd = false;
        }
        if (!terms.checked) {
            setControlTermsError('Veuillez accepter les conditions générales');
            go_to_bdd = false;
        }

        if (go_to_bdd) {
            await axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}api/user/register`,
                data: {
                    pseudo,
                    email,
                    password
                }
            })
                .then((res) => {
                    console.log(res);
                    if (res.data.errors) {
                        setPseudoError(res.data.errors.pseudo);
                        setEmailError(res.data.errors.email);
                        setPasswordError(res.data.errors.password);
                    } else {
                        SetFormSubmit(true);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
        <>
            {formSubmit ? (
                <>
                    <SignInForm />
                    <span></span>
                    <h4 className='success'>Enregistrement réussi, veuillez-vous connecter</h4>
                </>
            ) : (
                <>
                    <form onSubmit={handleRegister} id="sign-up-form">
                        <label htmlFor="pseudo">Pseudo</label>
                        <br />
                        <input type="text" name='pseudo' id='pseudo' onChange={(e) => setPseudo(e.target.value)} value={pseudo} />
                        {pseudoError && <div className="pseudo error">{pseudoError}</div>}

                        <br />

                        <label htmlFor="email">Email</label>
                        <br />
                        <input type="email" name='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email} />
                        {emailError && <div className="email error">{emailError}</div>}

                        <br />

                        <label htmlFor="password">Mot de passe</label>
                        <br />
                        <input type="password" name='password' id='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                        {passwordError && <div className="password error">{passwordError}</div>}

                        <br />

                        <label htmlFor="controlPassword">Confirmer le mot de passe</label>
                        <br />
                        <input type="password" name='controlPassword' id='controlPassword' onChange={(e) => setControlPassword(e.target.value)} value={controlPassword} />
                        {controlPasswordError && <div className="controlPassword error">{controlPasswordError}</div>}

                        <br />
                        <input type="checkbox" name="terms" id="terms" />
                        <label htmlFor="terms">J'accepte les <a href="#" rel="noopener noreferrer">Conditions générales</a></label>
                        {controlTermsError && <div className="terms error">{controlTermsError}</div>}

                        <br />

                        <input type="submit" value="Valider l'inscription" />
                    </form>
                </>
            )}
        </>
    )
}
export default SignUpForm;