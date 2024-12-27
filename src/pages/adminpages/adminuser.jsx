import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/adminsidebar";
import { api } from "../../lib/api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0
  });

  const fetchUsers = async (page = 1) => {
    try {
      const response = await api.get(`/user?page=${page}`);
      const usersData = response.data.data || [];
      const meta = {
        current_page: response.data.current_page,
        last_page: response.data.last_page,
        per_page: response.data.per_page,
        total: response.data.total
      };

      setUsers(usersData);
      setPagination(meta);
    } catch (error) {
      console.error("There was an error fetching the users!", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      api.delete(`/user/${id}`)
        .then(() => {
          setUsers(users.filter((user) => user.id !== id));
        })
        .catch(error => {
          console.error("There was an error deleting the user!", error);
        });
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6 ml-64 bg-gray-50">
        <h1 className="mb-6 text-2xl font-bold text-gray-700">
          User Management
        </h1>
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full text-left border border-collapse border-gray-200 table-auto">
            <thead className="text-white bg-blue-600">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Role</th>
                <th className="px-4 py-2 border">City</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) && users.map((user) => (
                <tr
                  key={user.id}
                  className="transition-colors hover:bg-gray-100"
                >
                  <td className="px-4 py-2 border">{user.name}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.role}</td>
                  <td className="px-4 py-2 border">{user.city}</td>
                  <td className="flex justify-center px-4 py-2 space-x-4 border">
                    <button
                      className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                      onClick={() => handleDelete(user.id)}
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
              onClick={() => fetchUsers(pagination.current_page - 1)}
              disabled={pagination.current_page === 1}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md ${
                pagination.current_page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => fetchUsers(pagination.current_page + 1)}
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
                  onClick={() => fetchUsers(pagination.current_page - 1)}
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
                    onClick={() => fetchUsers(index + 1)}
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
                  onClick={() => fetchUsers(pagination.current_page + 1)}
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
      </div>
    </div>
  );
};

export default UserManagement;
