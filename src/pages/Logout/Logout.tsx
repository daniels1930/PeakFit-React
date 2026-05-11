import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Logout.css";

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

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
          <button
            type="button"
            className="logout-btn logout-btn-cancel"
            onClick={() => navigate(-1)}
          >
            cancel
          </button>
          <button
            type="button"
            className="logout-btn logout-btn-confirm"
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
          >
            log out
          </button>
        </div>
      </section>
    </main>
  );
}

export default Logout;