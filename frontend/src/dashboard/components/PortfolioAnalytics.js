import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { TrendingUp, TrendingDown, BarChart, PieChart } from '@mui/icons-material';
import './PortfolioAnalytics.css';

const PortfolioAnalytics = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('token');
    
    axios.get(`${API_BASE_URL}/portfolio/analytics`, {
      headers: { Authorization: token }
    })
    .then(res => {
      setAnalytics(res.data);
      setLoading(false);
    })
    .catch(err => {
      setError('Failed to load analytics');
      setLoading(false);
      console.error(err);
    });
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="analytics-container">
        <p>Please login to view portfolio analytics</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="analytics-container">
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="analytics-container">
        <p className="error">{error || 'No data available'}</p>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <BarChart className="header-icon" />
        <h2>Portfolio Analytics</h2>
      </div>

      {/* Overall Summary */}
      <div className="analytics-summary">
        <div className="summary-card total">
          <h3>Total Portfolio</h3>
          <div className="summary-value">
            <span className="amount">₹{parseFloat(analytics.overall.totalValue).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            <span className={`return ${parseFloat(analytics.overall.totalReturn) >= 0 ? 'positive' : 'negative'}`}>
              {parseFloat(analytics.overall.totalReturn) >= 0 ? '+' : ''}{analytics.overall.totalReturn}%
            </span>
          </div>
          <div className="summary-details">
            <p>Investment: ₹{parseFloat(analytics.overall.totalInvestment).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            <p className={`pnl ${parseFloat(analytics.overall.totalProfitLoss) >= 0 ? 'profit' : 'loss'}`}>
              P&L: ₹{parseFloat(analytics.overall.totalProfitLoss).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        <div className="summary-card holdings">
          <h3>Holdings</h3>
          <div className="summary-value">
            <span className="amount">₹{parseFloat(analytics.holdings.currentValue).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            <span className={`return ${parseFloat(analytics.holdings.returnPercent) >= 0 ? 'positive' : 'negative'}`}>
              {parseFloat(analytics.holdings.returnPercent) >= 0 ? '+' : ''}{analytics.holdings.returnPercent}%
            </span>
          </div>
          <div className="summary-details">
            <p>Count: {analytics.holdings.count} stocks</p>
            <p className={`pnl ${parseFloat(analytics.holdings.profitLoss) >= 0 ? 'profit' : 'loss'}`}>
              P&L: ₹{parseFloat(analytics.holdings.profitLoss).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        <div className="summary-card positions">
          <h3>Positions</h3>
          <div className="summary-value">
            <span className="amount">₹{parseFloat(analytics.positions.currentValue).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            <span className={`return ${parseFloat(analytics.positions.returnPercent) >= 0 ? 'positive' : 'negative'}`}>
              {parseFloat(analytics.positions.returnPercent) >= 0 ? '+' : ''}{analytics.positions.returnPercent}%
            </span>
          </div>
          <div className="summary-details">
            <p>Count: {analytics.positions.count} positions</p>
            <p className={`pnl ${parseFloat(analytics.positions.profitLoss) >= 0 ? 'profit' : 'loss'}`}>
              P&L: ₹{parseFloat(analytics.positions.profitLoss).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>
      </div>

      {/* Top Performers */}
      {analytics.topPerformers && analytics.topPerformers.length > 0 && (
        <div className="performers-section">
          <div className="performers-card top">
            <h3><TrendingUp className="icon" /> Top Performers</h3>
            <div className="performers-list">
              {analytics.topPerformers.map((stock, index) => (
                <div key={index} className="performer-item">
                  <span className="symbol">{stock.symbol}</span>
                  <span className="return positive">+{stock.return}%</span>
                  <span className="profit">₹{parseFloat(stock.profit).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
              ))}
            </div>
          </div>

          {analytics.worstPerformers && analytics.worstPerformers.length > 0 && (
            <div className="performers-card worst">
              <h3><TrendingDown className="icon" /> Underperformers</h3>
              <div className="performers-list">
                {analytics.worstPerformers.map((stock, index) => (
                  <div key={index} className="performer-item">
                    <span className="symbol">{stock.symbol}</span>
                    <span className="return negative">{stock.return}%</span>
                    <span className="loss">₹{parseFloat(Math.abs(stock.loss)).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PortfolioAnalytics;

