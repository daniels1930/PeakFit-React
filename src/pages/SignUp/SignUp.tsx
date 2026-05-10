import "./SignUp.css";

function SignUp() {
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
            Create your account and unlock exclusive fitness gear,
            personalized recommendations, and member only offers.
          </p>

          <form className="signup-form">
            <label>Name</label>

            <input
              type="text"
              placeholder="Your name"
            />

            <label>Email</label>

            <input
              type="email"
              placeholder="Input your email"
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Create a password"
            />

            <button type="submit">
              CREATE ACCOUNT
            </button>
          </form>

          <p className="login-link">
            You already have an account?
          </p>
        </div>
      </section>
    </main>
  );
}

export default SignUp;