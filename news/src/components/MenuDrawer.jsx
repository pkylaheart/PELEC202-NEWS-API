function MenuDrawer({ setMenuOpen }) {
  return (
    <div className="overlay" onClick={() => setMenuOpen(false)}>
      <div className="menuPanel">
        <div className="menuItem">🏠 Home</div>
        <div className="menuItem">🔥 Trending</div>
      </div>
    </div>
  );
}

export default MenuDrawer;