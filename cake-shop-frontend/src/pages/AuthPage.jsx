import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/pages.css";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isAuthenticated } = useAuth();

  const redirectTo = location.state?.redirectTo || "/profile";
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  const handleLoginChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegisterChange = (e) => {
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!loginData.email || !loginData.password) {
      setError("Podaj email i hasło.");
      return;
    }

    const result = login(loginData);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate(redirectTo, { replace: true });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (
      !registerData.email ||
      !registerData.password ||
      !registerData.confirmPassword
    ) {
      setError("Uzupełnij wymagane pola rejestracji.");
      return;
    }

    if (registerData.password.length < 6) {
      setError("Hasło powinno mieć co najmniej 6 znaków.");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError("Hasła nie są takie same.");
      return;
    }

    const result = register({
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="auth-shell">
      <div className="auth-page-card auth-page-card-narrow">
        <h2 className="page-title">Konto klienta</h2>

        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${mode === "login" ? "auth-tab-active" : ""}`}
            onClick={() => {
              setMode("login");
              setError("");
            }}
          >
            Logowanie
          </button>

          <button
            type="button"
            className={`auth-tab ${mode === "register" ? "auth-tab-active" : ""}`}
            onClick={() => {
              setMode("register");
              setError("");
            }}
          >
            Rejestracja
          </button>
        </div>

        {mode === "login" ? (
          <>
            <p className="auth-choice-text">
              Zaloguj się swoim adresem email i hasłem.
            </p>

            <form className="auth-clean-form" onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="loginEmail">Adres e-mail</label>
                <input
                  id="loginEmail"
                  name="email"
                  type="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="twoj@email.pl"
                />
              </div>

              <div className="form-group">
                <label htmlFor="loginPassword">Hasło</label>
                <input
                  id="loginPassword"
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="••••••••"
                />
              </div>

              {error && <p className="form-error">{error}</p>}

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => navigate(-1)}
                >
                  Wróć
                </button>

                <button type="submit" className="btn btn-secondary">
                  Zaloguj się
                </button>
              </div>
            </form>

            <p className="auth-switch-text">
              Nie masz konta?{" "}
              <button
                type="button"
                className="auth-switch-btn"
                onClick={() => {
                  setMode("register");
                  setError("");
                }}
              >
                Zarejestruj się
              </button>
            </p>
          </>
        ) : (
          <>
            <p className="auth-choice-text">
              Załóż konto, aby szybciej składać kolejne zamówienia.
            </p>

            <form className="auth-clean-form" onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label htmlFor="registerName">Imię i nazwisko</label>
                <input
                  id="registerName"
                  name="name"
                  type="text"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  placeholder="Opcjonalnie"
                />
              </div>

              <div className="form-group">
                <label htmlFor="registerEmail">Adres e-mail</label>
                <input
                  id="registerEmail"
                  name="email"
                  type="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  placeholder="twoj@email.pl"
                />
              </div>

              <div className="form-group">
                <label htmlFor="registerPassword">Hasło</label>
                <input
                  id="registerPassword"
                  name="password"
                  type="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  placeholder="Minimum 6 znaków"
                />
              </div>

              <div className="form-group">
                <label htmlFor="registerConfirmPassword">Powtórz hasło</label>
                <input
                  id="registerConfirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  placeholder="Powtórz hasło"
                />
              </div>

              {error && <p className="form-error">{error}</p>}

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => navigate(-1)}
                >
                  Wróć
                </button>

                <button type="submit" className="btn btn-secondary">
                  Załóż konto
                </button>
              </div>
            </form>

            <p className="auth-switch-text">
              Masz już konto?{" "}
              <button
                type="button"
                className="auth-switch-btn"
                onClick={() => {
                  setMode("login");
                  setError("");
                }}
              >
                Zaloguj się
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
