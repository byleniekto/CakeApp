import React, { useEffect, useState } from "react";
import "./OrderForm.css";

const emptyForm = {
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  customerAddress: "",
  customerNotes: "",
};

const OrderForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    setFormData(initialData || emptyForm);
  }, [initialData]);

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
      setError("Proszę wypełnić wszystkie wymagane pola.");
      return;
    }

    setError("");
    onSubmit(formData);
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="customerName">Imię i nazwisko</label>
        <input
          id="customerName"
          name="customerName"
          type="text"
          value={formData.customerName}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="customerEmail">Adres e-mail</label>
        <input
          id="customerEmail"
          name="customerEmail"
          type="email"
          value={formData.customerEmail}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="customerPhone">Telefon</label>
        <input
          id="customerPhone"
          name="customerPhone"
          type="text"
          value={formData.customerPhone}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="customerAddress">Adres dostawy</label>
        <textarea
          id="customerAddress"
          name="customerAddress"
          value={formData.customerAddress}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="customerNotes">Uwagi do zamówienia</label>
        <textarea
          id="customerNotes"
          name="customerNotes"
          value={formData.customerNotes}
          onChange={handleChange}
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Wróć
        </button>

        <button type="submit" className="btn btn-secondary">
          Złóż zamówienie
        </button>
      </div>
    </form>
  );
};

export default OrderForm;
