import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { api } from "../lib/api";
import { ToastContainer, toast } from "react-toastify";


function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get("/cart");
        console.log(response.data);
        setCartItems(Array.isArray(response.data.cart.items) ? response.data.cart.items : []);
      } catch (error) {
        console.error("There was an error fetching the cart items!", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
      await api.delete(`/cart/${itemId}`);
      setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
      toast.success("Item removed from cart successfully!");
    } catch (error) {
      console.error("There was an error removing the item from the cart!", error);
      toast.error("Failed to remove item from cart.");
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await api.post("/orders", {
        items: cartItems.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity
        }))
      });
      console.log("Order response:", response.data);
      toast.success("Order created successfully!");

      // Clear cart items on the backend
      await api.delete("/cart");
      setCartItems([]); // Clear cart items on the frontend
    } catch (error) {
      console.error("There was an error creating the order!", error);
      toast.error("Failed to create order.");
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <ToastContainer />
      <div className="container px-4 mx-auto my-12">
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-100">
          Your Cart
        </h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center p-6 transition-transform duration-300 transform bg-gray-900 rounded-lg shadow-lg hover:scale-105"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="object-cover w-full h-48 mb-4 rounded-lg"
              />
              <h2 className="mb-2 text-2xl font-semibold text-gray-100">
                {item.product.name}
              </h2>
              <p className="mb-4 text-xl text-yellow-400">LKR {item.product.price * item.quantity}M</p>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="px-6 py-2 text-black bg-yellow-400 rounded-lg shadow-md hover:bg-yellow-500 focus:outline-none"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="mt-12 text-right">
          <h2 className="text-3xl font-bold text-gray-100">
            Total: LKR {totalPrice}M
          </h2>
          <button
            onClick={handleCheckout}
            className="px-8 py-3 mt-6 text-lg text-black transition-all duration-300 bg-yellow-400 rounded-lg shadow-lg hover:bg-yellow-500 focus:outline-none"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;