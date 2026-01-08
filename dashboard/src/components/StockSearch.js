import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { Search, Add, Close } from '@mui/icons-material';
import './StockSearch.css';

const StockSearch = ({ onAddToWatchlist, watchlist }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (query.length < 1) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const searchStocks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/stocks/search`, {
          params: { query }
        });
        setResults(res.data);
        setShowResults(true);
      } catch (err) {
        console.error('Search error:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchStocks, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleAddToWatchlist = (stock) => {
    if (onAddToWatchlist) {
      onAddToWatchlist(stock);
    }
    setQuery('');
    setShowResults(false);
  };

  const isInWatchlist = (symbol) => {
    return watchlist?.some(item => item.symbol === symbol);
  };

  return (
    <div className="stock-search-container">
      <div className="search-input-wrapper">
        <Search className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search stocks (e.g., RELIANCE, TCS, INFY)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 0 && setShowResults(true)}
        />
        {query && (
          <button
            className="clear-btn"
            onClick={() => {
              setQuery('');
              setShowResults(false);
            }}
          >
            <Close />
          </button>
        )}
      </div>

      {showResults && (
        <div className="search-results">
          {loading ? (
            <div className="search-loading">Searching...</div>
          ) : results.length > 0 ? (
            <div className="results-list">
              {results.map((stock, index) => (
                <div key={index} className="result-item">
                  <div className="result-info">
                    <span className="result-symbol">{stock.symbol}</span>
                    <span className="result-name">{stock.name}</span>
                    <span className="result-price">₹{stock.price.toLocaleString('en-IN')}</span>
                  </div>
                  {isInWatchlist(stock.symbol) ? (
                    <span className="in-watchlist">In Watchlist</span>
                  ) : (
                    <button
                      className="add-btn"
                      onClick={() => handleAddToWatchlist(stock)}
                    >
                      <Add /> Add
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : query.length > 0 ? (
            <div className="no-results">No stocks found</div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default StockSearch;

