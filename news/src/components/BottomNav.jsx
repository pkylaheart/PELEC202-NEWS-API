import homeIcon from "../assets/home.png";
import fireIcon from "../assets/fire.png";
import bookmarkIcon from "../assets/bookmark.png";

function BottomNav({ active, setActive }) {
  return (
    <div className="bottomNav">

      <div
        className={`navItem ${active === "home" ? "active" : ""}`}
        onClick={() => setActive("home")}
      >
        <img src={homeIcon} alt="home" className="navIcon" />
      </div>

      <div
        className={`navItem ${active === "trending" ? "active" : ""}`}
        onClick={() => setActive("trending")}
      >
        <img src={fireIcon} alt="trending" className="navIcon" />
      </div>

      <div
        className={`navItem ${active === "saved" ? "active" : ""}`}
        onClick={() => setActive("saved")}
      >
        <img src={bookmarkIcon} alt="saved" className="navIcon" />
      </div>

    </div>
  );
}

export default BottomNav;