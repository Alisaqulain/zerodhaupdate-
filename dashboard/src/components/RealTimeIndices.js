import React, { useState, useEffect } from 'react';
import './RealTimeIndices.css';

const RealTimeIndices = () => {
  const [indices, setIndices] = useState([
    { name: 'NIFTY 50', value: 19850.25, change: 125.50, changePercent: 0.64, isUp: true },
    { name: 'SENSEX', value: 66275.75, change: 425.30, changePercent: 0.65, isUp: true },
    { name: 'BANK NIFTY', value: 45250.80, change: -125.40, changePercent: -0.28, isUp: false }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndices(prevIndices =>
        prevIndices.map(index => {
          // Simulate real-time updates
          const changePercent = (Math.random() * 0.02 - 0.01); // -1% to +1%
          const newValue = index.value * (1 + changePercent);
          const change = newValue - index.value;
          const isUp = change >= 0;

          return {
            ...index,
            value: parseFloat(newValue.toFixed(2)),
            change: parseFloat(Math.abs(change).toFixed(2)),
            changePercent: parseFloat((changePercent * 100).toFixed(2)),
            isUp
          };
        })
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="real-time-indices">
      {indices.map((index, idx) => (
        <div key={idx} className="index-card">
          <p className="index-name">{index.name}</p>
          <div className="index-value-container">
            <p className="index-value">{index.value.toLocaleString('en-IN')}</p>
            <div className={`index-change ${index.isUp ? 'up' : 'down'}`}>
              <span>{index.isUp ? '↑' : '↓'}</span>
              <span>{index.change.toFixed(2)}</span>
              <span>({index.changePercent > 0 ? '+' : ''}{index.changePercent}%)</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RealTimeIndices;


