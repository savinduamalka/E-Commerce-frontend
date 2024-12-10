import React, { useState, useEffect } from "react";
import { api } from "../lib/api";
import Navbar from "../components/navbar";

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
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container p-8 mx-auto">
        <h2 className="mb-6 text-2xl font-bold">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded"
              value={formData.name || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-gray-100 border rounded"
              value={formData.email || ""}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              className="w-full px-4 py-2 border rounded"
              value={formData.city || ""}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
}

export default EditUserProfile;
