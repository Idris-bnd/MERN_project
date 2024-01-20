import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';


function Log(props) {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignUpModal(true);
      setSignInModal(false);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  }

  return(
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li id='register' onClick={handleModals} className={signUpModal ? 'active-btn' : ''}>S'inscrire</li>
          <li id='login' onClick={handleModals} className={signInModal ? 'active-btn' : ''}>Se connecter</li>
        </ul>
        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
      </div>
    </div>
 )
}
export default Log;