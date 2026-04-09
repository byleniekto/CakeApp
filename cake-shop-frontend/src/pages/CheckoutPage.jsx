import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import OrderForm from "../components/OrderForm/OrderForm";
import "../styles/pages.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  const [checkoutMode, setCheckoutMode] = useState(
    isAuthenticated ? "user" : null,
  );

  const items = useMemo(() => Object.values(cart), [cart]);

  const initialData = isAuthenticated
    ? {
        customerName: user?.name || "",
        customerEmail: user?.email || "",
        customerPhone: user?.phone || "",
        customerAddress: user?.address || "",
        customerNotes: "",
      }
    : null;

  const handleSubmit = (formData) => {
    const orderData = {
      ...formData,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        emoji: item.emoji,
        quantity: item.quantity,
        price: item.price,
      })),
      total: getCartTotal(),
      date: new Date().toLocaleDateString("pl-PL"),
      orderMode: checkoutMode || (isAuthenticated ? "user" : "guest"),
    };

    clearCart();
    navigate("/success", { state: { orderData } });
  };

  if (items.length === 0) {
    return (
      <div className="auth-choice-card">
        <h2 className="page-title">Koszyk jest pusty</h2>
        <p className="auth-choice-text">
          Dodaj produkty do koszyka, aby przejść do finalizacji zamówienia.
        </p>
        <div className="auth-choice-actions">
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Przejdź do produktów
          </button>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && !checkoutMode) {
    return (
      <div className="auth-choice-card">
        <h2 className="page-title">Jak chcesz dokończyć zamówienie?</h2>
        <p className="auth-choice-text">
          Możesz zalogować się, aby skorzystać z panelu klienta, albo złożyć
          zamówienie jako gość.
        </p>

        <div className="auth-choice-actions">
          <button
            className="btn btn-secondary"
            onClick={() =>
              navigate("/auth", { state: { redirectTo: "/checkout" } })
            }
          >
            Zaloguj się
          </button>

          <button
            className="btn btn-primary"
            onClick={() => setCheckoutMode("guest")}
          >
            Zamów jako gość
          </button>
        </div>

        <button
          className="btn btn-outline auth-back-btn"
          onClick={() => navigate("/cart")}
        >
          Wróć do koszyka
        </button>
      </div>
    );
  }

  return (
    <>
      <h2 className="page-title">Finalizuj zamówienie</h2>

      {isAuthenticated && (
        <div className="auth-choice-card auth-choice-card-small">
          <p className="auth-choice-text">
            Jesteś zalogowany jako <strong>{user?.email}</strong>. Dane
            formularza zostały uzupełnione automatycznie.
          </p>
        </div>
      )}

      <OrderForm
        onSubmit={handleSubmit}
        onCancel={() => navigate("/cart")}
        initialData={initialData}
      />
    </>
  );
};

export default CheckoutPage;
