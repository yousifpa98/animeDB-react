import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Watchlist.css";
import Home from "./Home";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);
  }, []);

  // Clear the entire watchlist
  const clearWatchlist = () => {
    localStorage.removeItem("watchlist");
    setWatchlist([]);
  };

  // Delete an individual anime from the watchlist
  const deleteAnime = (id) => {
    const updatedWatchlist = watchlist.filter((anime) => anime.id !== id);
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  return (
    <div className="watchlist">
      <h2 className="watchlistTitle">Your Watchlist</h2>
      {watchlist.length === 0 ? (
        <p className="empty">
          Your watchlist is empty. <br />{" "}
          <Link to="/">Try adding a new Anime</Link>
        </p>
      ) : (
        <>
          {/* Clear Watchlist Button */}
          <button className="btn clear-btn" onClick={clearWatchlist}>
            Clear Watchlist
          </button>
          <ul className="watchlistUl">
            {watchlist.map((anime) => (
              <li
                key={anime.id}
                className="watchlist-item"
                style={{ marginBottom: "1rem" }}
              >
                <img
                  src={anime.img}
                  alt={anime.name}
                  style={{
                    width: "100px",
                    marginRight: "1rem",
                    borderRadius: "5px",
                  }}
                />
                <div className="wlControls">
                  <h3>{anime.name}</h3>
                  <div className="buttons">
                    <button
                      className="btn view-btn"
                      onClick={() => navigate(anime.path)}
                      style={{ marginRight: "0.5rem" }}
                    >
                      View
                    </button>
                    <button
                      className="btn delete-btn"
                      onClick={() => deleteAnime(anime.id)}
                      style={{ backgroundColor: "red", color: "white" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Watchlist;
