import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Verify from "./pages/Verify";
import MyOrders from "./pages/MyOrders";
import { useState, useEffect, useContext } from "react"; // Importing useEffect and useContext
import LoginPopup from "./components/LoginPopup";  
import { ToastContainer, toast } from 'react-toastify'; // Importing toastify
import 'react-toastify/dist/ReactToastify.css'; // Importing default styles
import { ShopContext } from './context/ShopContext'; // Importing ShopContext

export default function App() {
  const { token } = useContext(ShopContext); // Accessing the token from the context
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    // Check if the user is not at the top of the page
    if (window.scrollY > 0) {
      // Show toast alert telling the user to scroll up
      toast.info("Please scroll to the top of the page to log in.", {
        autoClose: 1100, 
        closeOnClick: true,  
        pauseOnHover: true,  
      });
    } else {
      // If the user is at the top, show the login popup
      setShowLogin(true);
    }
  };

  // Show a toast message when the main page loads
  useEffect(() => {
    if (!token) { // If the token is not present (user is not logged in)
      toast.success("Welcome to DestinyTch Ecommerce! Please log in or sign up to continue.", {
        position: "top-left", // Position of the toast
        autoClose: 3000, // Duration before the toast closes
        hideProgressBar: true, // Show the progress bar
        closeOnClick: true, // Allow closing the toast by clicking on it
        pauseOnHover: true, // Pause the toast when hovered
      });
    } else {
      toast.success("You are already signed in", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }, [token]); // Re-run the effect if the token changes

  return (
    <BrowserRouter>
      {/* Conditionally render LoginPopup when showLogin is true */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      {/* Passing handleLoginClick to Header component */}
      <Header setShowLogin={setShowLogin} onLoginClick={handleLoginClick} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />}>
          {/* Nested route for specific product */}
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/myorders" element={<MyOrders />} />
      </Routes>

      {/* ToastContainer will render the toast notifications */}
      <ToastContainer />
    </BrowserRouter>
  );
}
