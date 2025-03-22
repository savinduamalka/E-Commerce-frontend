import React, { useState } from "react";
import { FaUser, FaThList, FaShoppingCart, FaBoxOpen, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button - only visible on small screens */}
      <button 
        className="fixed z-20 p-2 text-white bg-blue-800 rounded-md md:hidden top-4 left-4"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>
      
      {/* Sidebar */}
      <aside 
        className={`fixed z-10 h-screen text-white bg-blue-800 transition-all duration-300 ease-in-out 
                   ${sidebarOpen ? 'w-64 left-0' : '-left-64 md:left-0'} 
                   md:w-64`}
      >
        <div className="p-4 text-xl font-bold text-center border-b border-blue-600">
          <Link to="/admin" className="hover:underline">Admin Dashboard</Link>
        </div>
        <nav className="mt-4">
          <ul>
            <li className="p-4 hover:bg-blue-700">
              <Link to="/admin/users" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
                <FaUser />
                <span>Users</span>
              </Link>
            </li>
            <li className="p-4 hover:bg-blue-700">
              <Link to="/admin/categories" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
                <FaThList />
                <span>Categories</span>
              </Link>
            </li>
            <li className="p-4 hover:bg-blue-700">
              <Link to="/admin/products" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
                <FaBoxOpen />
                <span>Products</span>
              </Link>
            </li>
            <li className="p-4 hover:bg-blue-700">
              <Link to="/admin/orders" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
                <FaShoppingCart />
                <span>Orders</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      
      {/* Overlay for mobile - only appears when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-0 bg-black bg-opacity-50 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
