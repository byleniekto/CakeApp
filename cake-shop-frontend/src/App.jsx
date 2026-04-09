import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navigation from "./components/Navigation/Navigation";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";
import "./App.css";

function AppRoutes() {
  const navigate = useNavigate();

  return (
    <>
      <Navigation
        onShowProducts={() => navigate("/")}
        onShowCart={() => navigate("/cart")}
      />

      <div className="app-container">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route
            path="/cart"
            element={
              <CartPage
                onCheckout={() => navigate("/checkout")}
                onContinueShopping={() => navigate("/")}
              />
            }
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
}

export default App;
