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
