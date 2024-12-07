import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/adminsidebar";
import { api } from "../../lib/api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    api.get("/user")
      .then(response => {
        console.log(response.data);
        setUsers(response.data.users); 
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  const handleEdit = (user) => {
    setIsEditing(true);
    setCurrentUser(user);
  };

 
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="mb-6 text-2xl font-bold text-gray-700">
          User Management
        </h1>
        <div className="rounded-lg shadow-md">
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
                      className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
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

        {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-8 bg-white rounded-lg shadow-lg w-96">
              <h2 className="mb-4 text-lg font-bold text-gray-700">
                Edit User
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  value={currentUser.name}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, name: e.target.value })
                  }
                  placeholder="Name"
                />
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded"
                  value={currentUser.email}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, email: e.target.value })
                  }
                  placeholder="Email"
                />
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  value={currentUser.password}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, password: e.target.value })
                  }
                  placeholder="Password"
                />
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  value={currentUser.role}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, role: e.target.value })
                  }
                  placeholder="Role"
                />
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  value={currentUser.city}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, city: e.target.value })
                  }
                  placeholder="City"
                />
              </div>
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => {
                    setIsEditing(false);
                    setCurrentUser(null);
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

export default UserManagement;
