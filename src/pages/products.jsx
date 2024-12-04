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
    <>
      <Navbar />
      <div className="container mx-auto my-12">
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">
          Products
        </h1>

        {loading && (
          <p className="text-center text-gray-500">Loading products...</p>
        )}

        {error && (
          <p className="text-center text-red-500">
            {error}
          </p>
        )}

        {!loading && products.length === 0 && (
          <p className="text-center text-gray-500">
            No products found.
          </p>
        )}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
            >
              <img
                src={product.image_url || "https://via.placeholder.com/150"}
                alt={product.name}
                className="object-cover w-full h-40"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="mt-2 text-gray-600">
                  {product.description}
                </p>
                <p className="mt-2 font-bold text-gray-800">
                  LKR {product.price}M
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Product;