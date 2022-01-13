import React, { useEffect, useState } from 'react';
import { IPCType } from '../../types/IPCIndicator.types';
import { IPCIndicator } from '../../services/IPCIndicator/IPCIndicator.service';

import Graph from '../../components/Graph/Graph';
import './Home.css';

/**
 * Home component.
 */
const Home = () => {

  const [ipcData, setIpcData] = useState([]);
  const [showChart, setShowChart] = useState(false);
  /**
   * Get data to populate the database.
   */
  useEffect(() => {
    IPCIndicator.get()
    .then(response => response.json())
    .then((response) => {
      response.forEach((element: IPCType) => {
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
