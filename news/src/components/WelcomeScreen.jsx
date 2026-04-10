function WelcomeScreen({ onStart }) {
  return (
    <div className="welcome">

      <div className="bgText">
        NEWS
      </div>

      <div className="welcomeContent">
        <h2>Broken News</h2>

        <p className="subtitle">
          Stay updated with real-time headlines and personalized news
        </p>

        <button onClick={onStart} className="startBtn">
          Get Started
        </button>

      </div>

    </div>
  );
}

export default WelcomeScreen;