import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { toast } from "react-hot-toast";
import AdminSidebar from "../../components/adminsidebar";

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0
  });

  const fetchOrders = async (page = 1) => {
    try {
      const response = await api.get(`/orders?page=${page}`);
      
      const ordersData = response.data.data || [];
      const meta = response.data || {
        current_page: 1,
        last_page: 1,
        per_page: 12,
        total: ordersData.length
      };

      setOrders(ordersData);
      setPagination(meta);
      
      if (ordersData.length > 0) {
        toast.success("Orders fetched successfully!");
      }
    } catch (error) {
      console.error("There was an error fetching the orders!", error);
      setError("Failed to fetch orders. Please try again later.");
      toast.error("Failed to fetch orders.");
      setOrders([]);
      setPagination({
        current_page: 1,
        last_page: 1,
        per_page: 12,
        total: 0
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      const response = await api.put(`/orders/${orderId}/status`, { status });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? response.data.order : order
        )
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("There was an error updating the order status!", error);
      toast.error("Failed to update order status.");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const response = await api.delete(`/orders/${orderId}`);
        setOrders((prevOrders) => prevOrders.filter(order => order.id !== orderId));
        toast.success(response.data.message);
      } catch (error) {
        console.error("There was an error deleting the order!", error);
        toast.error("Failed to delete order.");
      }
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6 ml-64 bg-gray-50">
        <h1 className="mb-6 text-2xl font-bold text-gray-700">Order Management</h1>

        <div className="rounded-lg shadow-md">
          {loading && <p className="text-center text-gray-600">Loading orders...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && orders.length === 0 && (
            <p className="text-center text-gray-600">No orders found.</p>
          )}
          {!loading && orders.length > 0 && (
            <table className="w-full text-left border border-collapse border-gray-200 table-auto">
              <thead className="text-white bg-blue-600">
                <tr>
                  <th className="px-4 py-2 border">Order ID</th>
                  <th className="px-4 py-2 border">User ID</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Total</th>
                  <th className="px-4 py-2 border">Items</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="transition-colors hover:bg-gray-100">
                    <td className="px-4 py-2 border">{order.id}</td>
                    <td className="px-4 py-2 border">{order.user_id}</td>
                    <td className="px-4 py-2 border">{order.status}</td>
                    <td className="px-4 py-2 border">
                      LKR {order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
                    </td>
                    <td className="px-4 py-2 border">
                      <ul>
                        {order.items.map((item) => (
                          <li key={item.id}>
                            {item.product.name}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-2 border">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="px-2 py-1 border rounded"
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="declined">Declined</option>
                      </select>
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="px-2 py-1 ml-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between px-4 py-3 mt-4 bg-white border-t border-gray-200 sm:px-6">
          <div className="flex justify-between flex-1 sm:hidden">
            <button
              onClick={() => fetchOrders(pagination.current_page - 1)}
              disabled={pagination.current_page === 1}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md ${
                pagination.current_page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => fetchOrders(pagination.current_page + 1)}
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
                  onClick={() => fetchOrders(pagination.current_page - 1)}
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
                    onClick={() => fetchOrders(index + 1)}
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
                  onClick={() => fetchOrders(pagination.current_page + 1)}
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
}

export default OrderManagement;
