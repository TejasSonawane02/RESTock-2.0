import { useEffect, useState } from "react";
import API from "../services/api";

export default function Warehouses() {
  const [warehouses, setWarehouses] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [locationName, setLocationName] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressPincode, setAddressPincode] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editLocationName, setEditLocationName] = useState("");
  const [editAddressCity, setEditAddressCity] = useState("");
  const [editAddressPincode, setEditAddressPincode] = useState("");

  // Fetch Warehouses and Inventory
  const fetchWarehouses = async () => {
    try {
      const [whRes, invRes] = await Promise.all([
        API.get("/warehouses"),
        API.get("/inventory")
      ]);
      setWarehouses(whRes.data);
      setInventory(invRes.data);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  };

  // Add Warehouse
  const addWarehouse = async () => {
    if (!locationName.trim()) return;

    try {
      await API.post("/warehouses", {
        location_name: locationName.trim(),
        address_city: addressCity.trim(),
        address_pincode: addressPincode.trim()
      });
      setLocationName("");
      setAddressCity("");
      setAddressPincode("");
      fetchWarehouses();
    } catch (error) {
      console.error("Error adding warehouse:", error);
    }
  };

  // Update Warehouse
  const updateWarehouse = async () => {
    if (!editLocationName.trim()) return;

    try {
      await API.put(`/warehouses/${editingId}`, {
        location_name: editLocationName.trim(),
        address_city: editAddressCity.trim(),
        address_pincode: editAddressPincode.trim()
      });

      setEditingId(null);
      setEditLocationName("");
      setEditAddressCity("");
      setEditAddressPincode("");
      fetchWarehouses();
    } catch (error) {
      console.error("Error updating warehouse:", error);
    }
  };

  // Delete Warehouse
  const deleteWarehouse = async (id) => {
    const inventoryInWarehouse = inventory.filter(
      (i) => i.warehouse_id === id
    );
    
    if (inventoryInWarehouse.length > 0) {
      alert(
        `❌ Cannot delete this warehouse!\\n\\n` +
        `${inventoryInWarehouse.length} inventory record(s) exist in this warehouse:\\n` +
        `${inventoryInWarehouse.map((i) => "• " + i.product).join("\\n")}\\n\\n` +
        `Please clear inventory or move products to another warehouse first.`
      );
      return;
    }

    const confirmed = window.confirm(
      "⚠️  Are you sure you want to delete this warehouse?\\n\\n" +
      "This action will also delete all associated stock movements.\\n" +
      "This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      await API.delete(`/warehouses/${id}`);
      fetchWarehouses();
    } catch (error) {
      console.error("Error deleting warehouse:", error);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Warehouses</h2>

      {/* Add Warehouse */}
      <div className="mb-6 space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Location name"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <input
            type="text"
            placeholder="City"
            value={addressCity}
            onChange={(e) => setAddressCity(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <input
            type="text"
            placeholder="Pincode"
            value={addressPincode}
            onChange={(e) => setAddressPincode(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <button
            onClick={addWarehouse}
            disabled={!locationName.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Add
          </button>
        </div>
      </div>

      {/* Warehouse List */}
      <ul className="space-y-2">
        {warehouses.map((warehouse) => (
          <li
            key={warehouse.warehouse_id}
            className="p-3 bg-gray-100 rounded flex justify-between items-center"
          >
            {editingId === warehouse.warehouse_id ? (
              <div className="flex gap-2 flex-1">
                <input
                  value={editLocationName}
                  onChange={(e) => setEditLocationName(e.target.value)}
                  className="border p-1 rounded flex-1"
                />
                <input
                  value={editAddressCity}
                  onChange={(e) => setEditAddressCity(e.target.value)}
                  className="border p-1 rounded flex-1"
                />
                <input
                  value={editAddressPincode}
                  onChange={(e) => setEditAddressPincode(e.target.value)}
                  className="border p-1 rounded flex-1"
                />
              </div>
            ) : (
              <div>
                <p className="font-semibold">{warehouse.location_name}</p>
                <p className="text-sm text-gray-600">
                  {warehouse.address_city} - {warehouse.address_pincode}
                </p>
              </div>
            )}

            <div className="flex gap-2">
              {editingId === warehouse.warehouse_id ? (
                <>
                  <button
                    onClick={updateWarehouse}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditLocationName("");
                      setEditAddressCity("");
                      setEditAddressPincode("");
                    }}
                    className="bg-gray-400 text-white px-2 py-1 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditingId(warehouse.warehouse_id);
                      setEditLocationName(warehouse.location_name);
                      setEditAddressCity(warehouse.address_city);
                      setEditAddressPincode(warehouse.address_pincode);
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteWarehouse(warehouse.warehouse_id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
