/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Components and Pages
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Calculator from './pages/Calculator';
import Dashboard from './pages/Dashboard'; // Add this import for the Dashboard component

export default function App() {
  // Use environment variable for URL
  const url = "http://localhost:4000"; // Default fallback if env variable is not set

  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="flex max-padd-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            {/* Define Routes */}
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
            <Route path="/calc" element={<Calculator url={url} />} />
            {/* Route for Dashboard */}
           
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
