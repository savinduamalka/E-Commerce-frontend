import React, { useEffect, useState } from "react";
import { FaUser, FaThList, FaShoppingCart, FaBoxOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";

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
      <aside className="w-64 h-screen text-white bg-blue-800">
        <div className="p-4 text-xl font-bold text-center border-b border-blue-600">
          Admin Dashboard
        </div>
        <nav className="mt-4">
          <ul>
            <li className="p-4 hover:bg-blue-700">
              <Link to="/admin/users" className="flex items-center gap-2">
                <FaUser />
                Users
              </Link>
            </li>
            <li className="p-4 hover:bg-blue-700">
              <Link to="/admin/categories" className="flex items-center gap-2">
                <FaThList />
                Categories
              </Link>
            </li>
            <li className="p-4 hover:bg-blue-700">
              <Link to="/admin/products" className="flex items-center gap-2">
                <FaBoxOpen />
                Products
              </Link>
            </li>
            <li className="p-4 hover:bg-blue-700">
              <Link to="/admin/cart" className="flex items-center gap-2">
                <FaShoppingCart />
                Cart
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
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
