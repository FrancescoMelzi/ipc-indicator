import React, { useEffect, useState } from 'react';
import Graph from '../../components/Graph/Graph';
import { IPCIndicator } from '../../services/IPCIndicator/IPCIndicator.service';
import './Home.css';

function Home() {

  const [ipcData, setIpcData] = useState([]);

  useEffect(() => {
    IPCIndicator.get()
    .then(response => response.json())
    .then((response) => {
      console.log('response')
      console.log(response)
      setIpcData(response);
    }).catch((err) => {
      console.log('err');
      console.log(err);
    });
  }, []);

  return (
    <div className="App">
      <h1>Home</h1>
      <Graph data={ipcData} />
      <h2>aa</h2>
{/*Consider X as the Time axis and Y as the Price axis. */}
    </div>
  );
}

export default Home;
