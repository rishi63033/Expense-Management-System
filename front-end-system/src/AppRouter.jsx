import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/dashboard/Profile";
import Expenses from "./pages/dashboard/Expenses";
import Income from "./pages/dashboard/Income";
import Summary from "./pages/dashboard/Summary";
import ProtectedRoute from "./components/ProtectedRoute";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="income" element={<Income />} />
          <Route path="summary" element={<Summary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
