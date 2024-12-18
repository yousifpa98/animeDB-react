import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/SearchContainer.css";

const SearchContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch search suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length < 3) {
        setSuggestions([]);
        return;
      }
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?q=${searchTerm}&limit=5`
        );
        const data = await response.json();
        setSuggestions(data.data.map((anime) => anime.title));
      } catch {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  // Navigate to the AnimeDisplayPage
  const handleSearch = () => {
    if (searchTerm) {
      navigate(`/search/${encodeURIComponent(searchTerm)}`);
    }
  };

  // Fetch and display a random anime
  const handleRandomAnime = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.jikan.moe/v4/random/anime`);
      if (!response.ok) throw new Error("Failed to fetch random anime");
      const data = await response.json();
      const randomAnimeTitle = data.data.title;

      // Navigate to the AnimeDisplayPage with the random anime title
      navigate(`/search/${encodeURIComponent(randomAnimeTitle)}`);
    } catch (error) {
      console.error("Error fetching random anime:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <div className="searchInputContainer">
        <input
          type="text"
          name="search"
          id="searchInput"
          placeholder="Search for an anime"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Suggestions */}
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((title, index) => (
              <li
                key={index}
                onClick={() => {
                  setSearchTerm(title);
                  setSuggestions([]);
                  navigate(`/search/${encodeURIComponent(title)}`);
                }}
              >
                {title}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="searchControls">
        <button className="btn" onClick={handleSearch} disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
        <button className="btn" onClick={handleRandomAnime} disabled={loading}>
          {loading ? "Loading..." : "Random"}
        </button>
      </div>
    </div>
  );
};

export default SearchContainer;
