import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navigation from './components/Navigation/Navigation';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('products');
  const [orderData, setOrderData] = useState(null);

  const handleShowProducts = () => setCurrentPage('products');
  const handleShowCart = () => setCurrentPage('cart');
  const handleCheckout = () => setCurrentPage('checkout');
  const handleOrderSuccess = (data) => {
    setOrderData(data);
    setCurrentPage('success');
  };

  return (
    <CartProvider>
      <Navigation
        onShowProducts={handleShowProducts}
        onShowCart={handleShowCart}
      />
      <div className="app-container">
        {currentPage === 'products' && (
          <ProductsPage />
        )}

        {currentPage === 'cart' && (
          <CartPage
            onCheckout={handleCheckout}
            onContinueShopping={handleShowProducts}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage
            onSuccess={handleOrderSuccess}
            onBack={handleShowCart}
          />
        )}

        {currentPage === 'success' && (
          <SuccessPage
            orderData={orderData}
            onNewOrder={handleShowProducts}
          />
        )}
      </div>
    </CartProvider>
  );
}

const SuccessPage = ({ orderData, onNewOrder }) => {
  if (!orderData) return null;

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
              {item.name} × {item.quantity} = {item.price * item.quantity} PLN
            </div>
          ))}
        </div>
        <div className="order-total-row">
          Razem: {orderData.total} PLN
        </div>
      </div>
      <button className="btn btn-secondary" onClick={onNewOrder}>
        Złóż nowe zamówienie
      </button>
    </div>
  );
};

export default App;
