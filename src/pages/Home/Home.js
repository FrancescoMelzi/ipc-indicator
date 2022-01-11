import React, { useEffect, useState } from 'react';
import Graph from '../../components/Graph/Graph';
import { IPCIndicator } from '../../services/IPCIndicator/IPCIndicator.service';
import './Home.css';

function Home() {

  const [ipcData, setIpcData] = useState([]);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    IPCIndicator.get()
    .then(response => response.json())
    .then((response) => {
      response.forEach(element => {
        element.date = new Date(element.date)
      })
      setIpcData(response);
      setShowChart(true)
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div className="Home">
      <h1>IPC Indicator</h1>
      {
        showChart && (
          <div className='graph'>
            <Graph type="hybrid" data={ipcData} width={800} />
          </div>
        )
      }
    </div>
  );
}

export default Home;
