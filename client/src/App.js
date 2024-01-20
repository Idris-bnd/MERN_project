import { useEffect, useState } from 'react';
import { UidContext } from './components/AppContext';
import Routes from './components/Routes/index'
import axios from 'axios';

function App() {
  const [uid, SetUid] = useState(null);

  useEffect(() => {
    const fetchToken = async() => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
      .then((res) =>{
        console.log(res);
        SetUid(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log('no token');
      });
    }
    fetchToken();
    console.log(uid);
  }, []);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
}

export default App;
