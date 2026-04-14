import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from "morgan";
import helmet from "helmet";

import { pool } from "./db/index.js";

dotenv.config();

const app = express();    
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// Import and use routers

// Categories
import categoriesRouter from "./modules/categories/categories.router.js";
app.use("/api/categories", categoriesRouter);

// Suppliers
import suppliersRouter from "./modules/suppliers/suppliers.router.js";
app.use("/api/suppliers", suppliersRouter);

// Warehouses
import warehousesRouter from "./modules/warehouses/warehouses.router.js";
app.use("/api/warehouses", warehousesRouter);

app.get("/", (req, res) => {
  res.send("RESTock API running!");
});

// Test DB Connection
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database Connected");
    connection.release();
  } catch (error) {
    console.error("Database Error:", error);
  }
})();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});