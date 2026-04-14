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