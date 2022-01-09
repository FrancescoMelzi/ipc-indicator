import React, { PureComponent, useEffect, useState } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { IPCType } from '../../types/IPCIndicator.types';

import './Graph.css';

const Graph = ({ data } : {data: Array<IPCType>}) => {

  const [ipcdata, setIpcdata] = useState(data);

  useEffect(() => {
    setIpcdata(data)
    console.log(ipcdata)
  }, [data]);

  const CustomizedAxisTick = (props: any) => {
    const { x, y, payload } = props;
  
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
        >
          {new Date(payload.value).toLocaleTimeString()}
        </text>
      </g>
    );
  };

  return (
    <div>
      <ComposedChart
        width={9500}
        height={400}
        data={ipcdata}
        margin={{
          top: 20,
          right: 80,
          bottom: 20,
          left: 120,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis
          dataKey="date"
          label={{ value: 'Date', position: 'insideBottomRight', offset: 0 }}
          scale="band"
          tick={<CustomizedAxisTick />}
        />
        <YAxis label={{ value: 'Price', angle: -90, position: 'insideLeft', offset: -70 }} />
        <Tooltip />
        <Legend />
        {/* <Area type="monotone" dataKey="percentageChange" fill="#8884d8" stroke="#8884d8" /> */}
        <Bar dataKey="volume" barSize={15} fill="#413ea0" />
        <Line type="monotone" dataKey="change" stroke="#ff7300" />
      </ComposedChart>
    </div>
  );
}

export default Graph;
