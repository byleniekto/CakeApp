import React from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import "./Navigation.css";

const Navigation = ({
  onShowProducts,
  onShowCart,
  onShowAuth,
  onShowProfile,
}) => {
  const { getCartCount } = useCart();
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="navbar">
      <h1 className="navbar-title">🎂 Cake Shop</h1>

      <div className="nav-buttons">
        <button className="btn btn-nav" onClick={onShowProducts}>
          Produkty
        </button>

        <button className="btn btn-nav" onClick={onShowCart}>
          Koszyk
          <span className="cart-badge">{getCartCount()}</span>
        </button>

        {isAuthenticated ? (
          <button
            className="btn btn-nav btn-nav-accent"
            onClick={onShowProfile}
          >
            Profil ({user?.name})
          </button>
        ) : (
          <button className="btn btn-nav btn-nav-accent" onClick={onShowAuth}>
            Zaloguj
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
