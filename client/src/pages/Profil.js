import React, { useContext } from 'react';
import Log from '../components/Log';
import { UidContext } from '../components/AppContext';

function Profil() {
  const uid = useContext(UidContext);

  return(
    <div className="profil-page">
      <div className="log-container">
        {!uid ? (
          <>
            <Log signin={false} signup={true} />
            <div className="img-container">
              <img src="./img/log.svg" alt="img log" />
            </div>
          </>
        ) : (
          <>
            <h1>Hello darling {uid}</h1>
          </>
        )}
        
      </div>
    </div>
 )
}
export default Profil;