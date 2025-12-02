import React, { useState, useEffect } from 'react';
import { AiFillHome, AiOutlineCar } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { FiLogIn, FiShoppingCart } from 'react-icons/fi';
import { MdContactPage } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setIsLoggedIn(!!token);

    fetchCartItems();
    const intervalId = setInterval(fetchCartItems, 2000);

    // Add scroll event listener
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fetchCartItems = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    try {
      const response = await api.get('/cart');
      setCartItems(
        Array.isArray(response.data.cart.items) ? response.data.cart.items : []
      );
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setCartItems([]);
      } else if (error.response && error.response.status === 401) {
        // Silently handle unauthorized errors
      } else {
        console.error('There was an error fetching the cart items!', error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownVisible(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuVisible((prev) => !prev);
  };

  const handleEditProfile = () => {
    closeDropdown();
    navigate('/editUserprofile');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById('dropdown-menu');
      const accountButton = document.getElementById('account-button');

      if (
        dropdown &&
        !dropdown.contains(event.target) &&
        accountButton !== event.target &&
        !accountButton.contains(event.target)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Calculate total items in cart
  const cartItemCount = cartItems.length;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 mb-16 bg-black shadow-lg`}
      >
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center">
              <img
                src="../logo.jpg"
                alt="Company Logo"
                className="w-auto h-10 mr-3 rounded"
              />
              <span className="text-xl font-bold text-white">
                AutoMobile SL
              </span>
            </div>

            {/* Navigation Links */}
            <div className="items-center hidden space-x-1 md:flex">
              <NavLink
                href="/"
                icon={
                  <AiFillHome className="text-gray-400 group-hover:text-white" />
                }
                text="Home"
              />
              <NavLink
                href="/categories"
                icon={
                  <BiCategory className="text-gray-400 group-hover:text-white" />
                }
                text="Categories"
              />
              <NavLink
                href="/products"
                icon={
                  <AiOutlineCar className="text-gray-400 group-hover:text-white" />
                }
                text="Vehicles"
              />
              <NavLink
                href="/contact"
                icon={
                  <MdContactPage className="text-gray-400 group-hover:text-white" />
                }
                text="Contact"
              />

              {/* Cart with badge */}
              <div className="relative group">
                <NavLink
                  href="/cart"
                  icon={
                    <FiShoppingCart
                      className={`text-gray-400 group-hover:text-white ${
                        cartItemCount > 0 ? 'animate-pulse' : ''
                      }`}
                    />
                  }
                  text="Cart"
                />
                {cartItemCount > 0 && (
                  <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full -top-1 -right-1">
                    {cartItemCount}
                  </span>
                )}
              </div>

              {/* Account/Login Section */}
              {isLoggedIn ? (
                <div className="relative ml-2">
                  <button
                    id="account-button"
                    onClick={toggleDropdown}
                    className="flex items-center px-3 py-2 space-x-2 font-bold transition-colors duration-200 bg-yellow-500 rounded-full group hover:bg-yellow-600"
                  >
                    <FaUserCircle className="text-black group-hover:text-white" />
                    <span className="text-sm font-bold text-black group-hover:text-white">
                      Account
                    </span>
                  </button>

                  {isDropdownVisible && (
                    <div
                      id="dropdown-menu"
                      className="absolute right-0 w-48 py-1 mt-2 bg-black rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <DropdownItem onClick={handleEditProfile}>
                        Edit Profile
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          closeDropdown();
                          handleLogout();
                        }}
                      >
                        Logout
                      </DropdownItem>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  href="/login"
                  icon={
                    <FiLogIn className="text-black group-hover:text-white" />
                  }
                  text="Login"
                  highlight={true}
                />
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                className="p-2 text-gray-300 rounded-md mobile-menu-button hover:text-white hover:bg-gray-800 focus:outline-none"
                onClick={toggleMobileMenu}
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, hidden by default */}
        <div
          className={`mobile-menu md:hidden ${
            isMobileMenuVisible ? 'block' : 'hidden'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/" text="Home" />
            <MobileNavLink href="/categories" text="Categories" />
            <MobileNavLink href="/products" text="Vehicles" />
            <MobileNavLink href="/contact" text="Contact Us" />
            <MobileNavLink href="/cart" text="Cart" />
            {isLoggedIn ? (
              <>
                <MobileNavLink href="/editUserprofile" text="Edit Profile" />
                <button
                  onClick={handleLogout}
                  className="block w-full px-3 py-2 text-left text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <MobileNavLink href="/login" text="Login" />
            )}
          </div>
        </div>
      </nav>
      <div className="mt-16">{/* Page content starts here */}</div>
    </>
  );
}

// Helper Components
const NavLink = ({ href, icon, text, highlight }) => (
  <a
    href={href}
    className={`group flex items-center px-3 py-2 text-sm font-bold rounded-full transition-colors duration-200 
      ${
        highlight
          ? 'bg-yellow-500 text-black hover:bg-yellow-600'
          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }`}
  >
    <span className="mr-2">{icon}</span>
    <span>{text}</span>
  </a>
);

const MobileNavLink = ({ href, text }) => (
  <a
    href={href}
    className="block px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
  >
    {text}
  </a>
);

const DropdownItem = ({ onClick, children }) => (
  <button
    className="block w-full px-4 py-2 text-sm font-bold text-left text-white transition-colors duration-200 rounded hover:bg-yellow-500 hover:text-black"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Navbar;
