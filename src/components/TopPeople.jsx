import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Top100List.css";

const TopPeople = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const fetchPeople = async () => {
      setLoading(true);
      setError(null);
      const aggregatedData = [];
      try {
        for (let page = 1; page <= 4; page++) {
          const response = await fetch(
            `https://api.jikan.moe/v4/top/people?page=${page}&limit=25`
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

    fetchPeople();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="topListContainer">
      <h2 className="topListTitle">Top People</h2>
      <input
        type="text"
        placeholder="Search for people..."
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
                    alt={item.name}
                    className="topListImg"
                  />
                )}
                <div className="topListItemContent">
                  <h3 className="topListItemName">
                    {originalIndex + 1}. {item.name}
                  </h3>
                  <div className="topListInfoList">
                    <p>Given Name: {item.given_name || "N/A"}</p>
                    <p>Family Name: {item.family_name || "N/A"}</p>
                    <p>Favorites: {item.favorites || "N/A"}</p>
                    {item.birthday && (
                      <p>Birthday: {item.birthday.split("T")[0] || "N/A"}</p>
                    )}
                  </div>
                  {item.website_url && (
                    <a
                      href={item.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                    >
                      Website
                    </a>
                  )}
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

export default TopPeople;
