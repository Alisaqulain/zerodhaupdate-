import React, { useState, useEffect } from 'react';
import { Lightbulb, TrendingUp, TrendingDown, AlertCircle } from '@mui/icons-material';
import './AIInsights.css';

const AIInsights = ({ holdings, watchlist }) => {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    // Generate AI-like insights based on portfolio data
    const generateInsights = () => {
      const newInsights = [];

      if (holdings && holdings.length > 0) {
        // Calculate portfolio performance
        const totalInvestment = holdings.reduce((sum, h) => sum + (h.avg * h.qty), 0);
        const currentValue = holdings.reduce((sum, h) => sum + (h.price * h.qty), 0);
        const profitLoss = currentValue - totalInvestment;
        const profitPercent = ((profitLoss / totalInvestment) * 100).toFixed(2);

        if (profitPercent > 5) {
          newInsights.push({
            type: 'success',
            icon: <TrendingUp />,
            title: 'Strong Portfolio Performance',
            message: `Your portfolio is up ${profitPercent}%. Consider taking partial profits on high-performing stocks.`,
            priority: 'high'
          });
        } else if (profitPercent < -3) {
          newInsights.push({
            type: 'warning',
            icon: <TrendingDown />,
            title: 'Portfolio Underperformance',
            message: `Your portfolio is down ${Math.abs(profitPercent)}%. Review your holdings and consider rebalancing.`,
            priority: 'high'
          });
        }

        // Diversification check
        if (holdings.length < 5) {
          newInsights.push({
            type: 'info',
            icon: <Lightbulb />,
            title: 'Diversification Opportunity',
            message: 'Consider diversifying your portfolio across more sectors to reduce risk.',
            priority: 'medium'
          });
        }

        // High concentration warning
        const topHolding = holdings.reduce((max, h) => 
          (h.price * h.qty) > (max.price * max.qty) ? h : max, holdings[0]
        );
        const topHoldingPercent = ((topHolding.price * topHolding.qty / currentValue) * 100).toFixed(1);
        
        if (topHoldingPercent > 30) {
          newInsights.push({
            type: 'warning',
            icon: <AlertCircle />,
            title: 'High Concentration Risk',
            message: `${topHolding.name} represents ${topHoldingPercent}% of your portfolio. Consider reducing exposure.`,
            priority: 'medium'
          });
        }
      }

      // Market timing insights
      if (watchlist && watchlist.length > 0) {
        const upStocks = watchlist.filter(s => !s.isDown).length;
        const marketSentiment = (upStocks / watchlist.length) * 100;

        if (marketSentiment > 70) {
          newInsights.push({
            type: 'info',
            icon: <TrendingUp />,
            title: 'Bullish Market Sentiment',
            message: `${marketSentiment.toFixed(0)}% of your watchlist stocks are trending up. Good time to review entry points.`,
            priority: 'low'
          });
        }
      }

      setInsights(newInsights.slice(0, 5)); // Limit to 5 insights
    };

    generateInsights();
    const interval = setInterval(generateInsights, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [holdings, watchlist]);

  if (insights.length === 0) {
    return null;
  }

  return (
    <div className="ai-insights">
      <h3 className="insights-title">
        <Lightbulb className="title-icon" />
        AI Portfolio Insights
      </h3>
      <div className="insights-list">
        {insights.map((insight, index) => (
          <div key={index} className={`insight-card ${insight.type} priority-${insight.priority}`}>
            <div className="insight-icon">{insight.icon}</div>
            <div className="insight-content">
              <h4 className="insight-title">{insight.title}</h4>
              <p className="insight-message">{insight.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsights;


