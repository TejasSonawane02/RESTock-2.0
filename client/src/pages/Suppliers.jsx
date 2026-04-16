import { useEffect, useState } from "react";
import API from "../services/api";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editCompanyName, setEditCompanyName] = useState("");
  const [editContactPerson, setEditContactPerson] = useState("");

  // Fetch Suppliers and Products
  const fetchSuppliers = async () => {
    try {
      const [supRes, prodRes] = await Promise.all([
        API.get("/suppliers"),
        API.get("/products")
      ]);
      setSuppliers(supRes.data);
      setProducts(prodRes.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  // Add Supplier
  const addSupplier = async () => {
    if (!companyName.trim()) return;

    try {
      await API.post("/suppliers", {
        company_name: companyName.trim(),
        contact_person: contactPerson.trim()
      });
      setCompanyName("");
      setContactPerson("");
      fetchSuppliers();
    } catch (error) {
      console.error("Error adding supplier:", error);
    }
  };

  // Update Supplier
  const updateSupplier = async () => {
    if (!editCompanyName.trim()) return;

    try {
      await API.put(`/suppliers/${editingId}`, {
        company_name: editCompanyName.trim(),
        contact_person: editContactPerson.trim()
      });

      setEditingId(null);
      setEditCompanyName("");
      setEditContactPerson("");
      fetchSuppliers();
    } catch (error) {
      console.error("Error updating supplier:", error);
    }
  };

  // Delete Supplier
  const deleteSupplier = async (id) => {
    const productsFromSupplier = products.filter((p) => p.supplier_id === id);
    
    if (productsFromSupplier.length > 0) {
      alert(
        `❌ Cannot delete this supplier!\n\n` +
        `${productsFromSupplier.length} product(s) are from this supplier:\n` +
        `${productsFromSupplier.map((p) => "• " + p.name).join("\n")}\n\n` +
        `Please remove or reassign these products first.`
      );
      return;
    }

    const confirmed = window.confirm(
      "⚠️  Are you sure you want to delete this supplier?\n\n" +
      "This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      await API.delete(`/suppliers/${id}`);
      fetchSuppliers();
    } catch (error) {
      console.error("Error deleting supplier:", error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Suppliers</h2>

      {/* Add Supplier */}
      <div className="mb-6 space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <input
            type="text"
            placeholder="Contact person"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <button
            onClick={addSupplier}
            disabled={!companyName.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Add
          </button>
        </div>
      </div>

      {/* Supplier List */}
      <ul className="space-y-2">
        {suppliers.map((supplier) => (
          <li
            key={supplier.supplier_id}
            className="p-3 bg-gray-100 rounded flex justify-between items-center"
          >
            {editingId === supplier.supplier_id ? (
              <div className="flex gap-2 flex-1">
                <input
                  value={editCompanyName}
                  onChange={(e) => setEditCompanyName(e.target.value)}
                  className="border p-1 rounded flex-1"
                />
                <input
                  value={editContactPerson}
                  onChange={(e) => setEditContactPerson(e.target.value)}
                  className="border p-1 rounded flex-1"
                />
              </div>
            ) : (
              <div>
                <p className="font-semibold">{supplier.company_name}</p>
                <p className="text-sm text-gray-600">{supplier.contact_person}</p>
              </div>
            )}

            <div className="flex gap-2">
              {editingId === supplier.supplier_id ? (
                <>
                  <button
                    onClick={updateSupplier}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditCompanyName("");
                      setEditContactPerson("");
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
                      setEditingId(supplier.supplier_id);
                      setEditCompanyName(supplier.company_name);
                      setEditContactPerson(supplier.contact_person);
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteSupplier(supplier.supplier_id)}
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
