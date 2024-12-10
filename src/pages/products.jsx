import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { api } from "../lib/api";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <div
        className="container px-4 py-12 mx-auto"
        style={{
          backgroundImage: 'url("/home-wallpaper.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-100">
          Products
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
                src={product.image_url || "https://via.placeholder.com/150"}
                alt={product.name}
                className="object-cover w-full h-40"
              />
              <div className="p-4 text-gray-100">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="mt-2 text-gray-400">{product.description}</p>
                <p className="mt-2 font-bold text-gray-100">
                  LKR {product.price}M
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;
