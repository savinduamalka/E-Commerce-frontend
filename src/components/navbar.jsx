import React from "react";
import { AiFillHome, AiOutlineCar } from "react-icons/ai";
import { FiLogIn, FiShoppingCart } from "react-icons/fi";
import { MdContactPage } from "react-icons/md";

function Navbar() {
  return (
    <nav className="py-4 text-white bg-blue-600 shadow-md">
      <div className="container flex items-center justify-between mx-auto">
        <div className="flex items-center text-2xl font-bold">
          <img
            src="../logo.png"
            alt="Company Logo"
            className="inline-block w-12 h-12 mr-2"
          />
          AutoMobile SL
        </div>

        <ul className="flex space-x-6 text-lg">
          <li className="flex items-center space-x-2">
            <AiFillHome size={24} />
            <a href="/" className="hover:underline">
              Home
            </a>
          </li>
          <li className="flex items-center space-x-2">
            <AiOutlineCar size={24} />
            <a href="/vehicles" className="hover:underline">
              Vehicles
            </a>
          </li>
          <li className="flex items-center space-x-2">
            <MdContactPage size={24} />
            <a href="/contact" className="hover:underline">
              Contact Us
            </a>
          </li>
          <li className="flex items-center space-x-2">
            <FiShoppingCart size={24} />
            <a href="/cart" className="hover:underline">
              Cart
            </a>
          </li>
          <li className="flex items-center space-x-2">
            <FiLogIn size={24} />
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
