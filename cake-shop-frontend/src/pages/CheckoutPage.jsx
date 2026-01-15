import React from 'react';
import { useCart } from '../context/CartContext';
import OrderForm from '../components/OrderForm/OrderForm';
import '../styles/pages.css';

const CheckoutPage = ({ onSuccess, onBack }) => {
  const { cart, getCartTotal, clearCart } = useCart();

  const handleSubmit = (formData) => {
    const items = Object.values(cart);

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
      date: new Date().toLocaleDateString('pl-PL'),
    };

    // tutaj później można wysłać orderData do backendu
    console.log('Zamówienie:', orderData);
    clearCart();
    onSuccess(orderData);
  };

  return (
    <div>
      <h2 className="page-title">Finalizuj zamówienie</h2>
      <OrderForm onSubmit={handleSubmit} onCancel={onBack} />
    </div>
  );
};

export default CheckoutPage;
