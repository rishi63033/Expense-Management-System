import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { token } = useAuth();

 
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // otherwise, render the protected page
  return children;
}

export default ProtectedRoute;
