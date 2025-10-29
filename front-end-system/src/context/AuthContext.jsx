import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
  try {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || storedUser === "undefined" || storedUser === "null") {
      return null;
    }
    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
    return null;
  }
});


  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  //  Login handler
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);
  };

  //  Logout handler
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expiry = payload.exp * 1000;
      if (Date.now() > expiry) {
        logout();
      }
    } catch (err) {
      console.error("Invalid token:", err);
      logout();
    }
  }
}, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
