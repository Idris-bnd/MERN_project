import { useEffect, useState } from 'react';
import { UidContext } from './components/AppContext';
import Routes from './components/Routes/index'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';

function App() {
  const [uid, SetUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          SetUid(res.data);
        })
        .catch((err) => {
          console.log({ msg: 'no token', error: err });
        });
    }
   fetchToken();


    if (uid) dispatch(getUser(uid));
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
}

export default App;
