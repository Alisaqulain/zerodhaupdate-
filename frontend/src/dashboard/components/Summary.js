import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import API_BASE_URL from "../config/api";
import AIInsights from "./AIInsights";
import PortfolioChart from "./PortfolioChart";

const Summary = () => {
  const { user } = useContext(AuthContext);
  const [holdings, setHoldings] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // Fetch holdings for AI insights
    axios.get(`${API_BASE_URL}/allHoldings`)
      .then(res => setHoldings(res.data))
      .catch(err => console.error("Error fetching holdings:", err));
  }, []);

  return (
    <>
      <div className="username">
        <h6>Hi, {user?.name || 'User'}!</h6>
        <hr className="divider" />
      </div>

      <AIInsights holdings={holdings} watchlist={watchlist} />

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>3.74k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            {holdings.length > 0 ? (
              <>
                {(() => {
                  const totalInvestment = holdings.reduce((sum, h) => sum + (h.avg * h.qty), 0);
                  const currentValue = holdings.reduce((sum, h) => sum + (h.price * h.qty), 0);
                  const profitLoss = currentValue - totalInvestment;
                  const profitPercent = ((profitLoss / totalInvestment) * 100).toFixed(2);
                  const isProfit = profitLoss >= 0;
                  
                  return (
                    <h3 className={isProfit ? "profit" : "loss"}>
                      ₹{(Math.abs(profitLoss) / 1000).toFixed(2)}k <small>{isProfit ? '+' : ''}{profitPercent}%</small>
                    </h3>
                  );
                })()}
              </>
            ) : (
              <h3 className="profit">0.00k <small>+0.00%</small></h3>
            )}
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            {holdings.length > 0 ? (
              <>
                {(() => {
                  const currentValue = holdings.reduce((sum, h) => sum + (h.price * h.qty), 0);
                  const totalInvestment = holdings.reduce((sum, h) => sum + (h.avg * h.qty), 0);
                  
                  return (
                    <>
                      <p>
                        Current Value <span>₹{(currentValue / 1000).toFixed(2)}k</span>
                      </p>
                      <p>
                        Investment <span>₹{(totalInvestment / 1000).toFixed(2)}k</span>
                      </p>
                    </>
                  );
                })()}
              </>
            ) : (
              <>
                <p>Current Value <span>₹0.00k</span></p>
                <p>Investment <span>₹0.00k</span></p>
              </>
            )}
          </div>
        </div>
        <hr className="divider" />
      </div>

      {holdings.length > 0 && <PortfolioChart holdings={holdings} />}
    </>
  );
};

export default Summary;