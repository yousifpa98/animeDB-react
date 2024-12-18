import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Top100List.css";

const TopMangas = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedCategory, setSelectedCategory] = useState("manga"); // Default category

  useEffect(() => {
    if (!selectedCategory) return;

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const fetchFilteredData = async () => {
      setLoading(true);
      setError(null);
      const aggregatedData = [];
      try {
        for (let page = 1; page <= 4; page++) {
          const response = await fetch(
            `https://api.jikan.moe/v4/top/manga?page=${page}&type=${selectedCategory}&limit=25`
          );
          const result = await response.json();
          aggregatedData.push(...result.data);
          await delay(1000);
        }
        setData(aggregatedData);
        setFilteredData(aggregatedData);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredData();
  }, [selectedCategory]);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
    setSearchTerm(""); // Reset the search term when the category changes
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="topListContainer">
      <h2 className="topListTitle">Top Mangas</h2>
      <div className="topListFilters">
        {[
          "manga",
          "novel",
          "oneshot",
          "doujin",
          "manhwa",
          "manhua",
        ].map((category) => (
          <button
            key={category}
            className={`btn ${selectedCategory === category ? "active" : ""}`}
            onClick={() => handleFilterChange(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search within results..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          marginBottom: "20px",
          padding: "10px",
          width: "100%",
        }}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="topListUl">
          {currentPageData.map((item) => {
            const originalIndex = data.findIndex(
              (d) => d.mal_id === item.mal_id
            );
            return (
              <li className="topListItem" key={item.mal_id}>
                {item.images?.jpg?.image_url && (
                  <img
                    src={item.images.jpg.image_url}
                    alt={item.title}
                    className="topListImg"
                  />
                )}
                <div className="topListItemContent">
                  <h3 className="topListItemName">
                    {originalIndex + 1}. {item.title}
                  </h3>
                  <p>Score: {item.score || "N/A"}</p>
                  <Link to={`/search/${encodeURIComponent(item.title)}`}>
                    <button className="btn">View</button>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div style={{ marginTop: "20px" }}>
        <button
          className="btn"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px", color: "white" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TopMangas;
