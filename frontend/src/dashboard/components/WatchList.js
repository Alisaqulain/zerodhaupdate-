import React, { useState, useContext, useEffect } from "react";
import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";
import { BarChartOutlined, KeyboardArrowDown, KeyboardArrowUp, MoreHoriz } from "@mui/icons-material";
import { watchlist as initialWatchlist } from "../../dashboard/data/data";  
import { DoughnutChart } from "./DoughnutChart"; 
import useRealTimePrices from "../hooks/useRealTimePrices";

const WatchList = () => {
  const [watchlist, setWatchlist] = useState(initialWatchlist);
  const realTimePrices = useRealTimePrices(watchlist);

  useEffect(() => {
    setWatchlist(realTimePrices);
  }, [realTimePrices]);

  const labels = watchlist?.map((stock) => stock.name) || [];

  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: watchlist?.map((stock) => stock.price) || [],
        backgroundColor: [
          "rgba(65, 132, 243, 0.6)",
          "rgba(16, 185, 129, 0.6)",
          "rgba(245, 158, 11, 0.6)",
          "rgba(139, 92, 246, 0.6)",
          "rgba(236, 72, 153, 0.6)",
          "rgba(59, 130, 246, 0.6)",
        ],
        borderColor: [
          "rgba(65, 132, 243, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(139, 92, 246, 1)",
          "rgba(236, 72, 153, 1)",
          "rgba(59, 130, 246, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg: infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist?.length || 0} / 50</span>
      </div>

      <ul className="list">
        {watchlist?.length > 0 ? (
          watchlist.map((stock, index) => <WatchListItem stock={stock} key={index} />)
        ) : (
          <p>No stocks found.</p> // ✅ Prevents mapping on undefined
        )}
      </ul>

      <DoughnutChart data={data} />
    </div>
  );
};

export default WatchList;

// ✅ Individual Watchlist Item Component
const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowWatchlistActions(true)}
      onMouseLeave={() => setShowWatchlistActions(false)}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? <KeyboardArrowDown className="down" /> : <KeyboardArrowUp className="up" />}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {showWatchlistActions && <WatchListActions uid={stock.name} />}
    </li>
  );
};

// ✅ Watchlist Actions (Buy, Sell, More)
const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  return (
    <span className="actions">
      <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
        <button className="buy" onClick={() => generalContext.openBuyWindow(uid)}>Buy</button>
      </Tooltip>
      <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
        <button className="sell">Sell</button>
      </Tooltip>
      <Tooltip title="Analytics (A)" placement="top" arrow TransitionComponent={Grow}>
        <button className="action">
          <BarChartOutlined className="icon" />
        </button>
      </Tooltip>
      <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
        <button className="action">
          <MoreHoriz className="icon" />
        </button>
      </Tooltip>
    </span>
  );
};