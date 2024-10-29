import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password?: string) => boolean;
  logout: () => void;
  role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const auth = localStorage.getItem("auth") === "true";
    const storedRole = localStorage.getItem("role") || "";
    setIsAuthenticated(auth);
    setRole(storedRole);
  }, []);

  const login = (username: string, password?: string) => {
    if (
      username === import.meta.env.VITE_USER1_LOGIN &&
      password === import.meta.env.VITE_USER1_PASSWORD
    ) {
      setIsAuthenticated(true);
      setRole(import.meta.env.VITE_USER1_ROLE || "admin");
      localStorage.setItem("auth", "true");
      localStorage.setItem("role", "admin");
      navigate("/painel-de-sugestoes/gerenciar");
      return true;
    } else if (username === "guest") {
      setIsAuthenticated(true);
      setRole("guest");
      localStorage.setItem("auth", "true");
      localStorage.setItem("role", "guest");
      navigate("/inicio");
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole("");
    localStorage.removeItem("auth");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};
