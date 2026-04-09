import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Navigation from "./components/Navigation/Navigation";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import "./App.css";

function AppRoutes() {
  const navigate = useNavigate();

  return (
    <>
      <Navigation
        onShowProducts={() => navigate("/")}
        onShowCart={() => navigate("/cart")}
        onShowAuth={() => navigate("/auth")}
        onShowProfile={() => navigate("/profile")}
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
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
