import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/adminsidebar";
import { api } from "../../lib/api";
import { toast } from "react-hot-toast";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    api
      .get("/categories")
      .then((response) => {
        setCategories(response.data.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
        toast.error("Failed to load categories!");
      });
  }, []);

  const handleEdit = (category) => {
    setCurrentCategory({
      ...category,
      image_url: category.image_url || category.imageUrl,
    });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      api
        .delete(`/category/${id}`)
        .then(() => {
          setCategories(categories.filter((category) => category.id !== id));
          toast.success("Category deleted successfully!");
        })
        .catch((error) => {
          console.error("There was an error deleting the category!", error);
          toast.error("Failed to delete category!");
        });
    }
  };

  const handleSave = () => {
    const { id, name, description, image_url } = currentCategory;

    if (!name || !description || !image_url) {
      toast.error("All fields are required!");
      return;
    }

    api
      .put(`/category/${id}`, { name, description, image_url })
      .then((response) => {
        setCategories(
          categories.map((category) =>
            category.id === id ? { ...response.data.category, image_url } : category
          )
        );
        setIsEditing(false);
        setCurrentCategory({
          id: "",
          name: "",
          description: "",
          image_url: "",
        });
        toast.success("Category updated successfully!");
      })
      .catch((error) => {
        console.error("There was an error updating the category!", error);
        toast.error("Failed to update category!");
      });
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="mb-6 text-2xl font-bold text-gray-700">
          Category Management
        </h1>
        <div className="rounded-lg shadow-md">
          <table className="w-full text-left border border-collapse border-gray-200 table-auto">
            <thead className="text-white bg-blue-600">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Image URL</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(categories) &&
                categories.map((category) => (
                  <tr
                    key={category.id}
                    className="transition-colors hover:bg-gray-100"
                  >
                    <td className="px-4 py-2 border">{category.name}</td>
                    <td className="px-4 py-2 border">{category.description}</td>
                    <td className="px-4 py-2 border">{category.image_url || category.imageUrl}</td>
                    <td className="flex justify-center px-4 py-2 space-x-4 border">
                      <button
                        className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                        onClick={() => handleEdit(category)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                        onClick={() => handleDelete(category.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-8 bg-white rounded-lg shadow-lg w-96">
              <h2 className="mb-4 text-lg font-bold text-gray-700">
                Edit Category
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  value={currentCategory.name}
                  onChange={(e) =>
                    setCurrentCategory({
                      ...currentCategory,
                      name: e.target.value,
                    })
                  }
                  placeholder="Name"
                />
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  value={currentCategory.description}
                  onChange={(e) =>
                    setCurrentCategory({
                      ...currentCategory,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description"
                />
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  value={currentCategory.image_url || ""}
                  onChange={(e) =>
                    setCurrentCategory({
                      ...currentCategory,
                      image_url: e.target.value,
                    })
                  }
                  placeholder="Image URL"
                />
              </div>
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => {
                    setIsEditing(false);
                    setCurrentCategory(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;
