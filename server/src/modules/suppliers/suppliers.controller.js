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


