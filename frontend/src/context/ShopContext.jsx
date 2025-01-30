import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");  
  const [all_products, setAll_products] = useState([]);
  const url = "http://localhost:4000";

  // Add an item to the cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      updatedCart[itemId] = updatedCart[itemId] ? updatedCart[itemId] + 1 : 1;
      return updatedCart;
    });

    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
    }
  };

  // Remove an item from the cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;  // Avoid reducing item if it doesn't exist
      const updatedCart = { ...prev };
      updatedCart[itemId] = updatedCart[itemId] > 1 ? updatedCart[itemId] - 1 : 0;
      if (updatedCart[itemId] === 0) delete updatedCart[itemId]; // Optional: remove the item if its quantity is 0
      return updatedCart;
    });

    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
    }
  };

  // Get the total cart amount
  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((totalAmount, itemId) => {
      const itemInfo = all_products.find((product) => product._id === itemId);
      if (itemInfo && cartItems[itemId] > 0) {
        totalAmount += itemInfo.price * cartItems[itemId];
      }
      return totalAmount;
    }, 0);
  };

  // Fetch product list from backend
  const fetchProductList = async () => {
    const response = await axios.get(url + "/api/product/list");
    setAll_products(response.data.data);
  };

  // Load cart data from backend if a token exists
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems({});
  };

  useEffect(() => {
    async function loadData() {
      try {
        await fetchProductList();  // Fetch product list
        const tokenFromStorage = localStorage.getItem("token");

        if (tokenFromStorage) {
          setToken(tokenFromStorage);
          await loadCartData(tokenFromStorage);  // Load cart data if token exists
        }
      } catch (error) {
        console.error("Error loading product or cart data:", error);
      }
    }

    loadData();
  }, []);

  // Sync cartItems with localStorage
  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Include clearCart in the context value
  const contextValue = {
    all_products,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    clearCart, // Added clearCart here
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
