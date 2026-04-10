import { useEffect, useState } from "react";
import axios from "axios";
import "./styles/app.css";

import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Tabs from "./components/Tabs";
import Featured from "./components/Featured";
import NewsCard from "./components/NewsCard";
import NotificationPanel from "./components/NotificationPanel";
import SearchBar from "./components/SearchBar";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("general");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [notifArticles, setNotifArticles] = useState([]);
  const [activeNav, setActiveNav] = useState("home");
  const [savedNews, setSavedNews] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const API_KEY = process.env.REACT_APP_API_KEY;

  // TIME AGO
  const getTimeAgo = (date) => {
    if (!date) return "";
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now - past) / 1000);

    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(diff / 86400);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const fetchNews = async (selectedCategory = "general", query = "") => {
    try {
      setLoading(true);
      setError("");

      const url = query
        ? `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`
        : `https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory}&apiKey=${API_KEY}`;

      const res = await axios.get(url);

      const data = res.data.articles || [];
      setArticles(data);
      setNotifArticles(data.slice(0, 5));
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(category);
  }, [category]);

  const handleSearch = () => {
    if (search.trim()) fetchNews("", search);
  };

  // ARTICLE VIEW
  if (selectedArticle) {
    return (
      <div className="page">
        <div className="container">
          <div className="content" style={{ padding: 16 }}>

            <button onClick={() => setSelectedArticle(null)}>← Back</button>

            <img
              src={selectedArticle.urlToImage}
              style={{ width: "100%", borderRadius: 12 }}
              alt="news"
            />

            <h2>{selectedArticle.title}</h2>

            <p>
              {selectedArticle.source?.name} •{" "}
              {getTimeAgo(selectedArticle.publishedAt)}
            </p>

            <button
              onClick={() =>
                setSavedNews((prev) => [...prev, selectedArticle])
              }
            >
              🔖 Save
            </button>

            <p>{selectedArticle.description}</p>

          </div>

          <BottomNav active={activeNav} setActive={setActiveNav} />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loadingContainer">
        <div className="spinner"></div>
        <p>Loading news...</p>
      </div>
    );
  }

  if (error) return <h2>{error}</h2>;

  return (
    <div className="page">
      <div className="container">

        <div className="content">

          <Header
            setShowSearch={setShowSearch}
            setShowNotif={setShowNotif}
            showSearch={showSearch}
          />

          {showSearch && (
            <SearchBar
              search={search}
              setSearch={setSearch}
              handleSearch={handleSearch}
            />
          )}

          {activeNav === "home" && (
            <>
              <Tabs category={category} setCategory={setCategory} />
              <Featured article={articles[0]} />

              <h3>Hot Stories</h3>

              {articles.slice(1, 7).map((article, i) => (
                <NewsCard
                  key={i}
                  article={article}
                  onClick={() => setSelectedArticle(article)}
                  getTimeAgo={getTimeAgo}
                />
              ))}
            </>
          )}

          {activeNav === "trending" && (
            <>
              <h3>🔥 Trending</h3>

              {articles.map((article, i) => (
                <NewsCard
                  key={i}
                  article={article}
                  onClick={() => setSelectedArticle(article)}
                  getTimeAgo={getTimeAgo}
                />
              ))}
            </>
          )}

          {activeNav === "saved" && (
            <div style={{ textAlign: "center", padding: 20 }}>
              <h2>BOOKMARKS</h2>

              {savedNews.length === 0 ? (
                <>
                  <div style={{ fontSize: 80, opacity: 0.2 }}>🔖</div>
                  <h3>No Bookmarks</h3>
                  <p>Add content by tapping 🔖</p>

                  <button onClick={() => setActiveNav("home")}>
                    BROWSE NEWS
                  </button>
                </>
              ) : (
                savedNews.map((article, i) => (
                  <NewsCard
                    key={i}
                    article={article}
                    onClick={() => setSelectedArticle(article)}
                    getTimeAgo={getTimeAgo}
                  />
                ))
              )}
            </div>
          )}

          {showNotif && (
            <NotificationPanel
              notifArticles={notifArticles}
              setShowNotif={setShowNotif}
            />
          )}

        </div>

        <BottomNav active={activeNav} setActive={setActiveNav} />

      </div>
    </div>
  );
}

export default App;