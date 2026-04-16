import { useEffect, useState } from "react";
import API from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category_id: "",
    supplier_id: "",
    cost_price: "",
    sale_price: ""
  });

  const [form, setForm] = useState({
    name: "",
    category_id: "",
    supplier_id: "",
    cost_price: "",
    sale_price: ""
  });

  // Fetch all data
  const fetchData = async () => {
    try {
      const [prodRes, catRes, supRes] = await Promise.all([
        API.get("/products"),
        API.get("/categories"),
        API.get("/suppliers")
      ]);

      setProducts(prodRes.data);
      setCategories(catRes.data);
      setSuppliers(supRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Add product
  const addProduct = async () => {
    const { name, category_id, supplier_id, cost_price, sale_price } = form;

    if (!name || !category_id || !supplier_id) return;

    try {
      await API.post("/products", form);
      setForm({
        name: "",
        category_id: "",
        supplier_id: "",
        cost_price: "",
        sale_price: ""
      });
      fetchData();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Update product
  const updateProduct = async () => {
    if (!editingId) return;
    const { name, category_id, supplier_id } = editForm;
    if (!name || !category_id || !supplier_id) return;

    try {
      await API.put(`/products/${editingId}`, editForm);
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({
      name: "",
      category_id: "",
      supplier_id: "",
      cost_price: "",
      sale_price: ""
    });
  };

//   Delete product
    const deleteProduct = async (id) => {
        const confirmed = window.confirm(
            "⚠️  WARNING: Deleting this product will also delete:\n" +
            "• All inventory records for this product\n" +
            "• All stock movement history\n\n" +
            "This action cannot be undone. Continue?"
        );

        if (!confirmed) return;

        try {
            await API.delete(`/products/${id}`);
            fetchData();
        } catch (error) {
            console.error("Error deleting product:", error);
        }   
    };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Products</h2>

      {/* Form */}
      <div className="grid grid-cols-2 gap-4 mb-6">

        <input
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.category_id} value={c.category_id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          name="supplier_id"
          value={form.supplier_id}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Supplier</option>
          {suppliers.map((s) => (
            <option key={s.supplier_id} value={s.supplier_id}>
              {s.company_name}
            </option>
          ))}
        </select>

        <input
          name="cost_price"
          placeholder="Cost Price"
          value={form.cost_price}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="sale_price"
          placeholder="Sale Price"
          value={form.sale_price}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          onClick={addProduct}
          className="bg-blue-600 text-white px-4 py-2 rounded col-span-2"
        >
          Add Product
        </button>
      </div>

      {/* Product List */}
      <ul className="space-y-2">
        {products.map((p) => (
          <li
        key={p.product_id}
        className="p-3 bg-gray-100 rounded flex justify-between items-center"
        >
        {editingId === p.product_id ? (
          <div className="flex flex-1 flex-wrap gap-2 items-center">
            <input
              name="name"
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
              className="border p-2 rounded flex-1 min-w-[160px]"
            />

            <select
              name="category_id"
              value={editForm.category_id}
              onChange={(e) =>
                setEditForm({ ...editForm, category_id: e.target.value })
              }
              className="border p-2 rounded"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.category_id} value={c.category_id}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              name="supplier_id"
              value={editForm.supplier_id}
              onChange={(e) =>
                setEditForm({ ...editForm, supplier_id: e.target.value })
              }
              className="border p-2 rounded"
            >
              <option value="">Select Supplier</option>
              {suppliers.map((s) => (
                <option key={s.supplier_id} value={s.supplier_id}>
                  {s.company_name}
                </option>
              ))}
            </select>

            <input
              name="cost_price"
              value={editForm.cost_price}
              onChange={(e) =>
                setEditForm({ ...editForm, cost_price: e.target.value })
              }
              className="border p-2 rounded w-28"
              placeholder="Cost"
            />

            <input
              name="sale_price"
              value={editForm.sale_price}
              onChange={(e) =>
                setEditForm({ ...editForm, sale_price: e.target.value })
              }
              className="border p-2 rounded w-28"
              placeholder="Sale"
            />

            <button
              onClick={updateProduct}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="bg-gray-400 text-white px-2 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-gray-600">
                {p.category} | {p.supplier}
              </p>
            </div>

            <div className="flex gap-2 items-center">
              <span>₹{p.sale_price}</span>
              <button
                onClick={() => {
                  setEditingId(p.product_id);
                  setEditForm({
                    name: p.name,
                    category_id: p.category_id,
                    supplier_id: p.supplier_id,
                    cost_price: p.cost_price,
                    sale_price: p.sale_price
                  });
                }}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(p.product_id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </>
        )}
        </li>
        ))}
      </ul>
    </div>
  );
}