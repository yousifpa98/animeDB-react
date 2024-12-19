import React from "react";
import "../styles/Footer.css";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  const items = [
    { name: "Home", dest: "/", id: 1 },
    { name: "Top Lists", dest: "/top-lists", id: 2 },
    { name: "Watchlist", dest: "/watchlist", id: 3 },
  ];
  return (
    <footer>
      <div className="logo">
        <Link className="logoLink" to={"/"}>
          <h1>AnimeDB</h1>
        </Link>
      </div>
      <ul className="footer-links">
        {items.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.dest}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <p className="copyright">
        Made with <span style={{ color: "red" }}>❤️</span> by Yousif Paulus{" "}
        <br /> &copy; 2025
      </p>
    </footer>
  );
};

export default Footer;
