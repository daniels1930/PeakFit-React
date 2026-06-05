import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./SignUp.css";

function SignUp() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    const result = await register(name, email, password);
    if (result.ok) {
      navigate("/login", { replace: true });
    } else {
      setError(result.error ?? "Could not create account.");
    }
  }

  return (
    <main className="signup-page">
      <img
        src="/assets/images/pages/Login/login-image.png"
        alt="Background"
        className="background-image"
      />

      <div className="background-overlay"></div>

      <img
        src="/assets/images/Header/Logo.png"
        alt="PeakFit Logo"
        className="signup-logo"
      />

      <section className="signup-container">
        <div className="signup-card">
          <h2>Sign up</h2>

          <p className="signup-subtitle">
            Create your account and unlock exclusive fitness gear, personalized recommendations,
            and member only offers.
          </p>

          <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="signup-name">Name</label>

            <input
              id="signup-name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />

            <label htmlFor="signup-email">Email</label>

            <input
              id="signup-email"
              type="email"
              placeholder="Input your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />

            <label htmlFor="signup-password">Password</label>

            <input
              id="signup-password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />

            {error ? (
              <p className="signup-form-error" role="alert">
                {error}
              </p>
            ) : null}

            <button type="submit">CREATE ACCOUNT</button>
          </form>

          <p className="login-link">
            You already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default SignUp;
