import { useEffect, useState } from "react";
import axios from "axios";
import "./styles/app.css";

import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Tabs from "./components/Tabs";
import Featured from "./components/Featured";
import NewsCard from "./components/NewsCard";
import SearchBar from "./components/SearchBar";
import WelcomeScreen from "./components/WelcomeScreen";

function App() {
  const [started, setStarted] = useState(false);

  const [showNotif, setShowNotif] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("general");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [savedNews, setSavedNews] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if (started) fetchNews(category);
  }, [category, started]);

  const handleStart = () => setStarted(true);

  const handleNavChange = (nav) => {
    setSelectedArticle(null);
    setActiveNav(nav);
  };

  const isSameArticle = (a, b) =>
    a.title === b.title && a.source?.name === b.source?.name;

  const isSaved = (article) =>
    savedNews.some(item => isSameArticle(item, article));

  const toggleSave = (article) => {
    if (isSaved(article)) {
      setSavedNews(prev =>
        prev.filter(item => !isSameArticle(item, article))
      );
    } else {
      setSavedNews(prev => [...prev, article]);
    }
  };

  const getTimeAgo = (date) => {
    if (!date) return "";
    const diff = Math.floor((new Date() - new Date(date)) / 1000);
    const h = Math.floor(diff / 3600);
    const d = Math.floor(diff / 86400);
    if (h < 24) return `${h}h ago`;
    return `${d}d ago`;
  };

  const fetchNews = async (selectedCategory = "general", query = "") => {
    try {
      setLoading(true);
      setError("");

      const url = query
        ? `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`
        : `https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory}&apiKey=${API_KEY}`;

      const res = await axios.get(url);
      setArticles(res.data.articles || []);
    } catch {
      setError("Failed to load news");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (search.trim()) fetchNews("", search);
  };

  if (!started) {
    return (
      <div className="page">
        <div className="container">
          <WelcomeScreen onStart={handleStart} />
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">

        {!selectedArticle && (
          <Header setShowSearch={setShowSearch} />
        )}

        <div className="content">

          {/* ARTICLE */}
          {selectedArticle ? (
            <div className="articleContainer">

              <button onClick={() => setSelectedArticle(null)}>← Back</button>
              <img
                src={selectedArticle.urlToImage || "https://via.placeholder.com/300"}
                className="articleImage"
                alt=""
              />

              <h2>{selectedArticle.title}</h2>

              <p className="articleMeta">
                {selectedArticle.source?.name} •{" "}
                {getTimeAgo(selectedArticle.publishedAt)}
              </p>

              <button
                className="bookmarkBtn"
                onClick={() => toggleSave(selectedArticle)}
              >
                {isSaved(selectedArticle)
                  ? "🔖 Unsave Article"
                  : "🔖 Save Article"}
              </button>

              <p>
                {(selectedArticle.content || selectedArticle.description || "")
                  .replace(/\[\+\d+ chars\]/, "")}
              </p>
              <a
                href={selectedArticle.url}
                target="_blank"
                rel="noreferrer"
                className="readMoreBtn"
              >
                Read Full Article →
              </a>

            </div>
          ) : (
            <>
              {showSearch && (
                <SearchBar
                  search={search}
                  setSearch={setSearch}
                  handleSearch={handleSearch}
                />
              )}

              {loading && <p>Loading...</p>}
              {error && <p>{error}</p>}

              {!loading && !error && (
                <>
                  {activeNav === "home" && (
                    <>
                      <Tabs category={category} setCategory={setCategory} />
                      <Featured article={articles[0]} />

                      <h3>Hot Stories</h3>

                      {articles.slice(1, 7).map((a, i) => (
                        <NewsCard
                          key={i}
                          article={a}
                          onClick={() => setSelectedArticle(a)}
                          getTimeAgo={getTimeAgo}
                        />
                      ))}
                    </>
                  )}

                  {activeNav === "trending" && (
                    <>
                      <h3>🔥 Trending</h3>
                      {articles.map((a, i) => (
                        <NewsCard
                          key={i}
                          article={a}
                          onClick={() => setSelectedArticle(a)}
                          getTimeAgo={getTimeAgo}
                        />
                      ))}
                    </>
                  )}

                  {activeNav === "saved" && (
                    <div className="bookmarkPage">

                      {savedNews.length === 0 ? (
                        <div className="bookmarkEmpty">
                          <div className="bookmarkBigIcon">🔖</div>
                          <h3>No Bookmarks</h3>
                        </div>
                      ) : (
                        savedNews.map((a, i) => (
                          <NewsCard
                            key={i}
                            article={a}
                            onClick={() => setSelectedArticle(a)}
                            getTimeAgo={getTimeAgo}
                          />
                        ))
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>

        <BottomNav active={activeNav} setActive={handleNavChange} />

      </div>
    </div>
  );
}

export default App;