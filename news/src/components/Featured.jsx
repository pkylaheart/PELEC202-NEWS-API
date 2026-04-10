function Featured({ article }) {
  if (!article) return null;

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noreferrer"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="featured">
        <span className="badge">HOT TOPIC</span>
        <h3>{article.title}</h3>
        <p>{article.source?.name}</p>
      </div>
    </a>
  );
}

export default Featured;