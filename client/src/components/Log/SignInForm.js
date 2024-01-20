import React, { useState } from 'react';
import axios from 'axios';

function SignInForm() {
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials: true,
            data: {
                email,
                password,
            },
        })
            .then((res) => {
                console.log(res);
                if (res.data.errors) {
                    setEmailError(res.data.errors.email);
                    setPasswordError(res.data.errors.password);
                } else {
                    window.location = '/';
                }
            })
            .catch((err) => {
                console.log(err);
                if (err.response.data.errors) {
                    setEmailError(err.response.data.errors.email);
                    setPasswordError(err.response.data.errors.password);
                }
            });
    }

    return (
        <form action="" onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <br />
            <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div className="email error">{emailError}</div>
            <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="password error">{passwordError}</div>

            <br />
            <input type="submit" value="Se connecter" />
        </form>
    )
}
export default SignInForm;