import React from "react";
import { FaUser, FaThList, FaShoppingCart, FaBoxOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
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
  );
}
