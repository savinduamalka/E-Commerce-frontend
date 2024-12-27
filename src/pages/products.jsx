import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { api } from "../lib/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Product() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0
  });

  const getProducts = async (page = 1) => {
    try {
      const response = await api.get(`/products?page=${page}`);
      setProducts(response.data.data);
      setPagination({
        current_page: response.data.meta.current_page,
        last_page: response.data.meta.last_page,
        per_page: response.data.meta.per_page,
        total: response.data.meta.total
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    try {
      const response = await api.post("/cart", {
        items: [{ product_id: product.id, quantity: 1 }],
      });
      console.log("Cart response:", response.data);
      setCart((prevCart) => [...prevCart, ...response.data.cart.items]);
      console.log("Cart:", [...cart, ...response.data.cart.items]);
      toast.success("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError("Failed to add product to cart. Please try again later.");
      toast.error("Failed to add product to cart.");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <ToastContainer />
      <div
        className="container px-4 py-12 mx-auto"
        style={{
          backgroundImage: 'url("/home-wallpaper.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-100">
          Vehicles
        </h1>

        {loading && (
          <p className="text-center text-gray-300">Loading products...</p>
        )}

        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && products.length === 0 && (
          <p className="text-center text-gray-300">No products found.</p>
        )}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden transition-transform duration-300 bg-gray-900 rounded-lg shadow-lg hover:scale-105"
            >
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
                className="object-cover w-full h-40"
              />
              <div className="p-4 text-gray-100">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="mt-2 text-gray-400">{product.description}</p>
                <p className="mt-2 font-bold text-gray-100">
                  LKR {product.price}M
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full px-4 py-2 mt-4 font-semibold text-center text-black transition-colors duration-300 bg-yellow-500 rounded hover:bg-yellow-600"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between px-4 py-3 mt-8 bg-gray-900 border border-gray-700 rounded-lg">
          <div className="flex justify-between flex-1 sm:hidden">
            <button
              onClick={() => getProducts(pagination.current_page - 1)}
              disabled={pagination.current_page === 1}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-200 bg-gray-800 border border-gray-600 rounded-md ${
                pagination.current_page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => getProducts(pagination.current_page + 1)}
              disabled={pagination.current_page === pagination.last_page}
              className={`relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-200 bg-gray-800 border border-gray-600 rounded-md ${
                pagination.current_page === pagination.last_page ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-300">
                Showing{" "}
                <span className="font-medium">
                  {(pagination.current_page - 1) * pagination.per_page + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(pagination.current_page * pagination.per_page, pagination.total)}
                </span>{" "}
                of <span className="font-medium">{pagination.total}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm">
                <button
                  onClick={() => getProducts(pagination.current_page - 1)}
                  disabled={pagination.current_page === 1}
                  className={`relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-600 rounded-l-md ${
                    pagination.current_page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
                  }`}
                >
                  Previous
                </button>
                {[...Array(pagination.last_page)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => getProducts(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border ${
                      pagination.current_page === index + 1
                        ? "z-10 bg-yellow-500 border-yellow-500 text-black"
                        : "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => getProducts(pagination.current_page + 1)}
                  disabled={pagination.current_page === pagination.last_page}
                  className={`relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-600 rounded-r-md ${
                    pagination.current_page === pagination.last_page ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
