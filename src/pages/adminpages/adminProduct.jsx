import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/adminsidebar";
import { api } from "../../lib/api";
import { toast } from "react-hot-toast";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    api
      .get("/products")
      .then((response) => {
        setProducts(response.data.data);
        toast.success("Products loaded successfully!");
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
        toast.error("Failed to load products!");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      api
        .delete(`/products/${id}`)
        .then(() => {
          toast.success("Product deleted successfully!");
          fetchProducts();
        })
        .catch((error) => {
          console.error("There was an error deleting the product!", error);
          toast.error("Failed to delete product!");
        });
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="mb-6 text-2xl font-bold text-gray-700">
          Product Management
        </h1>

        <div className="rounded-lg shadow-md">
          <table className="w-full text-left border border-collapse border-gray-200 table-auto">
            <thead className="text-white bg-blue-600">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Discounted Price</th>
                <th className="px-4 py-2 border">Category ID</th>
                <th className="px-4 py-2 border">Stock</th>
                <th className="px-4 py-2 border">Featured</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(products) &&
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="transition-colors hover:bg-gray-100"
                  >
                    <td className="px-4 py-2 border">{product.id}</td>
                    <td className="px-4 py-2 border">{product.name}</td>
                    <td className="px-4 py-2 border">{product.description}</td>
                    <td className="px-4 py-2 border">${product.price}</td>
                    <td className="px-4 py-2 border">
                      {product.discountedPrice
                        ? `$${product.discountedPrice}`
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2 border">{product.category_id}</td>
                    <td className="px-4 py-2 border">{product.stock}</td>
                    <td className="px-4 py-2 border">
                      {product.featured ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-2 text-center border">
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
