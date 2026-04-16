import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  const fetchData = async () => {
    try {
      const [prodRes, invRes, ordersRes, custRes] = await Promise.all([
        API.get("/products"),
        API.get("/inventory"),
        API.get("/sales"),
        API.get("/customers")
      ]);

      setProducts(prodRes.data);
      setInventory(invRes.data);
      setOrders(ordersRes.data);
      setCustomers(custRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateValue) => {
    if (!dateValue) return "N/A";
    const date = new Date(dateValue);
    return date.toLocaleDateString("en-IN");
  };

  // Summary metrics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  const totalInventoryQty = inventory.reduce(
    (sum, i) => sum + Number(i.quantity || 0),
    0
  );

  // Financial metrics
  const totalStockValue = inventory.reduce(
    (sum, i) => sum + Number(i.stock_value || 0),
    0
  );
  const totalCost = inventory.reduce(
    (sum, i) => sum + Number(i.total_cost || 0),
    0
  );
  const totalProfit = totalStockValue - totalCost;

  // Recent orders (last 5)
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.sale_date) - new Date(a.sale_date))
    .slice(0, 5);

  // Low stock items (qty < 5)
  const lowStockItems = inventory.filter(
    (i) => Number(i.quantity || 0) < 5
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-2xl font-bold text-blue-600">{totalProducts}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold text-green-600">{totalOrders}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Customers</p>
          <p className="text-2xl font-bold text-purple-600">{totalCustomers}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Inventory Qty</p>
          <p className="text-2xl font-bold text-orange-600">
            {totalInventoryQty}
          </p>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Stock Value</p>
          <p className="text-2xl font-bold">₹{totalStockValue.toFixed(2)}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Cost</p>
          <p className="text-2xl font-bold">₹{totalCost.toFixed(2)}</p>
        </div>

        <div
          className={`bg-white p-4 rounded shadow ${
            totalProfit >= 0 ? "border-l-4 border-green-500" : "border-l-4 border-red-500"
          }`}
        >
          <p className="text-sm text-gray-500">Total Profit/Loss</p>
          <p
            className={`text-2xl font-bold ${
              totalProfit >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ₹{totalProfit.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Recent Orders & Low Stock */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-lg mb-3">Recent Orders</h3>
          {recentOrders.length > 0 ? (
            <ul className="space-y-2">
              {recentOrders.map((o) => (
                <li
                  key={o.sale_id}
                  className="p-2 bg-gray-50 rounded flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">
                      Order #{o.sale_id}
                    </p>
                    <p className="text-sm text-gray-600">
                      {o.first_name} {o.last_name}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {formatDate(o.sale_date)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No orders yet</p>
          )}
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-lg mb-3">Low Stock Alert</h3>
          {lowStockItems.length > 0 ? (
            <ul className="space-y-2">
              {lowStockItems.map((item, index) => (
                <li
                  key={index}
                  className="p-2 bg-red-50 rounded border border-red-200 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-red-700">{item.product}</p>
                    <p className="text-sm text-red-600">
                      Location: {item.warehouse}
                    </p>
                  </div>
                  <p className="text-lg font-bold text-red-600">
                    {item.quantity}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-green-600 font-medium">✓ All stock levels OK</p>
          )}
        </div>
      </div>
    </div>
  );
}