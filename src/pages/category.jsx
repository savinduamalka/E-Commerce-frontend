import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { api } from "../lib/api";

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCategory = async () => {
    try {
      const response = await api.get("/categories");
      console.log(response.data);
      setCategories(response.data.data);
      
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-12">
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">
          Categories
        </h1>

        {loading && (
          <p className="text-center text-gray-500">Loading categories...</p>
        )}

        {error && (
          <p className="text-center text-red-500">
            {error}
          </p>
        )}

        {!loading && categories.length === 0 && (
          <p className="text-center text-gray-500">
            No categories found.
          </p>
        )}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
            >
              <img
                src={category.image_url || "https://via.placeholder.com/150"}
                alt={category.name}
                className="object-cover w-full h-40"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {category.name}
                </h3>
                <p className="mt-2 text-gray-600">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Category;
