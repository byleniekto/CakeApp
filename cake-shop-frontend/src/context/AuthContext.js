import React, { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const mockUsers = [
  {
    id: 1,
    name: "Test User",
    email: "test@cakeshop.pl",
    password: "123456",
    phone: "",
    address: "",
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(mockUsers);

  const login = ({ email, password }) => {
    const existingUser = users.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password,
    );

    if (!existingUser) {
      return {
        success: false,
        message: "Nieprawidłowy email lub hasło.",
      };
    }

    setUser({
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      phone: existingUser.phone || "",
      address: existingUser.address || "",
    });

    return { success: true };
  };

  const register = ({ name, email, password }) => {
    const emailExists = users.some(
      (item) => item.email.toLowerCase() === email.toLowerCase(),
    );

    if (emailExists) {
      return {
        success: false,
        message: "Konto z takim adresem email już istnieje.",
      };
    }

    const newUser = {
      id: Date.now(),
      name: name?.trim() || email.split("@")[0],
      email,
      password,
      phone: "",
      address: "",
    };

    setUsers((prev) => [...prev, newUser]);
    setUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: "",
      address: "",
    });

    return { success: true };
  };

  const registerFromOrder = ({ orderData, password }) => {
    const email = orderData?.customerEmail?.trim();

    if (!email) {
      return {
        success: false,
        message: "Brak adresu email w zamówieniu.",
      };
    }

    const emailExists = users.some(
      (item) => item.email.toLowerCase() === email.toLowerCase(),
    );

    if (emailExists) {
      return {
        success: false,
        message:
          "Konto z tym adresem email już istnieje. Możesz się zalogować.",
      };
    }

    const newUser = {
      id: Date.now(),
      name: orderData.customerName || email.split("@")[0],
      email,
      password,
      phone: orderData.customerPhone || "",
      address: orderData.customerAddress || "",
    };

    setUsers((prev) => [...prev, newUser]);
    setUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      address: newUser.address,
    });

    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      register,
      registerFromOrder,
      logout,
    }),
    [user, users],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
