import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import Suppliers from './pages/Suppliers';
import Products from './pages/Products';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import Warehouses from './pages/Warehouses';
function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">

        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md">
          <div className="p-4 text-xl font-bold border-b">RESTock</div>
          <nav className="p-4">
            <ul>
              <li className="mb-2">
                <Link to="/" className="block p-2 rounded hover:bg-gray-200">Dashboard</Link>
              </li>
              <li className="mb-2">
                <Link to="/categories" className="block p-2 rounded hover:bg-gray-200">Categories</Link>
              </li>
              <li className="mb-2">
                <Link to="/suppliers" className="block p-2 rounded hover:bg-gray-200">Suppliers</Link>
              </li>
              <li className="mb-2">
                <Link to="/products" className="block p-2 rounded hover:bg-gray-200">Products</Link>
              </li>
              <li className="mb-2">
                <Link to="/inventory" className="block p-2 rounded hover:bg-gray-200">Inventory</Link>
              </li>
              <li className="mb-2">
                <Link to="/orders" className="block p-2 rounded hover:bg-gray-200">Orders</Link>
              </li>
              <li className="mb-2">
                <Link to="/warehouses" className="block p-2 rounded hover:bg-gray-200">Warehouses</Link>
              </li>
            </ul>
          </nav>
        </div>  

        {/* Main Content */}
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/products" element={<Products />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/warehouses" element={<Warehouses />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App