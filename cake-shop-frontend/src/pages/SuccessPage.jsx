import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData;

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

  return (
    <div className="success-wrapper">
      <div className="success-icon">✅</div>
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
          <strong>Produkty:</strong>
          {orderData.items.map((item) => (
            <div key={item.id} className="order-product-row">
              {item.name} x {item.quantity} = {item.price * item.quantity} PLN
            </div>
          ))}
        </div>

        <div className="order-total-row">Razem: {orderData.total} PLN</div>
      </div>

      <button className="btn btn-secondary" onClick={() => navigate("/")}>
        Złóż nowe zamówienie
      </button>
    </div>
  );
};

export default SuccessPage;
