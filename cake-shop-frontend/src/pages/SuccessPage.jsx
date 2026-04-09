import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/pages.css";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { registerFromOrder } = useAuth();

  const orderData = location.state?.orderData;

  const [accountData, setAccountData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [accountError, setAccountError] = useState("");
  const [accountCreated, setAccountCreated] = useState(false);

  if (!orderData) {
    return (
      <div className="success-wrapper">
        <div className="success-message">Brak danych zamówienia</div>
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Wróć do sklepu
        </button>
      </div>
    );
  }

  const isGuestOrder = orderData.orderMode === "guest";

  const handleChange = (e) => {
    setAccountData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setAccountError("");

    if (!accountData.password || !accountData.confirmPassword) {
      setAccountError("Uzupełnij hasło i potwierdzenie hasła.");
      return;
    }

    if (accountData.password.length < 6) {
      setAccountError("Hasło powinno mieć co najmniej 6 znaków.");
      return;
    }

    if (accountData.password !== accountData.confirmPassword) {
      setAccountError("Hasła nie są takie same.");
      return;
    }

    const result = registerFromOrder({
      orderData,
      password: accountData.password,
    });

    if (!result.success) {
      setAccountError(result.message);
      return;
    }

    setAccountCreated(true);
  };

  return (
    <div className="success-wrapper">
      <div className="success-icon">🎉</div>
      <div className="success-message">Zamówienie złożone!</div>

      <p className="success-subtext">
        Dziękujemy za Twoje zamówienie. Wkrótce się z Tobą skontaktujemy.
      </p>

      <div className="order-details">
        <h3>Podsumowanie zamówienia</h3>

        <div className="order-detail-item">
          <strong>Data:</strong> {orderData.date}
        </div>

        <div className="order-detail-item">
          <strong>Klient:</strong> {orderData.customerName}
        </div>

        <div className="order-detail-item">
          <strong>Email:</strong> {orderData.customerEmail}
        </div>

        <div className="order-detail-item">
          <strong>Telefon:</strong> {orderData.customerPhone}
        </div>

        <div className="order-detail-item">
          <strong>Adres:</strong> {orderData.customerAddress}
        </div>

        {orderData.customerNotes && (
          <div className="order-detail-item">
            <strong>Uwagi:</strong> {orderData.customerNotes}
          </div>
        )}

        <div className="order-detail-item">
          <strong>Tryb zamówienia:</strong>{" "}
          {orderData.orderMode === "guest" ? "Gość" : "Użytkownik zalogowany"}
        </div>

        <div className="order-detail-item">
          <strong>Produkty:</strong>
          {orderData.items.map((item) => (
            <div key={item.id} className="order-product-row">
              {item.name} x {item.quantity} = {item.price * item.quantity} PLN
            </div>
          ))}
        </div>

        <div className="order-total-row">Razem: {orderData.total} PLN</div>
      </div>

      {isGuestOrder && !accountCreated && (
        <div className="post-order-account-box">
          <h3>Utwórz konto na podstawie tego zamówienia</h3>
          <p className="auth-choice-text">
            Dzięki temu przy kolejnych zamówieniach szybciej uzupełnisz dane i
            docelowo zobaczysz historię zamówień w panelu klienta.
          </p>

          <form
            className="post-order-account-form"
            onSubmit={handleCreateAccount}
          >
            <div className="form-group">
              <label htmlFor="orderEmail">Adres e-mail</label>
              <input
                id="orderEmail"
                type="email"
                value={orderData.customerEmail || ""}
                disabled
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Ustaw hasło</label>
              <input
                id="password"
                name="password"
                type="password"
                value={accountData.password}
                onChange={handleChange}
                placeholder="Minimum 6 znaków"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Powtórz hasło</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={accountData.confirmPassword}
                onChange={handleChange}
                placeholder="Powtórz hasło"
              />
            </div>

            {accountError && <p className="form-error">{accountError}</p>}

            <div className="form-actions">
              <button type="submit" className="btn btn-secondary">
                Utwórz konto
              </button>
            </div>
          </form>
        </div>
      )}

      {isGuestOrder && accountCreated && (
        <div className="post-order-account-box success-account-created">
          <h3>Konto zostało utworzone</h3>
          <p className="auth-choice-text">
            Twoje konto zostało założone na podstawie danych z zamówienia.
          </p>

          <div className="auth-choice-actions">
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/profile")}
            >
              Przejdź do panelu klienta
            </button>
          </div>
        </div>
      )}

      <div className="auth-choice-actions success-actions">
        <button className="btn btn-outline" onClick={() => navigate("/")}>
          Wróć do sklepu
        </button>

        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Złóż nowe zamówienie
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
