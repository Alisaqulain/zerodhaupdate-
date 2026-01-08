import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { Notifications, Add, Delete, CheckCircle, Cancel } from '@mui/icons-material';
import StockSearch from './StockSearch';
import './PriceAlerts.css';

const PriceAlerts = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    symbol: '',
    name: '',
    targetPrice: '',
    condition: 'above',
    currentPrice: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchAlerts();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchAlerts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/alerts`, {
        headers: { Authorization: token }
      });
      setAlerts(res.data);
    } catch (err) {
      console.error('Failed to fetch alerts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStockSelect = (stock) => {
    setFormData({
      ...formData,
      symbol: stock.symbol,
      name: stock.name,
      currentPrice: stock.price
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.symbol || !formData.targetPrice) {
      alert('Please fill all required fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE_URL}/alerts/create`, formData, {
        headers: { Authorization: token }
      });
      
      setFormData({
        symbol: '',
        name: '',
        targetPrice: '',
        condition: 'above',
        currentPrice: ''
      });
      setShowForm(false);
      fetchAlerts();
    } catch (err) {
      alert('Failed to create alert: ' + (err.response?.data?.msg || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this alert?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/alerts/delete/${id}`, {
        headers: { Authorization: token }
      });
      fetchAlerts();
    } catch (err) {
      alert('Failed to delete alert');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="alerts-container">
        <p>Please login to manage price alerts</p>
      </div>
    );
  }

  return (
    <div className="alerts-container">
      <div className="alerts-header">
        <Notifications className="header-icon" />
        <h2>Price Alerts</h2>
        <button className="add-alert-btn" onClick={() => setShowForm(!showForm)}>
          <Add /> {showForm ? 'Cancel' : 'New Alert'}
        </button>
      </div>

      {showForm && (
        <div className="alert-form-container">
          <form onSubmit={handleSubmit} className="alert-form">
            <h3>Create Price Alert</h3>
            
            <div className="form-group">
              <label>Search Stock</label>
              <StockSearch onAddToWatchlist={handleStockSelect} />
            </div>

            {formData.symbol && (
              <>
                <div className="form-group">
                  <label>Stock</label>
                  <div className="selected-stock">
                    <span>{formData.symbol}</span>
                    <span className="stock-name">{formData.name}</span>
                    <span className="stock-price">₹{formData.currentPrice}</span>
                  </div>
                </div>

                <div className="form-group">
                  <label>Target Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.targetPrice}
                    onChange={(e) => setFormData({ ...formData, targetPrice: e.target.value })}
                    required
                    placeholder="Enter target price"
                  />
                </div>

                <div className="form-group">
                  <label>Alert When Price</label>
                  <div className="condition-buttons">
                    <button
                      type="button"
                      className={`condition-btn ${formData.condition === 'above' ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, condition: 'above' })}
                    >
                      Goes Above
                    </button>
                    <button
                      type="button"
                      className={`condition-btn ${formData.condition === 'below' ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, condition: 'below' })}
                    >
                      Goes Below
                    </button>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">Create Alert</button>
                  <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                    Cancel
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      )}

      {loading ? (
        <p>Loading alerts...</p>
      ) : alerts.length === 0 ? (
        <div className="no-alerts">
          <Notifications className="no-alerts-icon" />
          <p>No price alerts set</p>
          <p className="hint">Create alerts to get notified when stocks reach your target price</p>
        </div>
      ) : (
        <div className="alerts-list">
          {alerts.map(alert => (
            <div key={alert._id} className={`alert-card ${alert.isTriggered ? 'triggered' : ''}`}>
              <div className="alert-header">
                <div className="alert-stock">
                  <span className="alert-symbol">{alert.symbol}</span>
                  <span className="alert-name">{alert.name}</span>
                </div>
                {alert.isTriggered ? (
                  <span className="triggered-badge">
                    <CheckCircle /> Triggered
                  </span>
                ) : (
                  <span className="active-badge">Active</span>
                )}
              </div>
              
              <div className="alert-details">
                <div className="alert-condition">
                  <span>Alert when price goes</span>
                  <span className={`condition ${alert.condition}`}>
                    {alert.condition === 'above' ? '↑ Above' : '↓ Below'}
                  </span>
                  <span className="target-price">₹{alert.targetPrice}</span>
                </div>
                <div className="alert-price">
                  <span>Current: ₹{alert.currentPrice}</span>
                  {!alert.isTriggered && (
                    <span className="price-diff">
                      {alert.condition === 'above' 
                        ? `${((alert.targetPrice - alert.currentPrice) / alert.currentPrice * 100).toFixed(2)}% away`
                        : `${((alert.currentPrice - alert.targetPrice) / alert.currentPrice * 100).toFixed(2)}% away`
                      }
                    </span>
                  )}
                </div>
                {alert.isTriggered && alert.triggeredAt && (
                  <div className="triggered-time">
                    Triggered: {new Date(alert.triggeredAt).toLocaleString()}
                  </div>
                )}
              </div>

              <div className="alert-actions">
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(alert._id)}
                >
                  <Delete /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PriceAlerts;

