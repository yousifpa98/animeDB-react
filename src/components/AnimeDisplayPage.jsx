import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/AnimeDisplayPage.css";

const AnimeDisplayPage = () => {
  const { animeName } = useParams();
  const [animeData, setAnimeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHearted, setIsHearted] = useState(false);
  const navigate = useNavigate();

  // Fetch Anime Data
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?q=${animeName}&limit=1`
        );
        if (!response.ok) throw new Error("Failed to fetch anime data");

        const data = await response.json();
        setAnimeData(data.data[0]);

        // Check if the anime is already in the watchlist
        const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        setIsHearted(
          watchlist.some((anime) => anime.id === data.data[0].mal_id)
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [animeName]);

  // Add to Watchlist
  const addToWatchlist = () => {
    if (!animeData) return;

    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    const animeObj = {
      id: animeData.mal_id,
      name: animeData.title,
      path: `/search/${encodeURIComponent(animeName)}`,
      img: animeData.images.jpg.large_image_url,
    };

    // Avoid duplicates
    if (!watchlist.some((anime) => anime.id === animeObj.id)) {
      const updatedWatchlist = [...watchlist, animeObj];
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      setIsHearted(true);
    }
  };

  return (
    <div className="anime-display-page">
      {loading && <p>Loading...</p>}
      {/* {error && <p className="error">{error}</p>} */}
      {animeData && (
        <>
          <h2 className="animeTitle">{animeData.title}</h2>
          <h3 className="animeTitleJap">{animeData.title_japanese || "N/A"}</h3>
          <img
            className="animeCover"
            src={animeData.images.jpg.large_image_url}
            alt={animeData.title}
          />
          <div className="quickInfo">
            <p className="episodes">
              <span className="animeSectionTitle">
                <strong>Episodes: </strong>
              </span>{" "}
              {animeData.episodes || "N/A"} / {animeData.duration}
            </p>
            <h4 className="animeSectionTitle">Info:</h4>
            <p className="animeInfo">
              {animeData.background ||
                "Unfortunately there's no specific information for this Anime yet."}
            </p>
            <div className="scoreContainer">
              <p className="score">{animeData.score || "N/A"}/10 </p>
              <p className="scoredBy">voted by {animeData.scored_by}</p>
            </div>
            <div className="genres">
              {animeData.genres.map((genre) => (
                <span className="tag">{genre.name}</span>
              ))}
            </div>
          </div>
          <h4 className="animeSectionTitle">Summary:</h4>
          <p className="synopsis">
            {animeData.synopsis || "No summary available."}
          </p>

          <div className="animeDisplayButtons">
            <button className="btn heart-btn" onClick={addToWatchlist}>
              {isHearted ? "❤️ Added to Watchlist" : "🤍"}
            </button>
            <button className="btn" onClick={() => navigate("/")}>
              Back to Home
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AnimeDisplayPage;
