import "./Logout.css";

function Logout() {
  return (
    <main className="logout-page">
      <img
        src="/assets/images/pages/Login/login-image.png"
        alt="Background"
        className="logout-background"
      />

      <div className="logout-overlay" />

      <section className="logout-card">
        <img
          src="/assets/images/Header/Logo.png"
          alt="PeakFit Logo"
          className="logout-logo"
        />

        <h2>Are you logging out?</h2>

        <p className="logout-text">
          You can always log back in at any time, if you just want to switch
          accounts, you can <span>add another account</span>
        </p>

        <div className="logout-actions">
          <button type="button" className="logout-btn logout-btn-cancel">
            cancel
          </button>
          <button type="button" className="logout-btn logout-btn-confirm">
            log out
          </button>
        </div>
      </section>
    </main>
  );
}

export default Logout;