import * as supplierService from './suppliers.service.js';

export const getSuppliers = async (req, res) => {
    try {
        const suppliers = await supplierService.getSuppliers();
        res.json(suppliers);
    } catch (error) {
        console.error("Error fetching suppliers:", error);
        res.status(500).json({ error: "Failed to fetch suppliers" });
    }
};

export const createSupplier = async (req, res) => {
    const { company_name, contact_person } = req.body;
    try {
        const result = await supplierService.createSupplier(company_name, contact_person);
        res.status(201).json({ message: "Supplier created successfully", supplierId: result.insertId });
    } catch (error) {
        console.error("Error creating supplier:", error);
        res.status(500).json({ error: "Failed to create supplier" });
    }
};

export const deleteSupplier = async (req, res) => {
    const { id } = req.params;
    try {
        await supplierService.deleteSupplier(id);
        res.json({ message: "Supplier deleted" });
    } catch (error) {
        console.error("Error deleting supplier:", error);
        res.status(500).json({ error: "Failed to delete supplier" });
    }   
};

export const updateSupplier = async (req, res) => {
    const { id } = req.params;
    const { company_name, contact_person } = req.body;
    if (!company_name) {
        return res.status(400).json({ error: "company_name is required" });
    }
    try {
        const result = await supplierService.updateSupplier(id, company_name, contact_person);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Supplier not found" });
        }

        res.json({
            message: "Supplier updated",
            affectedRows: result.affectedRows
        });
    } catch (error) {
        console.error("Error updating supplier:", error);
        res.status(500).json({ error: "Failed to update supplier" });
    }
};


