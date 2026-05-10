import "./Login.css";

function Login() {
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

          <form className="login-form">
            <label>Email</label>

            <input
              type="email"
              placeholder="Input your email"
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Password12334."
            />

            <a href="#" className="forgot-password">
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
  <button>
    <img
      src="/assets/images/pages/Login/Google.png"
      alt="Google"
    />
  </button>

  <button>
    <img
      src="/assets/images/pages/Login/Facebook.png"
      alt="Facebook"
    />
  </button>

  <button>
    <img
      src="/assets/images/pages/Login/Apple.png"
      alt="Apple"
    />
  </button>

  <button>
    <img
      src="/assets/images/pages/Login/Microsoft.png"
      alt="Microsoft"
    />
  </button>
</div>

          <p className="signup-link">
            Don’t have an account?
            <span> Sign up</span>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;