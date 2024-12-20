import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { toast } from "react-hot-toast";
import AdminSidebar from "../../components/adminsidebar";

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("orders");
        setOrders(response.data.orders);
        toast.success("Orders fetched successfully!");
      } catch (error) {
        console.error("There was an error fetching the orders!", error);
        setError("Failed to fetch orders. Please try again later.");
        toast.error("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
      toast.success("Order status updated successfully!");
    } catch (error) {
      console.error("There was an error updating the order status!", error);
      toast.error("Failed to update order status.");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="fixed w-64 h-screen bg-gray-800">
        <AdminSidebar />
      </div>
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderManagement;
