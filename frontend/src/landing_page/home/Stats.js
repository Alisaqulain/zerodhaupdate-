import React from "react";

function Stats() {
  return (
    <div className="container my-5">
      <div className="row align-items-center">
        {/* Left Content Section */}
        <div className="col-md-6 p-4">
          <h1 className="fw-bold">Trust with confidence</h1>

          <h3 className="mt-4 fw-semibold">Customer-first always</h3>
          <p>
            That's why 1.5+ crore customers trust Zerodha with ₹4.5+ lakh crores
            of equity investments and contribute to 15% of daily retail exchange
            volumes in India.
          </p>

          <h3 className="mt-4 fw-semibold">No spam or gimmicks</h3>
          <p>
            No gimmicks, spam, "gamification", or annoying push notifications.
            High-quality apps that you use at your pace, the way you like.
          </p>

          <h3 className="mt-4 fw-semibold">The Zerodha universe</h3>
          <p>
            Explore our wide range of products designed to simplify investing
            and trading for everyone.
          </p>

          <h3 className="mt-4 fw-semibold">Do better with money</h3>
          <p>
            With initiatives like Nudge and Kill Switch, we don’t just
            facilitate transactions but actively help you manage your money
            better.
          </p>
        </div>

        {/* Right Image Section */}
        <div className="col-md-6 p-4 text-center">
          <img
            src="/media/images/ecosystem.png"
            alt="ecosystem"
            className="img-fluid"
            style={{ maxWidth: "90%" }}
          />

          {/* Links Section */}
          <div className="mt-4">
            <a href="#" className="text-decoration-none mx-3 fw-semibold">
              Explore our products <i className="fa fa-arrow-right ms-1"></i>
            </a>
            <a href="#" className="text-decoration-none fw-semibold">
              Try Kite demo <i className="fa fa-arrow-right ms-1"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
