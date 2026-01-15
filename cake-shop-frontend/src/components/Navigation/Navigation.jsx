import React from 'react';
import { useCart } from '../../context/CartContext';
import './Navigation.css';

const Navigation = ({ onShowProducts, onShowCart }) => {
  const { getCartCount } = useCart();

  return (
    <nav className="navbar">
      <h1 className="navbar-title">🎂 Cake Shop</h1>
      <div className="nav-buttons">
        <button className="btn btn-primary" onClick={onShowProducts}>
          Produkty
        </button>
        <button className="btn btn-primary" onClick={onShowCart}>
          Koszyk <span className="cart-badge">{getCartCount()}</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
