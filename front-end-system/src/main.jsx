import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";  
import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
      <Toaster position="top-right" reverseOrder={false} /> {/* ✅ added */}
    </AuthProvider>
  </React.StrictMode>
);
