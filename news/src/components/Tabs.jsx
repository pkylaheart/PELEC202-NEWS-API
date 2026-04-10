function Tabs({ category, setCategory }) {
  const categories = [
    "general",
    "business",
    "technology",
    "sports",
    "health",
    "science",
    "entertainment"
  ];

  return (
    <div className="tabsScroll">
      {categories.map((cat) => (
        <div
          key={cat}
          className={`tabItem ${category === cat ? "activeTab" : ""}`}
          onClick={() => setCategory(cat)}
        >
          {cat}
        </div>
      ))}
    </div>
  );
}

export default Tabs;