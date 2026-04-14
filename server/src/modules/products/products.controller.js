import * as productService from "./products.service.js";

export const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      category_id,
      supplier_id,
      name,
      cost_price,
      sale_price
    } = req.body;

    await productService.createProduct(
      category_id,
      supplier_id,
      name,
      cost_price,
      sale_price
    );

    res.json({
      message: "Product created successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await productService.deleteProduct(id);

    res.json({
      message: "Product deleted"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      category_id,
      supplier_id,
      name,
      cost_price,
      sale_price
    } = req.body;
    if (category_id == null || supplier_id == null || !name || cost_price == null || sale_price == null) {
      return res.status(400).json({ error: "category_id, supplier_id, name, cost_price, and sale_price are required" });
    }

    const result = await productService.updateProduct(
      id,
      category_id,
      supplier_id,
      name,
      cost_price,
      sale_price
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product updated",
      affectedRows: result.affectedRows
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};