import { useRef } from "react";

function Tabs({ category, setCategory }) {
  const categories = [
    "for you",
    "business",
    "technology",
    "sports",
    "health",
    "science",
    "entertainment"
  ];

  const scrollRef = useRef();

  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    scrollRef.current.classList.add("dragging");
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
  };

  const handleMouseUp = () => {
    isDown = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={scrollRef}
      className="tabsScroll"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
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