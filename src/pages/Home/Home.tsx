import React, { useEffect } from 'react';
import { IPCIndicator } from '../../services/IPCIndicator/IPCIndicator.service';
import './Home.css';

function Home() {

  useEffect(() => {
    IPCIndicator.get()
    .then(response => response.json())
    .then((response) => {
      console.log('response')
      console.log(response)
    }).catch((err) => {
      console.log('err');
      console.log(err);
    });
  }, []);

  return (
    <div className="App">
      <h1>Home</h1>
    </div>
  );
}

export default Home;
