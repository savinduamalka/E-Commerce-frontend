import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/adminsidebar";
import { api } from "../../lib/api";
import { toast } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";  

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);  
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    api
      .get("/categories")
      .then((response) => {
        setCategories(response.data.data);
        toast.success("Categories loaded successfully!");
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
        toast.error("Failed to load categories!");
      });
  }, []);

  const handleEdit = (category) => {
    setCurrentCategory({
      ...category,
      image: category.image || category.imageUrl,
    });
    setIsEditing(true);
    setIsCreating(false);  
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
    const { id, name, description, image } = currentCategory;

    if (!name || !description || !image) {
      toast.error("All fields are required!");
      return;
    }

    api
      .put(`/category/${id}`, { name, description, image })
      .then((response) => {
        setCategories(
          categories.map((category) =>
            category.id === id ? { ...response.data.category, image } : category
          )
        );
        setIsEditing(false);
        setCurrentCategory({
          id: "",
          name: "",
          description: "",
          image: "",
        });
        toast.success("Category updated successfully!");
      })
      .catch((error) => {
        console.error("There was an error updating the category!", error);
        toast.error("Failed to update category!");
      });
  };

  const handleCreate = () => {
    const { name, description, image } = newCategory;

    if (!name || !description || !image) {
      toast.error("All fields are required!");
      return;
    }

    api
      .post("/category", { name, description, image })
      .then((response) => {
        setCategories([...categories, response.data.category]);
        setNewCategory({ name: "", description: "", image: "" });
        setIsCreating(false); 
        toast.success("Category created successfully!");
      })
      .catch((error) => {
        console.error("There was an error creating the category!", error);
        toast.error("Failed to create category!");
      });
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="mb-6 text-2xl font-bold text-gray-700">
          Category Management
        </h1>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => {
              setIsCreating(true);
              setIsEditing(false);  
            }}
            className="flex items-center px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            <FaPlus className="mr-2" /> Create Category
          </button>
        </div>

        <div className="rounded-lg shadow-md">
          <table className="w-full text-left border border-collapse border-gray-200 table-auto">
            <thead className="text-white bg-blue-600">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Image</th>
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
                    <td className="px-4 py-2 border">{category.id}</td>
                    <td className="px-4 py-2 border">{category.name}</td>
                    <td className="px-4 py-2 border">{category.description}</td>
                    <td className="px-4 py-2 border">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="object-cover w-16 h-16"
                      />
                    </td>
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

        {(isEditing || isCreating) && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-8 bg-white rounded-lg shadow-lg w-96">
              <h2 className="mb-4 text-lg font-bold text-gray-700">
                {isEditing ? "Edit Category" : "Create Category"}
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  value={isEditing ? currentCategory.name : newCategory.name}
                  onChange={(e) =>
                    isEditing
                      ? setCurrentCategory({
                          ...currentCategory,
                          name: e.target.value,
                        })
                      : setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  placeholder="Category Name"
                />
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  value={isEditing ? currentCategory.description : newCategory.description}
                  onChange={(e) =>
                    isEditing
                      ? setCurrentCategory({
                          ...currentCategory,
                          description: e.target.value,
                        })
                      : setNewCategory({ ...newCategory, description: e.target.value })
                  }
                  placeholder="Category Description"
                />
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  value={isEditing ? currentCategory.image : newCategory.image}
                  onChange={(e) =>
                    isEditing
                      ? setCurrentCategory({
                          ...currentCategory,
                          image: e.target.value,
                        })
                      : setNewCategory({ ...newCategory, image: e.target.value })
                  }
                  placeholder="Image URL"
                />
              </div>
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => {
                    setIsEditing(false);
                    setIsCreating(false);
                    setCurrentCategory({
                      id: "",
                      name: "",
                      description: "",
                      image: "",
                    });
                    setNewCategory({ name: "", description: "", image: "" });
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                  onClick={isEditing ? handleSave : handleCreate}
                >
                  {isEditing ? "Save" : "Create"}
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
