import searchIcon from "../assets/search.png";

function Header({ setShowSearch }) {
  return (
    <div className="header">

      <div className="headerLeft">
        <span className="dot"></span>
        <h1>Broken News</h1>
      </div>

      <div className="headerRight">
        <img
          src={searchIcon}
          alt="search"
          onClick={() => setShowSearch(prev => !prev)}
        />
      </div>

    </div>
  );
}

export default Header;