import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import StockSearch from './StockSearch';
import { Delete, TrendingUp, TrendingDown } from '@mui/icons-material';
import './WatchlistManager.css';

const WatchlistManager = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchWatchlist();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchWatchlist = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/watchlist`, {
        headers: { Authorization: token }
      });
      setWatchlist(res.data);
    } catch (err) {
      console.error('Failed to fetch watchlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWatchlist = async (stock) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE_URL}/watchlist/add`, {
        symbol: stock.symbol,
        name: stock.name,
        price: stock.price
      }, {
        headers: { Authorization: token }
      });
      fetchWatchlist();
    } catch (err) {
      alert('Failed to add to watchlist: ' + (err.response?.data?.msg || err.message));
    }
  };

  const handleRemove = async (symbol) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/watchlist/remove/${symbol}`, {
        headers: { Authorization: token }
      });
      fetchWatchlist();
    } catch (err) {
      alert('Failed to remove from watchlist');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="watchlist-manager">
        <p>Please login to manage your watchlist</p>
      </div>
    );
  }

  return (
    <div className="watchlist-manager">
      <div className="watchlist-header">
        <h2>My Watchlist</h2>
        <span className="watchlist-count">{watchlist.length} stocks</span>
      </div>

      <div className="search-section">
        <StockSearch 
          onAddToWatchlist={handleAddToWatchlist}
          watchlist={watchlist}
        />
      </div>

      {loading ? (
        <p>Loading watchlist...</p>
      ) : watchlist.length === 0 ? (
        <div className="empty-watchlist">
          <p>Your watchlist is empty</p>
          <p className="hint">Search and add stocks to your watchlist</p>
        </div>
      ) : (
        <div className="watchlist-items">
          {watchlist.map((item) => (
            <div key={item._id} className="watchlist-item">
              <div className="item-info">
                <div className="item-symbol">{item.symbol}</div>
                <div className="item-name">{item.name}</div>
              </div>
              <div className="item-price">
                <div className="price-value">₹{item.price.toLocaleString('en-IN')}</div>
                {item.change !== undefined && (
                  <div className={`price-change ${item.change >= 0 ? 'positive' : 'negative'}`}>
                    {item.change >= 0 ? <TrendingUp /> : <TrendingDown />}
                    <span>{item.change >= 0 ? '+' : ''}{item.change?.toFixed(2)}</span>
                    <span>({item.changePercent >= 0 ? '+' : ''}{item.changePercent?.toFixed(2)}%)</span>
                  </div>
                )}
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemove(item.symbol)}
                title="Remove from watchlist"
              >
                <Delete />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistManager;

