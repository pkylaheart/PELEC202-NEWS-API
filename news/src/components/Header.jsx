import bellIcon from "../assets/bell.png";
import searchIcon from "../assets/search.png";

function Header({ setShowSearch, setShowNotif, showSearch }) {
  return (
    <div className="header">

      <div className="logo">
        <span className="dot"></span>
        <h2>Broken News</h2>
      </div>

      <div className="icons">

        <img
          src={searchIcon}
          alt="search"
          className="icon"
          onClick={() => setShowSearch(!showSearch)}
        />

        <img
          src={bellIcon}
          alt="notif"
          className="icon"
          onClick={() => setShowNotif(true)}
        />

      </div>

    </div>
  );
}

export default Header;