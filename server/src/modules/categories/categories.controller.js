import * as categoriesService from './categories.service.js';

export const getCategories = async (req, res) => {
    try {
        const categories = await categoriesService.getCategories();
        res.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: "Failed to fetch categories" });
    }
};

export const createCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const result = await categoriesService.createCategory(name, description);
        res.status(201).json({ message: "Category created", categoryId: result.insertId });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ error: "Failed to create category" });
    }
};

export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    await categoriesService.deleteCategory(id);
    res.json({ message: "Category deleted" });
};

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!name) {
        return res.status(400).json({ error: "name is required" });
    }
    try {
        const result = await categoriesService.updateCategory(id, name, description);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json({
            message: "Category updated",
            affectedRows: result.affectedRows
        });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ error: "Failed to update category" });
    }
};
