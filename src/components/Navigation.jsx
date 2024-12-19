import React from "react";
import { NavLink, Link } from "react-router-dom";

const Navigation = () => {
  const items = [
    { name: "Home", dest: "/", id: "eufpag23" },
    { name: "Top Lists", dest: "/top-lists", id: "ufisdpo32" },
    { name: "Watchlist", dest: "/watchlist", id: "3iorjwtf2" },
  ];

  return (
    <>
      <nav>
        <div className="logo">
          <Link className="logoLink" to={"/"}>
            <h1>AnimeDB</h1>
          </Link>
        </div>
        <ul className="nav-links">
          {items.map((item) => (
            <li key={item.id}>
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
      </nav>
    </>
  );
};

export default Navigation;
