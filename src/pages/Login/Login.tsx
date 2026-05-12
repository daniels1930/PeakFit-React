import { type FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

type LoginLocationState = {
  guestNotice?: string;
  from?: string;
};

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LoginLocationState | null;
  const guestNotice = locationState?.guestNotice;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    const ok = login(email, password);
    if (ok) {
      const from = locationState?.from;
      const target =
        from && from.startsWith("/") && !from.startsWith("//") && from !== "/login" ? from : "/home";
      navigate(target, { replace: true });
    } else {
      setError("Incorrect email or password.");
    }
  }

  return (
    <main className="login-page">
      <img
        src="/assets/images/pages/Login/login-image.png"
        alt="Background"
        className="background-image"
      />

      <div className="background-overlay"></div>

      <img
        src="/assets/images/Header/Logo.png"
        alt="PeakFit Logo"
        className="login-logo"
      />

      <section className="login-container">
        <div className="login-card">
          <h2>Welcome Back!</h2>

          <p className="login-subtitle">
            sign in to your account
          </p>

          {guestNotice ? (
            <p className="login-guest-notice" role="status">
              {guestNotice}
            </p>
          ) : null}

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="login-email">Email</label>

            <input
              id="login-email"
              type="email"
              placeholder="Input your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />

            <label htmlFor="login-password">Password</label>

            <input
              id="login-password"
              type="password"
              placeholder="Password12334."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />

            {error ? <p className="login-form-error" role="alert">{error}</p> : null}

            <a href="#" className="forgot-password" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </a>

            <button type="submit">
              LOG IN
            </button>
          </form>

          <div className="login-divider">
            <span>Or</span>
          </div>

          <div className="social-login">
            <button type="button">
              <img
                src="/assets/images/pages/Login/Google.png"
                alt="Google"
              />
            </button>

            <button type="button">
              <img
                src="/assets/images/pages/Login/Facebook.png"
                alt="Facebook"
              />
            </button>

            <button type="button">
              <img
                src="/assets/images/pages/Login/Apple.png"
                alt="Apple"
              />
            </button>

            <button type="button">
              <img
                src="/assets/images/pages/Login/Microsoft.png"
                alt="Microsoft"
              />
            </button>
          </div>

          <p className="signup-link">
            Don&apos;t have an account?{" "}
            <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
