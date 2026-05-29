import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import localStorageService from "../services/localStorageService";
import "./Auth.css";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (localStorageService.getCurrentUser()) {
      navigate("/");
    }
  }, [navigate]);

  const submitSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = localStorageService.signUp(name, email, password);

    if (!result.ok) {
      setMessage(result.message);
      return;
    }

    navigate("/shop");
  };

  return (
    <main className="auth-page">
      <section className="auth-cover">
        <div>
          <p>Furniro</p>
          <h1>Start building your dream interior.</h1>
        </div>
      </section>

      <section className="auth-panel">
        <section className="auth-card">
          <h2>Create account</h2>
          <p>Signup once and your session will persist in this browser.</p>

          <form className="auth-form" onSubmit={submitSignup}>
            <label>
              Name
              <input
                type="text"
                required
                value={name}
                placeholder="Your name"
                onChange={(event) => setName(event.target.value)}
              />
            </label>

            <label>
              Email
              <input
                type="email"
                required
                value={email}
                placeholder="you@example.com"
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            <label>
              Password
              <div className="auth-password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={4}
                  value={password}
                  placeholder="Create password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((showPass) => !showPass)}
                >
                  {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                </button>
              </div>
            </label>

            <button type="submit">Signup</button>
          </form>

          {message && <p className="auth-message">{message}</p>}

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </section>
      </section>
    </main>
  );
};

const EyeOpenIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const EyeClosedIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M3 3l18 18M10.6 10.6A3 3 0 0 0 13.4 13.4M6.4 6.8C3.5 8.6 2 12 2 12s3.5 6 10 6c1.7 0 3.2-.4 4.5-1M9.9 6.2A11 11 0 0 1 12 6c6.5 0 10 6 10 6a14 14 0 0 1-2.1 2.7"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  </svg>
);

export default Signup;
