function Header({ setShowSearch, setShowNotif, showSearch }) {
  return (
    <div className="header">
      <h2 style={{ margin: 0, fontWeight: 700 }}>🔴 Broken News</h2>

      <div style={{ display: "flex", gap: 14 }}>
        <svg
          onClick={() => setShowSearch(!showSearch)}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="2"
          style={{ cursor: "pointer" }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <span onClick={() => setShowNotif(true)} style={{ cursor: "pointer" }}>
          🔔
        </span>
      </div>
    </div>
  );
}

export default Header;