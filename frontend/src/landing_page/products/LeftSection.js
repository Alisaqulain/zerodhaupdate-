import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDesription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Image Section (Responsive) */}
        <div className="col-lg-6 col-md-12 text-center">
          <img
            src={imageURL}
            alt="Product"
            className="img-fluid"
            style={{ maxHeight: "300px" }}
          />
        </div>

        {/* Text & Buttons Section */}
        <div className="col-lg-6 col-md-12 p-4" style={{ textAlign: "center" }}>
          <h1 className="fw-bold">{productName}</h1>
          <p className="text-muted">{productDesription}</p>

          {/* Links for Try Demo & Learn More */}
          <div className="mt-3">
            <a
              href={tryDemo}
              className="btn btn-primary"
              style={{ marginRight: "15px" }}
            >
              Try Demo
            </a>
            <a href={learnMore} className="btn btn-outline-secondary">
              Learn More
            </a>
          </div>

          {/* App Store Badges */}
          <div className="mt-4">
            <a href={googlePlay} style={{ marginRight: "15px" }}>
              <img
                src="/media/images/googlePlayBadge.svg"
                alt="Google Play"
                className="img-fluid"
                style={{ maxHeight: "50px" }}
              />
            </a>
            <a href={appStore}>
              <img
                src="/media/images/appstoreBadge.svg"
                alt="App Store"
                className="img-fluid"
                style={{ maxHeight: "50px" }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
