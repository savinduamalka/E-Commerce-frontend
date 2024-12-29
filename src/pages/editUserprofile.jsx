import React, { useState, useEffect } from "react";
import { api } from "../lib/api";
import Navbar from "../components/navbar";
import { Toaster, toast } from "react-hot-toast";

function EditUserProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/user/me");
        setFormData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/user/me", { name: formData.name, city: formData.city });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again later.");
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
        <div className="w-full max-w-lg p-8 bg-black rounded-lg shadow-lg bg-opacity-80">
          <h2 className="mb-6 text-3xl font-bold text-center text-white">
            Edit Your Profile
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={formData.name || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block font-medium text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 text-gray-400 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={formData.email || ""}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block font-medium text-gray-300">
                City
              </label>
              <input
                type="text"
                id="city"
                className="w-full px-4 py-2 text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={formData.city || ""}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-lg font-semibold text-black transition duration-200 bg-yellow-500 rounded-md hover:bg-yellow-600"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditUserProfile;
