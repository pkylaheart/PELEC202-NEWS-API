import React, { useEffect, useState } from "react";
import axios from "axios";

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

      // SAVE LATEST NEWS FOR NOTIFICATIONS
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

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={{ marginTop: 10, color: "#555" }}>Loading news...</p>
      </div>
    );
  }

  if (error) return <h2 style={{ textAlign: "center" }}>{error}</h2>;

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* HEADER */}
        <div style={styles.header}>
          <h2 style={{ margin: 0, fontWeight: 700 }}>🔴 Broken News</h2>

          <div style={{ display: "flex", gap: 14 }}>
            {/* SEARCH */}
            <svg
              onClick={() => setShowSearch(!showSearch)}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              style={{ cursor: "pointer" }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            {/* NOTIFICATION BELL */}
            <span
              onClick={() => setShowNotif(true)}
              style={{ cursor: "pointer" }}
            >
              🔔
            </span>
          </div>

          {/* HAMBURGER */}
          <span
            onClick={() => setMenuOpen(true)}
            style={{ fontSize: 22, cursor: "pointer" }}
          >
            ☰
          </span>
        </div>

        {/* SEARCH */}
        {showSearch && (
          <div style={styles.searchBox}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search news..."
              style={styles.searchInput}
            />
            <button onClick={handleSearch} style={styles.searchBtn}>
              Go
            </button>
          </div>
        )}

        {/* TABS */}
        <div style={styles.tabs}>
          {["general", "business", "sports", "technology"].map((cat) => (
            <div
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                ...styles.tab,
                color: category === cat ? "#000" : "#888",
                fontWeight: category === cat ? "600" : "400",
              }}
            >
              {cat === "general"
                ? "For You"
                : cat.charAt(0).toUpperCase() + cat.slice(1)}

              {category === cat && <div style={styles.underline} />}
            </div>
          ))}
        </div>

        {/* FEATURED */}
        {articles[0] && (
          <a
            href={articles[0].url}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={styles.featured}>
              <span style={styles.badge}>HOT TOPIC</span>
              <h3 style={{ marginTop: 10 }}>{articles[0].title}</h3>
              <p style={{ fontSize: 12, color: "#ffffff" }}>
                {articles[0].source?.name}
              </p>
            </div>
          </a>
        )}

        {/* LIST */}
        <h3 style={{ marginTop: 18 }}>Hot Stories</h3>

        {articles.slice(1, 7).map((article, i) => (
          <a
            key={i}
            href={article.url}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={styles.card}>
              <img
                src={article.urlToImage || "https://via.placeholder.com/80"}
                style={styles.image}
                alt="news"
              />

              <div>
                <h4 style={{ margin: 0, fontSize: 14 }}>
                  {article.title}
                </h4>
                <p style={styles.meta}>{article.source?.name}</p>
              </div>
            </div>
          </a>
        ))}

        {/* 🔔 NOTIFICATION OVERLAY */}
        {showNotif && (
          <div style={styles.overlay} onClick={() => setShowNotif(false)}>
            <div style={styles.notifPanel} onClick={(e) => e.stopPropagation()}>
              <div style={styles.notifHeader}>
                <h3 style={{ margin: 0 }}>Latest News</h3>
                <span onClick={() => setShowNotif(false)} style={{ cursor: "pointer" }}>
                  ✕
                </span>
              </div>

              {notifArticles.length === 0 ? (
                <p style={{ color: "#888" }}>No recent news</p>
              ) : (
                notifArticles.map((n, i) => (
                  <a
                    key={i}
                    href={n.url}
                    target="_blank"
                    rel="noreferrer"
                    style={styles.notifItem}
                  >
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>
                      {n.title}
                    </p>
                    <p style={{ margin: 0, fontSize: 11, color: "#888" }}>
                      {n.source?.name}
                    </p>
                  </a>
                ))
              )}
            </div>
          </div>
        )}

        {/*MENU OVERLAY*/}
        {menuOpen && (
          <div style={styles.overlay} onClick={() => setMenuOpen(false)}>
            <div style={styles.menuPanel} onClick={(e) => e.stopPropagation()}>
              <h3 style={{ marginTop: 0 }}>Menu</h3>

              <div style={styles.menuItem}>🏠 Home</div>
              <div style={styles.menuItem}>🔥 Trending</div>
              <div style={styles.menuItem}>🔖 Saved</div>
              <div style={styles.menuItem}>👤 Profile</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#f2f2f7",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  container: {
    width: "380px",
    height: "90vh",
    overflowY: "auto",
    backgroundColor: "#fff",
    borderRadius: "28px",
    padding: "18px",
    fontFamily: "Arial",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },

  tabs: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
    paddingBottom: 10,
    borderBottom: "1px solid #eee",
  },

  tab: {
    fontSize: 14,
    cursor: "pointer",
    position: "relative",
    paddingBottom: 6,
  },

  underline: {
    position: "absolute",
    bottom: -8,
    left: 0,
    right: 0,
    height: 3,
    background: "#000",
    borderRadius: 10,
  },

  featured: {
    marginTop: 15,
    padding: 16,
    borderRadius: 18,
    background: "linear-gradient(135deg, purple, crimson)",
    color: "white",
  },

  badge: {
    background: "#ff3b30",
    color: "white",
    padding: "4px 8px",
    borderRadius: 8,
    fontSize: 10,
  },

  card: {
    display: "flex",
    gap: 10,
    marginBottom: 15,
    alignItems: "center",
    padding: 8,
    borderRadius: 12,
  },

  image: {
    width: 80,
    height: 80,
    objectFit: "cover",
    borderRadius: 12,
  },

  meta: {
    fontSize: 12,
    color: "#888",
  },

  searchBox: {
    display: "flex",
    gap: 6,
    marginTop: 10,
  },

  searchInput: {
    flex: 1,
    padding: 8,
    borderRadius: 10,
    border: "1px solid #ddd",
  },

  searchBtn: {
    padding: "8px 12px",
    borderRadius: 10,
    background: "black",
    color: "white",
    border: "none",
  },

  loadingContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  spinner: {
    width: 40,
    height: 40,
    border: "4px solid #eee",
    borderTop: "4px solid black",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 80,
    zIndex: 999,
  },

  notifPanel: {
    width: "340px",
    background: "white",
    borderRadius: "18px",
    padding: 14,
    maxHeight: "60vh",
    overflowY: "auto",
  },

  notifHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderBottom: "1px solid #eee",
    paddingBottom: 8,
  },

  notifItem: {
    display: "block",
    padding: 10,
    borderBottom: "1px solid #f2f2f2",
    textDecoration: "none",
    color: "black",
  },

  menuPanel: {
  width: "250px",
  background: "white",
  borderRadius: "16px",
  padding: 16,
  maxHeight: "60vh",
  },

  menuItem: {
    padding: 12,
    borderBottom: "1px solid #eee",
    cursor: "pointer",
  },

  menuOverlay: {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.4)",
  zIndex: 1000,
  opacity: 1,
  transition: "0.3s ease",
  },

  menuDrawer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "260px",
    height: "100%",
    background: "#fff",
    padding: 16,
    boxShadow: "2px 0 20px rgba(0,0,0,0.2)",
    transform: "translateX(0)",
    transition: "transform 0.3s ease",
  },

  menuDrawerClosed: {
    transform: "translateX(-100%)",
  },
  };

export default App;