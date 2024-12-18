import React from "react";
import { NavLink, Link } from "react-router-dom";

const Navigation = () => {
  const items = [
    { name: "Home", dest: "/", id: 1 },
    { name: "Top Lists", dest: "/top-lists", id: 2 },
    { name: "Watchlist", dest: "/watchlist", id: 3 },
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
            <li>
              <NavLink
                to={item.dest}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                key={item.id}
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
