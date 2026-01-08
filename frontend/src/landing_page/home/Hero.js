import React from "react";

function Hero() {
  return (
    <div className="container p-5 mb-5 text-center">
      <div className="row justify-content-center">
        <div className="col-12">
          {/* Hero Image */}
          <img
            src="/media/images/homeHero.png"
            alt="Hero Image"
            className="img-fluid mb-4"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        {/* Hero Content */}
        <div className="col-12">
          <h1 className="mt-3 fw-bold">Invest in everything</h1>
          <p className="fs-5">
            Online platform to invest in stocks, derivatives, mutual funds,
            ETFs, bonds, and more.
          </p>

          {/* Signup Button */}
          <button
            className="btn btn-primary fs-5 px-4 py-2 mt-3"
            style={{ width: "220px" }}
          >
            Sign up for free
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
