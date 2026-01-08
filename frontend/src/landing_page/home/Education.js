import React from "react";

function Education() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Education Image */}
        <div className="col-12 col-md-6 text-center">
          <img
            src="/media/images/education.svg"
            alt="Education"
            className="img-fluid"
            style={{ maxWidth: "90%" }}
          />
        </div>

        {/* Education Content */}
        <div className="col-12 col-md-6 p-4">
          <h1 className="mb-4 fw-bold">
            Free and open market <br /> education
          </h1>
          <p>
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>
          <a href="#" className="text-decoration-none fw-bold">
            Varsity <i className="fa fa-arrow-right" aria-hidden="true"></i>
          </a>

          <p className="mt-4">
            TradingQ&A, the most active trading and investment community in
            India for all your market-related queries.
          </p>
          <a href="#" className="text-decoration-none fw-bold">
            TradingQ&A <i className="fa fa-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Education;
