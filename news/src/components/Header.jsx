function Header({ setShowSearch, setShowNotif, setMenuOpen, showSearch }) {
  return (
    <div className="header">
      <h2>🔴 Broken News</h2>

      <div style={{ display: "flex", gap: 14 }}>
        <svg onClick={() => setShowSearch(!showSearch)} width="20" height="20">
          <circle cx="11" cy="11" r="8" />
        </svg>

        <span onClick={() => setShowNotif(true)}>🔔</span>
      </div>

      <span onClick={() => setMenuOpen(true)}>☰</span>
    </div>
  );
}

export default Header;