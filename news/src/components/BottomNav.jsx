function BottomNav({ active, setActive }) {
  return (
    <div className="bottomNav">

      <div
        className={`navItem ${active === "home" ? "active" : ""}`}
        onClick={() => setActive("home")}
      >
        🏠
      </div>

      <div
        className={`navItem ${active === "trending" ? "active" : ""}`}
        onClick={() => setActive("trending")}
      >
        📡
      </div>

      <div
        className={`navItem ${active === "saved" ? "active" : ""}`}
        onClick={() => setActive("saved")}
      >
        🔖
      </div>

      <div className="navItem">⋯</div>

    </div>
  );
}
export default BottomNav;