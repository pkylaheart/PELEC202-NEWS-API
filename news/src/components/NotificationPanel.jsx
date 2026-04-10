import bell from "../assets/bell.png";
import searchIcon from "../assets/search.png";

function Header({ setShowSearch, setShowNotif, showSearch }) {
  return (
    <div className="header">

      <h2>
        <span className="dot"></span> Broken News
      </h2>

      <div className="icons">
        <img
          src={searchIcon}
          alt="search"
          onClick={() => setShowSearch(prev => !prev)}
        />

        <img
          src={bell}
          alt="notif"
          onClick={() => setShowNotif(prev => !prev)}
        />
      </div>

    </div>
  );
}

export default Header;