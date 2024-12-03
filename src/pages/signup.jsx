import React, { useState } from "react";
import { api } from "../lib/api";
import Navbar from "../components/navbar";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/register", formData);
      alert("User created successfully!");
      console.log(response.data); 
    } catch (err) {
      setError("An error occurred while creating the account.");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300"
        style={{
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/soft-wallpaper.png")',
          backgroundSize: "cover",
        }}
      >
        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="city" className="block font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your city"
                required
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>
          {error && <p className="mt-4 text-center text-red-600">{error}</p>}
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;
