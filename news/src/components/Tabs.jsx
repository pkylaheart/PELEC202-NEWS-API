function Tabs({ category, setCategory }) {
  return (
    <div className="tabs">
      {["general", "business", "sports", "technology"].map((cat) => (
        <div
          key={cat}
          onClick={() => setCategory(cat)}
          className="tab"
          style={{
            color: category === cat ? "#000" : "#888",
            fontWeight: category === cat ? "600" : "400",
          }}
        >
          {cat === "general"
            ? "For You"
            : cat.charAt(0).toUpperCase() + cat.slice(1)}

          {category === cat && <div className="underline"></div>}
        </div>
      ))}
    </div>
  );
}
export default Tabs;