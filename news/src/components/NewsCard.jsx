function NewsCard({ article, onClick, getTimeAgo }) {
  return (
    <div
      className="card"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <img
        src={article.urlToImage || "https://via.placeholder.com/80"}
        alt="news"
        style={{
          width: 80,
          height: 80,
          objectFit: "cover",
          borderRadius: 12
        }}
      />

      <div style={{ flex: 1 }}>
        <h4 style={{ margin: 0 }}>
          {article.title}
        </h4>

        <p className="meta">
          {article.source?.name} •{" "}
          {getTimeAgo(article.publishedAt)}
        </p>
      </div>
    </div>
  );
}

export default NewsCard;