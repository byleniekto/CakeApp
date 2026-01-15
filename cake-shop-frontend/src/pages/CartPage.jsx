import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/Cart/CartItem';
import CartSummary from '../components/Cart/CartSummary';
import '../styles/pages.css';

const CartPage = ({ onCheckout, onContinueShopping }) => {
  const { cart } = useCart();
  const items = Object.values(cart);

  if (items.length === 0) {
    return (
      <div>
        <h2 className="page-title">Twój koszyk</h2>
        <div className="cart-empty">
          <p>Twój koszyk jest pusty 😢</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="page-title">Twój koszyk</h2>
      <div className="cart-items">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <CartSummary
        onCheckout={onCheckout}
        onContinueShopping={onContinueShopping}
      />
    </div>
  );
};

export default CartPage;
