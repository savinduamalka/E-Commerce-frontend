import React from "react";
import { AiFillHome, AiOutlineCar } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { MdContactPage } from "react-icons/md";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center text-2xl font-bold">
          <img
            src="../logo.png"
            alt="Company Logo"
            className="inline-block mr-2 h-12 w-12"
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
