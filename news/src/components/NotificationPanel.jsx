function NotificationPanel({ notifArticles, setShowNotif }) {
  return (
    <div className="overlay" onClick={() => setShowNotif(false)}>
      <div className="notifPanel">
        {notifArticles.map((n, i) => (
          <p key={i}>{n.title}</p>
        ))}
      </div>
    </div>
  );
}

export default NotificationPanel;