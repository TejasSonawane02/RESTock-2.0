import { useEffect, useState } from "react";
import API from "../services/api";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  const [form, setForm] = useState({
    product_id: "",
    warehouse_id: "",
    quantity: "",
    stock_value: "",
    total_cost: ""
  });

  // Fetch all data
  const fetchData = async () => {
    try {
      const [invRes, prodRes, whRes] = await Promise.all([
        API.get("/inventory"),
        API.get("/products"),
        API.get("/warehouses")
      ]);

      setInventory(invRes.data);
      setProducts(prodRes.data);
      setWarehouses(whRes.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalStockValue = inventory.reduce(
  (sum, i) => sum + Number(i.stock_value || 0),
  0
);

const totalCost = inventory.reduce(
  (sum, i) => sum + Number(i.total_cost || 0),
  0
);

const totalProfit = totalStockValue - totalCost;
  // Handle form change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Add inventory
  const addInventory = async () => {
    const { product_id, warehouse_id, quantity } = form;

    if (!product_id || !warehouse_id || !quantity) return;

    try {
      await API.post("/inventory", form);
      setForm({
        product_id: "",
        warehouse_id: "",
        quantity: "",
        stock_value: "",
        total_cost: ""
      });
      fetchData();
    } catch (error) {
      console.error("Error adding inventory:", error);
    }

  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Inventory</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
  <div className="bg-white p-4 rounded shadow">
    <p className="text-sm text-gray-500">Total Stock Value</p>
    <p className="text-xl font-bold">₹{totalStockValue}</p>
  </div>

  <div className="bg-white p-4 rounded shadow">
    <p className="text-sm text-gray-500">Total Cost</p>
    <p className="text-xl font-bold">₹{totalCost}</p>
  </div>

  <div className="bg-white p-4 rounded shadow">
    <p className="text-sm text-gray-500">Total Profit</p>
    <p
      className={`text-xl font-bold ${
        totalProfit >= 0 ? "text-green-600" : "text-red-500"
      }`}
    >
      ₹{totalProfit}
    </p>
  </div>
</div>

      {/* Form */}
      <div className="grid grid-cols-2 gap-4 mb-6">

        <select
          name="product_id"
          value={form.product_id}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.product_id} value={p.product_id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          name="warehouse_id"
          value={form.warehouse_id}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Warehouse</option>
          {warehouses.map((w) => (
            <option key={w.warehouse_id} value={w.warehouse_id}>
              {w.location_name}
            </option>
          ))}
        </select>

        <input
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="stock_value"
          placeholder="Stock Value"
          value={form.stock_value}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="total_cost"
          placeholder="Total Cost"
          value={form.total_cost}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          onClick={addInventory}
          className="bg-blue-600 text-white px-4 py-2 rounded col-span-2"
        >
          Add Inventory
        </button>
      </div>
            
      {/* Inventory List */}
      <ul className="space-y-3">
  {inventory.map((i, index) => {
    const profit = i.stock_value - i.total_cost;

    return (
      <li
        key={index}
        className="p-4 bg-white rounded shadow flex justify-between items-center"
      >
        {/* Left Side */}
        <div>
          <p className="font-semibold text-lg">{i.product}</p>
          <p className="text-sm text-gray-500">{i.warehouse}</p>

          <div className="text-sm mt-2 space-y-1">
            <p>Quantity: {i.quantity}</p>
            <p>Stock Value: ₹{i.stock_value}</p>
            <p>Total Cost: ₹{i.total_cost}</p>

            <p
              className={`font-medium ${
                profit >= 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              Profit: ₹{profit}
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="text-right">
          <p className="text-lg font-bold">Qty: {i.quantity}</p>

          {i.quantity < 5 && (
            <p className="text-red-500 text-sm mt-1">
              Low Stock ⚠️
            </p>
          )}
        </div>
      </li>
    );
  })}
</ul>
    </div>
  );
}