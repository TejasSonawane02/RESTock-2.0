import * as personService from "./person.service.js";

export const getPersons = async (req, res) => {
    try {
        const persons = await personService.getPersons();
        res.json(persons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createPerson = async (req, res ) => {
    try {
        const { first_name, last_name, email } = req.body;
        if (!first_name || !last_name) {
            return res.status(400).json({ error: "first_name and last_name are required" });
        }
        await personService.createPerson(first_name, last_name, email);
        res.status(201).json({ message: "Person created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};

export const deletePerson = async (req, res) => {
    try {
        const { person_id } = req.params;
        await personService.deletePerson(person_id);
        res.json({ message: "Person deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};