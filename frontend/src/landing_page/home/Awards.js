import React from "react";

function Awards() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Award Image */}
        <div className="col-12 col-md-6 text-center">
          <img
            src="/media/images/largestBroker.svg"
            alt="Award"
            className="img-fluid"
            style={{ maxWidth: "80%" }}
          />
        </div>

        {/* Award Content */}
        <div className="col-12 col-md-6 p-4">
          <h1 className="fw-bold">Largest Stock Broker in India</h1>
          <p className="mb-4">
            2+ million Zerodha clients contribute to over 15% of all volumes in
            India daily by trading and investing in:
          </p>

          {/* List Section */}
          <div className="row">
            <div className="col-6">
              <ul className="list-unstyled">
                <li>📌 Features and options</li>
                <li>📌 Commodity derivatives</li>
                <li>📌 Currency derivatives</li>
              </ul>
            </div>
            <div className="col-6">
              <ul className="list-unstyled">
                <li>📌 Stocks & IPOs</li>
                <li>📌 Direct mutual funds</li>
                <li>📌 Bonds and Govt. Securities</li>
              </ul>
            </div>
          </div>

          {/* Press Logos Image */}
          <div className="text-center mt-4">
            <img
              src="/media/images/pressLogos.png"
              alt="Press Logos"
              className="img-fluid"
              style={{ maxWidth: "90%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Awards;
