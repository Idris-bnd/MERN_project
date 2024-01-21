import React from 'react';
import LeftNav from '../components/LeftNav'
import Thread from '../components/Thread';


function Home() {
  const hello = '';

  return (
    <div className="home">
      <LeftNav />
      <div className="mail">
        <Thread />
      </div>
    </div>
  )
}
export default Home;