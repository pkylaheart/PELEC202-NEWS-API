function NewsCard({ article }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noreferrer"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="card">
        <img
          src={article.urlToImage || "https://via.placeholder.com/80"}
          className="image"
          alt="news"
        />

        <div>
          <h4>{article.title}</h4>
          <p className="meta">{article.source?.name}</p>
        </div>
      </div>
    </a>
  );
}

export default NewsCard;