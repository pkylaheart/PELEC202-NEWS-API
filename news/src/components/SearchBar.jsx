function SearchBar({ search, setSearch, handleSearch }) {
  return (
    <div className="searchBox">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search news..."
        className="searchInput"
      />
      <button onClick={handleSearch} className="searchBtn">
        Search
      </button>
    </div>
  );
}

export default SearchBar;