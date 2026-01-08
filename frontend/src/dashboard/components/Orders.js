import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/orders`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load orders");
        setLoading(false);
      });
  }, []);

  return (
    <div className="orders">
      <h2 className="title">Your Orders</h2>

      {loading && <p>Loading orders...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && orders.length === 0 && (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
          <Link to="/dashboard" className="btn">
            Place an Order
          </Link>
        </div>
      )}

      {!loading && orders.length > 0 && (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id?.substring(0, 8) || 'N/A'}</td>
                  <td>{order.name || 'N/A'}</td>
                  <td>{order.qty || 0}</td>
                  <td>₹{order.price?.toFixed(2) || '0.00'}</td>
                  <td>₹{((order.price || 0) * (order.qty || 0)).toFixed(2)}</td>
                  <td className={order.mode === "BUY" ? "profit" : "loss"}>
                    {order.mode || 'PENDING'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Link to="/dashboard" className="btn place-order">
        Place New Order
      </Link>
    </div>
  );
};

export default Orders;