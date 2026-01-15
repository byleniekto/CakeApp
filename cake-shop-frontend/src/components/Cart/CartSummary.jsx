import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import ConfirmModal from '../UI/ConfirmModal';
import './Cart.css';

const CartSummary = ({ onCheckout, onContinueShopping }) => {
  const { getCartTotal, getCartCount, clearCart } = useCart();
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleClearClick = () => {
    setShowConfirmClear(true);
  };

  const handleConfirmClear = () => {
    clearCart();
    setShowConfirmClear(false);
  };

  const handleCancelClear = () => {
    setShowConfirmClear(false);
  };

  return (
    <>
      <div className="cart-summary">
        <div className="summary-row">
          <span>Ilość przedmiotów:</span>
          <span>{getCartCount()}</span>
        </div>
        <div className="summary-row total">
          <span>Razem:</span>
          <span>{getCartTotal()} PLN</span>
        </div>
        <div className="checkout-buttons">
          <button
            className="btn btn-outline"
            type="button"
            onClick={handleClearClick}
          >
            Wyczyść koszyk
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={onContinueShopping}
          >
            Dalej zakupy
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={onCheckout}
          >
            Przejdź do kasy
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirmClear}
        title="Wyczyścić koszyk?"
        message="Czy na pewno chcesz usunąć wszystkie produkty z koszyka?"
        confirmLabel="Wyczyść"
        cancelLabel="Anuluj"
        onConfirm={handleConfirmClear}
        onCancel={handleCancelClear}
      />
    </>
  );
};

export default CartSummary;
