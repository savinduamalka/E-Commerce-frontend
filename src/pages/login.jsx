import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { api } from "../lib/api";
import { Toaster, toast } from "react-hot-toast";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", formData);
      toast.success("Login successful!");
      localStorage.setItem("auth_token", response.data.access_token);
      const userRole = response.data.user.role;
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Invalid email or password.");
      console.error(err);
      toast.error("Invalid email or password.");
    }
  };

  return (
    <>
      <Navbar />
      <Toaster />
      <div
        className="h-[calc(100vh-4rem)] flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: 'url("/home-wallpaper.jpg")',
        }}
      >
        <div className="w-full max-w-md p-8 bg-black rounded-lg shadow-lg bg-opacity-80">
          <h2 className="mb-6 text-3xl font-bold text-center text-white">
            Login to Your Account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block font-medium text-gray-300"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="relative mb-6">
              <label
                htmlFor="password"
                className="block font-medium text-gray-300"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-4 py-2 text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            <button
              type="submit"
              className="w-full py-2 text-lg font-semibold text-black transition duration-200 bg-yellow-500 rounded-md hover:bg-yellow-600"
            >
              Login
            </button>
          </form>
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
          <p className="mt-4 text-center text-gray-400">
            Don't have an account?{" "}
            <a href="/signup" className="text-yellow-400 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
