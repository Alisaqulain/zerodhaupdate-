import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './PortfolioChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PortfolioChart = ({ holdings }) => {
  const [timeRange, setTimeRange] = useState('1M');

  // Generate portfolio value over time
  const generatePortfolioData = () => {
    const days = timeRange === '1M' ? 30 : timeRange === '3M' ? 90 : 180;
    const labels = [];
    const values = [];
    
    const totalValue = holdings.reduce((sum, h) => sum + (h.price * h.qty), 0);
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }));
      
      // Simulate portfolio value with some variance
      const variance = (Math.random() * 0.1 - 0.05); // ±5% variance
      values.push(totalValue * (1 + variance));
    }
    
    return { labels, values };
  };

  const { labels, values } = generatePortfolioData();
  const currentValue = values[values.length - 1];
  const previousValue = values[0];
  const change = currentValue - previousValue;
  const changePercent = ((change / previousValue) * 100).toFixed(2);

  const data = {
    labels,
    datasets: [
      {
        label: 'Portfolio Value',
        data: values,
        borderColor: change >= 0 ? '#10b981' : '#ef4444',
        backgroundColor: change >= 0 
          ? 'rgba(16, 185, 129, 0.1)' 
          : 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index'
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'var(--card-bg)',
        titleColor: 'var(--text-color)',
        bodyColor: 'var(--text-color)',
        borderColor: 'var(--border-color)',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            return `Value: ₹${context.parsed.y.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: 'var(--text-secondary)',
          callback: function(value) {
            return '₹' + (value / 1000).toFixed(1) + 'k';
          }
        },
        grid: {
          color: 'var(--border-color)'
        }
      },
      x: {
        ticks: {
          color: 'var(--text-secondary)',
          maxTicksLimit: 8
        },
        grid: {
          display: false
        }
      }
    },
    animation: {
      duration: 1000
    }
  };

  return (
    <div className="portfolio-chart-container">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Portfolio Performance</h3>
          <div className="chart-value">
            <span className="value">₹{currentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            <span className={`change ${change >= 0 ? 'positive' : 'negative'}`}>
              {change >= 0 ? '+' : ''}{changePercent}%
            </span>
          </div>
        </div>
        <div className="time-range-selector">
          {['1M', '3M', '6M'].map(range => (
            <button
              key={range}
              className={`time-btn ${timeRange === range ? 'active' : ''}`}
              onClick={() => setTimeRange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      <div className="chart-wrapper">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default PortfolioChart;


