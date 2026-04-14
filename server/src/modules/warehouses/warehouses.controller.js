import * as warehouseService from "./warehouses.service.js";

export const getWarehouses = async (req, res) => {
  const warehouses = await warehouseService.getWarehouses();
  res.json(warehouses);
};

export const createWarehouse = async (req, res) => {
    const { location_name, address_city, address_pincode } = req.body;

    if (!location_name || !address_city) {
        return res.status(400).json({ error: "location_name and address_city are required" });
    }
    await warehouseService.createWarehouse(location_name, address_city, address_pincode);

    res.status(201).json({ message: "Warehouse created successfully" });
};

export const deleteWarehouse = async (req, res) => {
    const { warehouse_id } = req.params;

    await warehouseService.deleteWarehouse(warehouse_id);

    res.json({ message: "Warehouse deleted successfully" });
};  

