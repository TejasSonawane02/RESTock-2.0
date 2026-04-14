import * as roleService from "./roles.service.js";

export const getRoles = async (req, res) => {
    try {
        const roles = await roleService.getRoles();
        res.json(roles);
    }catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createRole = async (req, res) => {
    try {
        const { role_name } = req.body;
        if (!role_name) {
            return res.status(400).json({ error: "role_name is required" });
        }
        await roleService.createRole(role_name);
        res.status(201).json({ message: "Role created successfully" });
    }catch (error) {
        console.error("Error creating role:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }   
};

export const deleteRole = async (req, res) => {
    try {
        const { role_id } = req.params;
        await roleService.deleteRole(role_id);
        res.json({ message: "Role deleted successfully" });
    }catch (error) {
        console.error("Error deleting role:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }   
};