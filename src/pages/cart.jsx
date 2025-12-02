import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { api } from '../lib/api';
import { toast } from 'react-hot-toast';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get('/cart');
        setCartItems(
          Array.isArray(response.data.cart.items)
            ? response.data.cart.items
            : []
        );
        if (response.data.cart.items.length === 0) {
          clearInterval(intervalId);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setCartItems([]); // Clear cart items if the cart is not found
          clearInterval(intervalId);
        } else {
          console.error('There was an error fetching the cart items!', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
    const id = setInterval(fetchCartItems, 5000);
    setIntervalId(id);

    return () => clearInterval(id);
  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
      await api.delete(`/cart/${itemId}`);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
      toast.success('Item removed from cart successfully!');
    } catch (error) {
      console.error(
        'There was an error removing the item from the cart!',
        error
      );
      toast.error('Failed to remove item from cart.');
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await api.post('/orders', {
        items: cartItems.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),
      });
      toast.success('Order created successfully!');

      // Clear cart items on the backend
      await api.delete('/cart');
      setCartItems([]); // Clear cart items on the frontend

      // Stop the interval that fetches cart items
      if (intervalId) {
        clearInterval(intervalId);
      }
    } catch (error) {
      console.error('There was an error creating the order!', error);
      toast.error('Failed to create order.');
    }
  };

  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <div className="container px-4 mx-auto my-12">
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-100">
          Your Cart
        </h1>
        {loading ? (
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 bg-gray-900 rounded-lg shadow-lg"
                >
                  <Skeleton
                    height={192}
                    width="100%"
                    className="mb-4 rounded-lg"
                  />
                  <Skeleton height={32} width="60%" className="mb-2" />
                  <Skeleton height={28} width="40%" className="mb-4" />
                  <Skeleton height={40} width={100} className="rounded-lg" />
                </div>
              ))}
            </div>
          </SkeletonTheme>
        ) : cartItems.length === 0 ? (
          <p className="text-center text-gray-300">No items in the cart.</p>
        ) : (
          <>
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
                  <p className="mb-4 text-xl text-yellow-400">
                    LKR {item.price * item.quantity}M
                  </p>
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
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
