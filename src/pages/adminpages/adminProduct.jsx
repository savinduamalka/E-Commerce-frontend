import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/adminsidebar";
import { api } from "../../lib/api";
import { toast } from "react-hot-toast";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [editData, setEditData] = useState(null); 

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

  const handleEdit = (product) => {
    setEditData(product); 
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (editData) {
      api
        .put(`/products/${editData.id}`, editData)
        .then(() => {
          toast.success("Product updated successfully!");
          fetchProducts();
          setEditData(null); 
        })
        .catch((error) => {
          console.error("There was an error updating the product!", error);
          toast.error("Failed to update product!");
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
                    <td className="px-4 py-2 border">{product.categoryId}</td>
                    <td className="px-4 py-2 border">{product.stock}</td>
                    <td className="px-4 py-2 border">
                      {product.featured ? "Yes" : "No"}
                    </td>
                    <td className="flex gap-2 px-4 py-2 text-center border">
                      <button
                        onClick={() => handleEdit(product)}
                        className="px-2 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                      >
                        Edit
                      </button>
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

        {editData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl overflow-auto max-h-[80vh]">
              <h2 className="mb-6 text-2xl font-bold text-gray-700">
                Edit Product
              </h2>
              <form onSubmit={handleUpdate}>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border rounded"
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded"
                    value={editData.price}
                    onChange={(e) =>
                      setEditData({ ...editData, price: e.target.value })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Discounted Price
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded"
                    value={editData.discountedPrice}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        discountedPrice: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Category ID
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    value={editData.categoryId}
                    onChange={(e) =>
                      setEditData({ ...editData, categoryId: e.target.value })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Stock
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded"
                    value={editData.stock}
                    onChange={(e) =>
                      setEditData({ ...editData, stock: e.target.value })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Featured
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded"
                    value={editData.featured}
                    onChange={(e) =>
                      setEditData({ ...editData, featured: e.target.value })
                    }
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditData(null)}
                    className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
