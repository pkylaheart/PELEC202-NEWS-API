import { useEffect, useState } from "react";
import axios from "axios";
import "./styles/app.css";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import Featured from "./components/Featured";
import NewsCard from "./components/NewsCard";
import NotificationPanel from "./components/NotificationPanel";
import MenuDrawer from "./components/MenuDrawer";
import SearchBar from "./components/SearchBar";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("general");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [notifArticles, setNotifArticles] = useState([]);

  const API_KEY = process.env.REACT_APP_API_KEY;

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

  // LOADING
  if (loading) {
    return (
      <div className="loadingContainer">
        <div className="spinner"></div>
        <p>Loading news...</p>
      </div>
    );
  }

  // ERROR
  if (error) return <h2>{error}</h2>;

  return (
    <div className="page">
      <div className="container">

        {/* HEADER */}
        <Header
          setShowSearch={setShowSearch}
          setShowNotif={setShowNotif}
          setMenuOpen={setMenuOpen}
          showSearch={showSearch}
        />

        {/* SEARCH */}
        {showSearch && (
          <SearchBar
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
          />
        )}

        {/* TABS */}
        <Tabs category={category} setCategory={setCategory} />

        {/* FEATURED */}
        <Featured article={articles[0]} />

        {/* LIST */}
        <h3>Hot Stories</h3>

        {articles.slice(1, 7).map((article, i) => (
          <NewsCard key={i} article={article} />
        ))}

        {/* NOTIFICATION PANEL */}
        {showNotif && (
          <NotificationPanel
            notifArticles={notifArticles}
            setShowNotif={setShowNotif}
          />
        )}

        {/* MENU DRAWER */}
        {menuOpen && (
          <MenuDrawer setMenuOpen={setMenuOpen} />
        )}

      </div>
    </div>
  );
}

export default App;