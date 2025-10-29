import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/signup", formData);

      if (res.data.success) {
        alert("Signup successful! Please log in to continue.");
        navigate("/login");
      } else {
        setError(res.data.message || "Something went wrong");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
