import { useState, useEffect } from 'react';

// Simulate real-time price updates
const useRealTimePrices = (stocks) => {
  const [prices, setPrices] = useState(stocks);

  useEffect(() => {
    if (!stocks || stocks.length === 0) return;

    const interval = setInterval(() => {
      setPrices(prevPrices => 
        prevPrices.map(stock => {
          // Simulate price changes (±0.5% to ±2%)
          const changePercent = (Math.random() * 0.03 - 0.015); // -1.5% to +1.5%
          const newPrice = stock.price * (1 + changePercent);
          const oldPrice = stock.price;
          const isDown = newPrice < oldPrice;
          const percentChange = ((newPrice - oldPrice) / oldPrice * 100).toFixed(2);
          
          return {
            ...stock,
            price: parseFloat(newPrice.toFixed(2)),
            isDown,
            percent: `${isDown ? '' : '+'}${percentChange}%`,
            lastUpdate: new Date()
          };
        })
      );
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [stocks]);

  return prices;
};

export default useRealTimePrices;


