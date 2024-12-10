import React, { useState, useEffect } from "react";
import { AiFillHome, AiOutlineCar } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FiLogIn, FiShoppingCart } from "react-icons/fi";
import { MdContactPage } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownVisible(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById("dropdown-menu");
      const accountButton = document.getElementById("account-button");

      if (
        dropdown &&
        !dropdown.contains(event.target) &&
        accountButton !== event.target &&
        !accountButton.contains(event.target)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="py-4 text-white bg-black shadow-md">
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
            <BiCategory size={24} />
            <a href="/categories" className="hover:underline">
              Categories
            </a>
          </li>
          <li className="flex items-center space-x-2">
            <AiOutlineCar size={24} />
            <a href="/products" className="hover:underline">
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

          {isLoggedIn ? (
            <li className="relative">
              <button
                id="account-button"
                onClick={toggleDropdown}
                className="flex items-center space-x-2 hover:underline"
              >
                <FaUserCircle size={24} />
                <span>Account</span>
              </button>

           
              {isDropdownVisible && (
                <ul
                  id="dropdown-menu"
                  className="absolute right-0 z-50 w-48 p-2 mt-2 text-black bg-white border rounded shadow-lg"
                >
                  <li>
                    <button
                      className="w-full px-4 py-2 text-left hover:bg-gray-200"
                      onClick={() => {
                        closeDropdown();
                        navigate("/editUserprofile");
                      }}
                    >
                      Edit Profile
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full px-4 py-2 text-left hover:bg-gray-200"
                      onClick={() => {
                        closeDropdown();
                        handleLogout();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <li className="flex items-center space-x-2">
              <FiLogIn size={24} />
              <a href="/login" className="hover:underline">
                Login/Signup
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
