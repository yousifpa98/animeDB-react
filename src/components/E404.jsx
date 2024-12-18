import React from "react";
import "../styles/404.css";
import Luffy from "../assets/404luffy.png";
import Pichu from "../assets/404Pichu.png";
import Zoro from "../assets/404Zoro.png";
import { Link } from "react-router-dom";

const E404 = () => {
  return (
    <div className="e404">
      <img src={Zoro} alt="Pichu from Pokemon" className="e404img" />
      <div className="notFoundText">
        <h2>404</h2>
        {/* <p>Pichu is shocked! We can't find this page.</p> */}
        <p>Lost again? Even Zoro would find this confusing.</p>
      </div>
      <Link to={"/"} className="btn">
        Back to Home
      </Link>
    </div>
  );
};

export default E404;
