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

export const updateWarehouse = async (req, res) => {
    const { warehouse_id } = req.params;
    const { location_name, address_city, address_pincode } = req.body;
    if (!location_name || !address_city) {
        return res.status(400).json({ error: "location_name and address_city are required" });
    }

    try {
        const result = await warehouseService.updateWarehouse(
            warehouse_id,
            location_name,
            address_city,
            address_pincode
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Warehouse not found" });
        }

        res.json({
            message: "Warehouse updated successfully",
            affectedRows: result.affectedRows
        });
    } catch (error) {
        console.error("Error updating warehouse:", error);
        res.status(500).json({ error: "Failed to update warehouse" });
    }
};

