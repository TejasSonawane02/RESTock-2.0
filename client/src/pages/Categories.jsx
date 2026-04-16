import { useEffect, useState } from "react";
import API from "../services/api";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
  
    // Fetch Categories and Products
  const fetchCategories = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([
        API.get("/categories"),
        API.get("/products")
      ]);
      setCategories(catRes.data);
      setProducts(prodRes.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Add Category
  const addCategory = async () => {
    if (!name.trim()) return;

    try {
      await API.post("/categories", { name });
      setName("");
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

//   Update Category
const updateCategory = async () => {
  if (!editName.trim()) return;

  try {
    await API.put(`/categories/${editingId}`, {
      name: editName,
    });

    setEditingId(null);
    setEditName("");
    fetchCategories();
  } catch (error) {
    console.error("Error updating category:", error);
  }
};

  // Delete Category
  const deleteCategory = async (id) => {
    const productsInCategory = products.filter((p) => p.category_id === id);
    
    if (productsInCategory.length > 0) {
      alert(
        `❌ Cannot delete this category!\n\n` +
        `${productsInCategory.length} product(s) are using this category:\n` +
        `${productsInCategory.map((p) => "• " + p.name).join("\n")}\n\n` +
        `Please remove or reassign these products first.`
      );
      return;
    }

    const confirmed = window.confirm(
      "⚠️  Are you sure you want to delete this category?\n\n" +
      "This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      await API.delete(`/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Categories</h2>

      {/* Add Category */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-64"
        />

        <button
          onClick={addCategory}
          disabled={!name.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Add
        </button>
      </div>

      {/* Category List */}
      <ul className="space-y-2">
  {categories.map((cat) => (
    <li
      key={cat.category_id}
      className="p-3 bg-gray-100 rounded flex justify-between items-center"
    >
      {editingId === cat.category_id ? (
        <input
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          className="border p-1 rounded"
        />
      ) : (
        <span>{cat.name}</span>
      )}

      <div className="flex gap-2">
        {editingId === cat.category_id ? (
          <button
            onClick={updateCategory}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => {
              setEditingId(cat.category_id);
              setEditName(cat.name);
            }}
            className="bg-yellow-500 text-white px-2 py-1 rounded"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => deleteCategory(cat.category_id)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </li>
  ))}
</ul>
    </div>
  );
}