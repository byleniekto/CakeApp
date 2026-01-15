import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import ConfirmModal from '../UI/ConfirmModal';
import './Cart.css';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const [showConfirmRemove, setShowConfirmRemove] = useState(false);

  const handleRemoveClick = () => {
    setShowConfirmRemove(true);
  };

  const handleConfirmRemove = () => {
    removeFromCart(item.id);
    setShowConfirmRemove(false);
  };

  const handleCancelRemove = () => {
    setShowConfirmRemove(false);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (Number.isNaN(value) || value <= 0) return;
    updateQuantity(item.id, value);
  };

  return (
    <>
      <div className="cart-item">
        <div className="cart-item-info">
          <span className="cart-item-name">
            {item.emoji} {item.name}
          </span>
          <span className="cart-item-price">
            {item.price} PLN / szt.
          </span>
        </div>
        <div className="cart-item-actions">
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={handleQuantityChange}
            className="cart-item-qty"
          />
          <span className="cart-item-total">
            {item.price * item.quantity} PLN
          </span>
          <button className="btn btn-danger" onClick={handleRemoveClick}>
            Usuń
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirmRemove}
        title="Usunąć produkt?"
        message={`Czy na pewno chcesz usunąć "${item.name}" z koszyka?`}
        confirmLabel="Usuń"
        cancelLabel="Anuluj"
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
      />
    </>
  );
};

export default CartItem;
