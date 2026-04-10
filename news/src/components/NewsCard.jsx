function NewsCard({ article, onClick, getTimeAgo }) {
  return (
    <div
      className="card"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <img
        src={article.urlToImage || "https://via.placeholder.com/80"}
        className="image"
        alt="news"
      />

      <div>
        <h4 style={{ margin: 0 }}>
          {article.title}
        </h4>

        <p className="meta">
          {article.source?.name} •{" "}
          {getTimeAgo ? getTimeAgo(article.publishedAt) : ""}
        </p>
      </div>
    </div>
  );
}

export default NewsCard;