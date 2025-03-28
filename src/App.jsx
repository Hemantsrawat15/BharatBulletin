import React, { useEffect, useState } from "react";
import "./App.css";
import BharatBulletin from "./images/BharatBulletin.png";

function App() {
  const API_KEY = "733c5215693c4872af65f3cdf4c93b83";
  const url = "https://newsapi.org/v2/everything?q=";

  const [articles, setArticles] = useState([]);
  const [curSelectedNav, setCurSelectedNav] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchNews("India");
  }, []);

  async function fetchNews(query) {
    try {
      const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }

  function onNavItemClick(category) {
    fetchNews(category);
    setCurSelectedNav(category);
  }

  function handleSearch() {
    if (!searchQuery.trim()) return;
    fetchNews(searchQuery);
    setCurSelectedNav(null);
  }

  return (
    <>
      <nav>
        <div className="main-nav container flex">
          <a href="/" className="company-logo">
            <img src={BharatBulletin} alt="Company-logo" />
          </a>
          <div className="nav-links">
            <ul className="flex">
              {["IPL", "Finance", "Politics", "Technology", "Sports"].map(
                (category) => (
                  <li
                    key={category}
                    className={`nav-item hover-link ${
                      curSelectedNav === category ? "active" : ""
                    }`}
                    onClick={() => onNavItemClick(category)}
                  >
                    {category}
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="search-bar flex">
            <input
              type="text"
              className="news-input"
              placeholder="eg. Science"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </nav>

      <main>
        <div className="cards-container container flex">
          {articles.map((article, index) =>
            article.urlToImage ? (
              <div className="card" key={index} onClick={() => window.open(article.url)}>
                <div className="card-header">
                  <img src={article.urlToImage} alt="news" />
                </div>
                <div className="card-content">
                  <h3>{article.title}</h3>
                  <h6 className="news-source">
                    {article.source.name} .{" "}
                    {new Date(article.publishedAt).toLocaleString("en-US", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </h6>
                  <p className="news-desc">{article.description}</p>
                </div>
              </div>
            ) : null
          )}
        </div>
      </main>
    </>
  );
}

export default App;
