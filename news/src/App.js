import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        );
        setArticles(res.data.articles || []);
      } catch (err) {
        setError("Failed to fetch news 😢");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [API_KEY]);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading news...</h2>;
  if (error) return <h2 style={{ textAlign: "center" }}>{error}</h2>;

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        
        {/* Header */}
        <div style={styles.header}>
          <h2>🔴 Broken News</h2>
          <div>🔍 🔔</div>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <span style={styles.activeTab}>For You</span>
          <span>Trending</span>
          <span>Sports</span>
          <span>World</span>
        </div>

        {/* Featured News (CLICKABLE) */}
        {articles[0] && (
          <a
            href={articles[0].url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={styles.featured}>
              <span style={styles.badge}>HOT TOPIC</span>
              <h3>{articles[0].title}</h3>
              <p style={{ fontSize: "12px" }}>
                {articles[0].source?.name}
              </p>
            </div>
          </a>
        )}

        {/* Hot Stories */}
        <h3>Hot Stories</h3>

        {articles.slice(1, 5).map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={styles.card}>
              <div style={styles.image}></div>
              <div>
                <h4>{article.title}</h4>
                <p style={styles.meta}>{article.source?.name}</p>
              </div>
            </div>
          </a>
        ))}

        {/* Bottom Nav */}
        <div style={styles.nav}>
          <span>🏠</span>
          <span>🔳</span>
          <span>🔖</span>
          <span>👤</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  body: {
    backgroundColor: "#eee",
    minHeight: "100vh",
    padding: "20px"
  },
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    backgroundColor: "#fff",
    borderRadius: "20px",
    padding: "16px",
    fontFamily: "Arial",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  tabs: {
    display: "flex",
    gap: "10px",
    margin: "10px 0",
    borderBottom: "1px solid #ccc",
    paddingBottom: "5px"
  },
  activeTab: {
    borderBottom: "2px solid blue",
    paddingBottom: "5px"
  },
  featured: {
    background: "linear-gradient(135deg, purple, crimson)",
    color: "white",
    padding: "15px",
    borderRadius: "15px",
    marginBottom: "15px",
    cursor: "pointer"
  },
  badge: {
    background: "red",
    padding: "3px 8px",
    borderRadius: "8px",
    fontSize: "10px"
  },
  card: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
    cursor: "pointer"
  },
  image: {
    width: "80px",
    height: "80px",
    background: "#ccc",
    borderRadius: "10px"
  },
  meta: {
    fontSize: "12px",
    color: "gray"
  },
  nav: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
    paddingTop: "10px",
    borderTop: "1px solid #ccc"
  }
};

export default App;