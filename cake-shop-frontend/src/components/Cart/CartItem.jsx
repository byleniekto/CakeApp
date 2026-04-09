import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import ConfirmModal from "../UI/ConfirmModal";
import "./Cart.css";

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
        <div className="cart-item-details">
          <div className="cart-item-name">{item.name}</div>
          <div className="cart-item-price">{item.price} PLN / szt.</div>
        </div>

        <div className="cart-item-qty">
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={handleQuantityChange}
          />
        </div>

        <div className="cart-item-actions">
          <div className="cart-item-total">
            {item.price * item.quantity} PLN
          </div>

          <button className="btn-remove" onClick={handleRemoveClick}>
            Usuń
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirmRemove}
        message={`Czy na pewno chcesz usunąć "${item.name}" z koszyka?`}
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
      />
    </>
  );
};

export default CartItem;
