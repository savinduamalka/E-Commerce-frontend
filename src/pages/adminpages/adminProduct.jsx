import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/adminsidebar";
import { api } from "../../lib/api";
import { toast } from "react-hot-toast";
import { FaPlus } from "react-icons/fa"; // Import the icon

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isCreating, setIsCreating] = useState(false); // State for creating a new product
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    discountedPrice: "",
    categoryId: "",
    stock: "",
    image: "",
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = (page = 1) => {
    api
      .get(`/products?page=${page}`)
      .then((response) => {
        setProducts(response.data.data);
        setPagination({
          current_page: response.data.meta.current_page,
          last_page: response.data.meta.last_page,
          per_page: response.data.meta.per_page,
          total: response.data.meta.total
        });
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

  const handleCreate = (e) => {
    e.preventDefault();
    const {
      name,
      description,
      price,
      discountedPrice,
      categoryId,
      stock,
      image,
    } = newProduct;

    if (!name || !description || !price || !categoryId || !stock || !image) {
      toast.error("All fields are required!");
      return;
    }

    api
      .post("/products", {
        name,
        description,
        price,
        discountedPrice,
        categoryId,
        stock,
        image,
      })
      .then((response) => {
        setProducts([...products, response.data.data]);
        setNewProduct({
          name: "",
          description: "",
          price: "",
          discountedPrice: "",
          categoryId: "",
          stock: "",
          image: "",
        });
        setIsCreating(false);
        toast.success("Product created successfully!");
      })
      .catch((error) => {
        console.error("There was an error creating the product!", error);
        toast.error("Failed to create product!");
      });
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6 ml-64 bg-gray-50">
        <h1 className="mb-6 text-2xl font-bold text-gray-700">
          Product Management
        </h1>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => {
              setIsCreating(true);
              setEditData(null);
            }}
            className="flex items-center px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            <FaPlus className="mr-2" /> Create Product
          </button>
        </div>

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
                <th className="px-4 py-2 border">Image</th>
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
                    <td className="px-4 py-2 border">{product.price}</td>
                    <td className="px-4 py-2 border">
                      {product.discountedPrice
                        ? `${product.discountedPrice}`
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2 border">{product.categoryId}</td>
                    <td className="px-4 py-2 border">{product.stock}</td>
                    <td className="px-4 py-2 border">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-16 h-16"
                      />
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

        {/* Pagination Controls */}
        <div className="flex items-center justify-between px-4 py-3 mt-4 bg-white border-t border-gray-200 sm:px-6">
          <div className="flex justify-between flex-1 sm:hidden">
            <button
              onClick={() => fetchProducts(pagination.current_page - 1)}
              disabled={pagination.current_page === 1}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md ${
                pagination.current_page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => fetchProducts(pagination.current_page + 1)}
              disabled={pagination.current_page === pagination.last_page}
              className={`relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md ${
                pagination.current_page === pagination.last_page ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
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
                  onClick={() => fetchProducts(pagination.current_page - 1)}
                  disabled={pagination.current_page === 1}
                  className={`relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md ${
                    pagination.current_page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
                  }`}
                >
                  Previous
                </button>
                {[...Array(pagination.last_page)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => fetchProducts(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border ${
                      pagination.current_page === index + 1
                        ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => fetchProducts(pagination.current_page + 1)}
                  disabled={pagination.current_page === pagination.last_page}
                  className={`relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md ${
                    pagination.current_page === pagination.last_page ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>

        {(editData || isCreating) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-lg p-6 bg-white rounded-lg">
              <h2 className="mb-4 text-xl font-bold">
                {editData ? "Edit Product" : "Create Product"}
              </h2>
              <form onSubmit={editData ? handleUpdate : handleCreate}>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    value={editData ? editData.name : newProduct.name}
                    onChange={(e) =>
                      editData
                        ? setEditData({ ...editData, name: e.target.value })
                        : setNewProduct({ ...newProduct, name: e.target.value })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border rounded"
                    value={editData ? editData.description : newProduct.description}
                    onChange={(e) =>
                      editData
                        ? setEditData({ ...editData, description: e.target.value })
                        : setNewProduct({
                            ...newProduct,
                            description: e.target.value,
                          })
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
                    value={editData ? editData.price : newProduct.price}
                    onChange={(e) =>
                      editData
                        ? setEditData({ ...editData, price: e.target.value })
                        : setNewProduct({ ...newProduct, price: e.target.value })
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
                    value={editData ? editData.discountedPrice : newProduct.discountedPrice}
                    onChange={(e) =>
                      editData
                        ? setEditData({
                            ...editData,
                            discountedPrice: e.target.value,
                          })
                        : setNewProduct({
                            ...newProduct,
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
                    value={
                      editData ? editData.categoryId : newProduct.categoryId
                    }
                    onChange={(e) =>
                      editData
                        ? setEditData({
                            ...editData,
                            categoryId: e.target.value,
                          })
                        : setNewProduct({
                            ...newProduct,
                            categoryId: e.target.value,
                          })
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
                    value={editData ? editData.stock : newProduct.stock}
                    onChange={(e) =>
                      editData
                        ? setEditData({ ...editData, stock: e.target.value })
                        : setNewProduct({
                            ...newProduct,
                            stock: e.target.value,
                          })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Image URL
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    value={editData ? editData.image : newProduct.image}
                    onChange={(e) =>
                      editData
                        ? setEditData({ ...editData, image: e.target.value })
                        : setNewProduct({
                            ...newProduct,
                            image: e.target.value,
                          })
                    }
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    {editData ? "Save Changes" : "Create"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEditData(null);
                      setIsCreating(false);
                    }}
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
