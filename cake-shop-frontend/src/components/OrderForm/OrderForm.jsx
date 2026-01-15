import React, { useState } from 'react';
import './OrderForm.css';

const OrderForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    customerNotes: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.customerName ||
      !formData.customerEmail ||
      !formData.customerPhone ||
      !formData.customerAddress
    ) {
      alert('Proszę wypełnić wszystkie wymagane pola!');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="customerName">Imię i nazwisko *</label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          placeholder="Jan Kowalski"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="customerEmail">Email *</label>
        <input
          type="email"
          id="customerEmail"
          name="customerEmail"
          value={formData.customerEmail}
          onChange={handleChange}
          placeholder="jan@example.com"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="customerPhone">Telefon *</label>
        <input
          type="tel"
          id="customerPhone"
          name="customerPhone"
          value={formData.customerPhone}
          onChange={handleChange}
          placeholder="123-456-789"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="customerAddress">Adres dostawy *</label>
        <input
          type="text"
          id="customerAddress"
          name="customerAddress"
          value={formData.customerAddress}
          onChange={handleChange}
          placeholder="ul. Główna 1, 80-001 Gdańsk"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="customerNotes">Uwagi do zamówienia</label>
        <textarea
          id="customerNotes"
          name="customerNotes"
          value={formData.customerNotes}
          onChange={handleChange}
          placeholder="Np. bez cukru, data dostawy..."
        />
      </div>

      <div className="checkout-buttons">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Wróć do koszyka
        </button>
        <button type="submit" className="btn btn-primary">
          Złóż zamówienie
        </button>
      </div>
    </form>
  );
};

export default OrderForm;
