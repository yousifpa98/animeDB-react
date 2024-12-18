import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Top100List = ({ type }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!type) return;

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const fetchAllPages = async () => {
      setLoading(true);
      setError(null);
      const aggregatedData = [];
      try {
        for (let page = 1; page <= 4; page++) {
          const response = await fetch(
            `https://api.jikan.moe/v4/top/${type}?page=${page}&limit=25`
          );
          const result = await response.json();
          aggregatedData.push(...result.data);
          await delay(1000); // Delay between requests
        }
        setData(aggregatedData);
        setFilteredData(aggregatedData);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllPages();
  }, [type]);

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  // Calculate items to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Top 100 {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
      <input
        type="text"
        placeholder="Filter results..."
        value={filter}
        onChange={handleFilterChange}
        style={{
          marginBottom: "20px",
          padding: "10px",
          width: "100%",
        }}
      />
      <ul>
        {currentPageData.map((item, index) => (
          <li key={item.mal_id}>
            <h3>
              {startIndex + index + 1}. {item.title}
            </h3>
            {item.images?.jpg?.image_url && (
              <img
                src={item.images.jpg.image_url}
                alt={item.title}
                style={{ width: "150px", height: "200px" }}
              />
            )}
            <p>Score: {item.score || "N/A"}</p>
            <Link to={`/search/${encodeURIComponent(item.title)}`}>
              <button className="btn">View</button>
            </Link>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div style={{ marginTop: "20px" }}>
        <button
          className="btn"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn"
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, totalPages)
            )
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Top100List;
