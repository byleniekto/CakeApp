import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/pages.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="profile-card">
      <h2 className="page-title">Panel klienta</h2>

      <div className="profile-row">
        <span>Imię:</span>
        <strong>{user?.name || "—"}</strong>
      </div>

      <div className="profile-row">
        <span>Email:</span>
        <strong>{user?.email || "—"}</strong>
      </div>

      <div className="profile-row">
        <span>Telefon:</span>
        <strong>{user?.phone || "—"}</strong>
      </div>

      <div className="profile-row">
        <span>Adres:</span>
        <strong>{user?.address || "—"}</strong>
      </div>

      <div className="auth-choice-actions">
        <button className="btn btn-outline" onClick={() => navigate("/")}>
          Wróć do sklepu
        </button>

        <button className="btn btn-secondary" onClick={handleLogout}>
          Wyloguj
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
