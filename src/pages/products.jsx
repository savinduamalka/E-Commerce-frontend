import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../components/navbar";
import { api } from "../lib/api";
import { Toaster, toast } from "react-hot-toast"; // Import react-hot-toast

const Product = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0,
  });

  // Optimized function to fetch products with pagination
  const getProducts = useCallback(async (page = 1) => {
    setLoading(true); // Show loading while fetching
    try {
      const response = await api.get(`/products?page=${page}`);
      console.log("Fetched products:", response.data);
      setProducts((prev) => (page === 1 ? response.data.data : [...prev, ...response.data.data]));
      setPagination({
        current_page: response.data.meta.current_page,
        last_page: response.data.meta.last_page,
        per_page: response.data.meta.per_page,
        total: response.data.meta.total,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Optimized function to add items to the cart
  const addToCart = async (product) => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      toast.error("You need to log in to continue.", {
        style: {
          background: "#dc3545",
          color: "#fff",
          fontWeight: "bold",
        },
      });
      return;
    }

    try {
      const response = await api.post("/cart", {
        items: [{ product_id: product.id, quantity: 1 }],
      });
      setCart((prevCart) => [...prevCart, ...response.data.cart.items]);

      // Show success toast with custom style
      toast.success("Product added to cart successfully!", {
        style: {
          background: "#28a745",
          color: "#fff",
          fontWeight: "bold",
        },
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart.", {
        style: {
          background: "#dc3545",
          color: "#fff",
          fontWeight: "bold",
        },
      });
    }
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // Function to format amount in LKR (Sri Lankan Rupees in Millions)
  const formatLKR = (amount) => {
    return `LKR ${Number(amount).toFixed(1)} M`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <Toaster /> {/* Toaster component to display notifications */}
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
          <div className="flex flex-wrap justify-center gap-4">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="w-48 h-64 bg-gray-700 rounded-lg animate-pulse" />
            ))}
          </div>
        )}

        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && products.length === 0 && (
          <p className="text-center text-gray-300">No products found.</p>
        )}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              formatLKR={formatLKR}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between px-4 py-3 mt-8 bg-gray-900 border border-gray-700 rounded-lg">
          <div className="flex justify-between flex-1 sm:hidden">
            <button
              onClick={() => getProducts(pagination.current_page - 1)}
              disabled={pagination.current_page === 1}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-200 bg-gray-800 border border-gray-600 rounded-md ${
                pagination.current_page === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-700"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => getProducts(pagination.current_page + 1)}
              disabled={pagination.current_page === pagination.last_page}
              className={`relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-200 bg-gray-800 border border-gray-600 rounded-md ${
                pagination.current_page === pagination.last_page
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-700"
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
                  {Math.min(
                    pagination.current_page * pagination.per_page,
                    pagination.total
                  )}
                </span>{" "}
                of <span className="font-medium">{pagination.total}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm">
                <button
                  onClick={() => getProducts(pagination.current_page - 1)}
                  disabled={pagination.current_page === 1}
                  className={`relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-600 rounded-l-md ${
                    pagination.current_page === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-700"
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
                    pagination.current_page === pagination.last_page
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-700"
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
};

// ProductCard Component for rendering each product
const ProductCard = React.memo(({ product, addToCart, formatLKR }) => {
  return (
    <div className="overflow-hidden transition-transform duration-300 bg-gray-900 rounded-lg shadow-lg hover:scale-105">
      <img
        src={product.image || "https://via.placeholder.com/150"}
        alt={product.name}
        className="object-cover w-full h-48"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-100">{product.name}</h2>
        <p className="text-sm text-gray-400">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <span className="mr-2 text-xl text-yellow-400">
              {formatLKR(product.discountedPrice)}
            </span>
            {product.price > product.discountedPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatLKR(product.price)}
              </span>
            )}
          </div>
          <div>
            {product.stock > 0 ? (
              <span className="px-2 py-1 text-xs font-semibold text-green-500 border border-green-500 rounded-lg">
                In Stock
              </span>
            ) : (
              <span className="px-2 py-1 text-xs font-semibold text-red-500 border border-red-500 rounded-lg">
                Out of Stock
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="w-full py-2 mt-4 text-white bg-yellow-500 rounded-lg hover:bg-yellow-400"
          disabled={product.stock <= 0}
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
});

export default Product;
