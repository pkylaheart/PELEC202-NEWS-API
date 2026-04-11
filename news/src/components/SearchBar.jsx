import { useEffect, useRef } from "react";

function SearchBar({ search, setSearch, handleSearch }) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    setSearch(""); // 🔥 clear every time opened
  }, []);

  return (
    <div className="searchBox">

      <input
        ref={inputRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search news..."
        className="searchInput"
      />

      {/* ❌ CLEAR */}
      {search && (
        <button className="clearBtn" onClick={() => setSearch("")}>
          ✕
        </button>
      )}

      <button className="searchBtn" onClick={handleSearch}>
        SEARCH
      </button>

    </div>
  );
}

export default SearchBar;