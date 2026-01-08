import React from "react";
import { Link } from 'react-router-dom';

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center ">People</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-3 text-center">
          <img
            src="/media/images/aliimage.png"
            style={{ borderRadius: "100%", width: "50%" }}
          />
          <h4 className="mt-5">Ali Saqulain</h4>
          <h6>Founder, CEO</h6>
        </div>
        <div className="col-6 p-3">
          <p>
          Welcome to our trading platform, a powerful and user-friendly solution inspired by Zerodha. Designed for both beginners and experienced traders, our platform offers seamless stock market analysis, real-time data, and an intuitive interface. Built using modern web technologies like React, Bootstrap, Material-UI, Node.js, Express.js, and MongoDB, it ensures a smooth and secure trading experience. Our goal is to provide a feature-rich and efficient trading environment that empowers users to make informed investment decisions with ease.
          </p>
          
     
          <p>
            Connect on <Link to="/" style={{textDecoration:"none"}}>HomePage</Link>  /{" "}
            <a href="https://www.linkedin.com/in/ali-saqulain-7404a8287" style={{textDecoration:"none"}}>Linked</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;