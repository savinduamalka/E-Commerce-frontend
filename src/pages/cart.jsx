import React from "react";
import Navbar from "../components/navbar";

function Cart() {
  const cartItems = [
    {
      id: 1,
      name: "Toyota Prado J150 2009",
      price: 30.8,
      image: "../cart1.jpg",
    },
    {
      id: 2,
      name: "BMW 520d 2015",
      price: 25.2,
      image: "../cart2.jpg",
    },
    {
      id: 3,
      name: "Nissan Xtrail 2016",
      price: 15.2,
      image: "../cart3.jpg",
    },
  ];

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <Navbar />
      <div className="container px-4 mx-auto my-12">
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">
          Your Cart
        </h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center p-6 transition-transform duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-48 mb-4 rounded-lg"
              />
              <h2 className="mb-2 text-2xl font-semibold text-gray-800">
                {item.name}
              </h2>
              <p className="mb-4 text-xl text-gray-600">LKR {item.price}M</p>
              <button className="px-6 py-2 text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 focus:outline-none">
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="mt-12 text-right">
          <h2 className="text-3xl font-bold text-gray-800">
            Total: LKR {totalPrice}M{" "}
          </h2>
          <button className="px-8 py-3 mt-6 text-lg text-white transition-all duration-300 bg-green-500 rounded-lg shadow-lg hover:bg-green-600 focus:outline-none">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
