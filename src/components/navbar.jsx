import React from "react";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <img
            src="https://via.placeholder.com/40"
            alt="Company Logo"
            className="inline-block mr-2"
          />
          AutoMobile SL
        </div>
        <ul className="flex space-x-6">
          <li>
            <a href="/" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="/vehicles" className="hover:underline">
              Vehicles
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:underline">
              Contact Us
            </a>
          </li>
          <li>
            <a href="/login" className="hover:underline">
              Login/Signup
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
