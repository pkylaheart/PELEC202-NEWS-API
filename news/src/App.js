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
import WelcomeScreen from "./components/WelcomeScreen";

function App() {
  const [started, setStarted] = useState(false);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (started) {
      fetchNews(category);
    }
  }, [category, started]);

  const handleStart = () => {
    setStarted(true);
  };

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

      if (res.data.status !== "ok") {
        throw new Error(res.data.message || "API Error");
      }

      const data = res.data.articles || [];

      if (data.length === 0) {
        throw new Error("No news found");
      }

      setArticles(data);
      setNotifArticles(data.slice(0, 5));

    } catch (err) {
      console.error(err);

      if (err.response) {
        setError("Server error. Try again later.");
      } else if (err.request) {
        setError("No internet connection.");
      } else {
        setError(err.message || "Something went wrong");
      }

      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (search.trim()) fetchNews("", search);
  };

  // ONBOARDING
  if (!started) {
    return (
      <div className="page">
        <div className="container fadeIn">
          <WelcomeScreen onStart={handleStart} />
        </div>
      </div>
    );
  }

  // ARTICLE VIEW
  if (selectedArticle) {
    return (
      <div className="page">
        <div className="container">

          <div className="articleHeader">
            <button onClick={() => setSelectedArticle(null)}>←</button>
            <h3>NEWS</h3>
          </div>

          <div className="articleContent">

            <img
              src={selectedArticle.urlToImage}
              className="articleImage"
              alt="news"
            />

            <h2 className="articleTitle">
              {selectedArticle.title}
            </h2>

            <p className="articleMeta">
              {selectedArticle.source?.name} •{" "}
              {getTimeAgo(selectedArticle.publishedAt)}
            </p>

            <button
              className="bookmarkBtn"
              onClick={() =>
                setSavedNews(prev => [...prev, selectedArticle])
              }
            >
              🔖 Save Article
            </button>

            <p className="articleText">
              {selectedArticle.description}
            </p>

          </div>

          <BottomNav active={activeNav} setActive={setActiveNav} />

        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">

        <Header
          setShowSearch={setShowSearch}
          setShowNotif={setShowNotif}
          showSearch={showSearch}
        />

        <div className="content fadeUp">

          {showSearch && (
            <SearchBar
              search={search}
              setSearch={setSearch}
              handleSearch={handleSearch}
            />
          )}

          {loading && (
            <p style={{ textAlign: "center" }}>Loading news...</p>
          )}

          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}

          {!loading && !error && (
            <>
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
                <div className="bookmarkPage">

                  <h2 className="bookmarkTitle">BOOKMARKS</h2>

                  {savedNews.length === 0 ? (
                    <div className="bookmarkEmpty">

                      <div className="bookmarkIcon">🔖</div>

                      <h3>No Bookmarks</h3>

                      <p>
                        Add content by tapping the bookmark icon on the article
                      </p>

                      <button
                        className="browseBtn"
                        onClick={() => setActiveNav("home")}
                      >
                        BROWSE NEWS FEED
                      </button>

                    </div>
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
            </>
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