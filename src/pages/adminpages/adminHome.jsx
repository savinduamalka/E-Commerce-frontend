import React, { useEffect, useState } from "react";
import { FaUser, FaThList, FaShoppingCart, FaBoxOpen } from "react-icons/fa";
import { api } from "../../lib/api";
import AdminSidebar from "../../components/adminsidebar";

export default function AdminHome() {
  const [stats, setStats] = useState({
    total_users: 0,
    total_categories: 0,
    total_products: 0,
    total_cart_items: 0,
  });

  const fetchStats = async () => {
    try {
      const response = await api.get("/admin/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, Admin!</h1>
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
            <div className="flex items-center justify-between">
              <FaUser className="text-3xl text-blue-600" />
              <span className="text-4xl font-bold text-gray-800">
                {stats.total_users}
              </span>
            </div>
            <p className="mt-2 text-gray-600">Total Users</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
            <div className="flex items-center justify-between">
              <FaThList className="text-3xl text-green-600" />
              <span className="text-4xl font-bold text-gray-800">
                {stats.total_categories}
              </span>
            </div>
            <p className="mt-2 text-gray-600">Categories</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
            <div className="flex items-center justify-between">
              <FaBoxOpen className="text-3xl text-orange-600" />
              <span className="text-4xl font-bold text-gray-800">
                {stats.total_products}
              </span>
            </div>
            <p className="mt-2 text-gray-600">Products</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
            <div className="flex items-center justify-between">
              <FaShoppingCart className="text-3xl text-red-600" />
              <span className="text-4xl font-bold text-gray-800">
                {stats.total_cart_items}
              </span>
            </div>
            <p className="mt-2 text-gray-600">Items in Cart</p>
          </div>
        </div>
      </main>
    </div>
  );
}
