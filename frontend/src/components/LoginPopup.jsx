import React, { useContext, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';  // Import toast
import 'react-toastify/dist/ReactToastify.css';  // Import the default CSS for toastify

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(ShopContext);
  const [state, setState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (state === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
        // Success toast with 2 seconds auto-close
        toast.success(`${state === "Login" ? "Logged in" : "Signed up"} successfully!`, {
          autoClose: 500, // Close after 2 seconds
        });
      } else {
        // Error toast with 2 seconds auto-close
        toast.error(response.data.message, {
          autoClose: 1000, // Close after 2 seconds
        });
      }
    } catch (error) {
      // Error handling for network or unexpected issues
      toast.error("An error occurred. Please try again later.", {
        autoClose: 1000, // Close after 2 seconds
      });
    }
  };

  return (
    // The overlay div makes the popup full-screen, and ensures it's always centered
    <div className="absolute h-full w-full bg-black/40 z-50 flexCenter">
      <form onSubmit={onLogin} className="bg-white w-[366px] p-7 rounded-lg shadow-md">
        <div className="flex justify-between items-baseline">
          <h4 className="bold-28">{state}</h4>
          <FaXmark
            onClick={() => setShowLogin(false)} // Closes the popup when clicked
            className="medium-20 text-slate-900/70 cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-4 my-6 ">
          {state === "Sign Up" && (
            <input
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              name="name"
              placeholder="Username"
              required
              className="border border-slate-900/20 p-2 pl-4 rounded-md outline-none"
            />
          )}

          <input
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="border border-slate-900/20 p-2 pl-4 rounded-md outline-none"
          />

          <input
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            name="password"
            placeholder="Password"
            required
            className="border border-slate-900/20 p-2 pl-4 rounded-md outline-none"
          />
        </div>

        <button type="submit" className="btn-secondary rounded-md w-full">
          {state === "Sign Up" ? "Create account" : "Login"}
        </button>

        {state === "Sign Up" && (
  <div className="flex items-baseline gap-x-3 mt-6 mb-4">
    <input type="checkbox" required />
    <p className="relative bottom-1">
      By continuing, you agree to our{" "}
      <span>Terms of Service</span> and <span>Privacy Policy</span>
    </p>
  </div>
)}


        {state === "Login" ? (
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="cursor-pointer text-secondary"
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="cursor-pointer text-secondary"
            >
              Login
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
