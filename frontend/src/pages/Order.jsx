import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the toast styles

const Order = () => {
  const { all_products, cartItems, getTotalCartAmount, token, clearCart } = useContext(ShopContext);
  const [data, setData] = useState({
    FullName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    state: "",
    country: "Nigeria",
    message: "",
    altnumber: ""
  });

  const [orderPlaced, setOrderPlaced] = useState(false); // New state to track order status
  const [bankDetails, setBankDetails] = useState(null); // State for displaying bank details after order
  const [isButtonClicked, setIsButtonClicked] = useState(false); // Track button click state

  const url = "http://localhost:4000"; // Localhost address
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault(); // Prevent default form submission
    
    // Set button as clicked to show processing feedback
    setIsButtonClicked(true);

    if (!cartItems || Object.keys(cartItems).length === 0) {
      alert("Your cart is empty! Please add items to your cart before placing an order.");
      setIsButtonClicked(false);
      return;
    }

    let orderItems = [];

    all_products.forEach((item) => {
      const quantity = cartItems[item._id];

      if (quantity > 0) {
        let itemInfo = {
          id: item._id,
          name: item.name,
          price: item.price,
          category: item.category,
          description: item.description,
          image: `${url}/images/${item.image}`,
          quantity: quantity,
        };

        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 500, // Add VAT/Fees here
    };

    try {
      let response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });

      if (response.data.success) {
        setOrderPlaced(true);
        setBankDetails(response.data.bankDetails);
      } else {
        alert("Error placing order, Please Login and try again");
        setIsButtonClicked(false); // Re-enable button if order fails
      }
    } catch   (error) {
      console.error("Error placing order:", error);
      alert("There was an error with your order.");
      setIsButtonClicked(false); // Re-enable button if error
    }
  };

  // Function to handle clearing the cart and navigating to home
  const handleDoneClick = () => {
    toast.info("Processing, please wait...", {
      position: "top-center",
      autoClose: 5000, // Auto close after 5 seconds
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });

    setTimeout(() => {
      clearCart(); // Clears the cart
      navigate('/myorders'); // Navigates back to the orders page

      toast.success("Order submitted successfully, your payment will be confirmed and order will be processed immediately", {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }, 5000);
  };

  const totalAmount = getTotalCartAmount() + 500; // Get total amount including VAT or fees

  return (  
    <section className='max-padd-container py-28 xl:py-32'>
      <form onSubmit={placeOrder} className='flex flex-col xl:flex-row gap-20 xl:gap-28'>
        <div className='flex flex-1 flex-col gap-3 text-[95%]'>
          <h3 className='bold-28 mb-4'>Delivery information</h3>
          <div className='flex-gap-3'>
            <input
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2"
              type='text'
              placeholder='Full name'
              name='FullName'
              value={data.FullName}
              onChange={onChangeHandler}
              required
            />
            <input
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none my-3 w-1/2"
              type='number'
              placeholder='Phone number'
              name='phone'
              value={data.phone}
              onChange={onChangeHandler}
              required
            />
            <input
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2"
              type='email'
              placeholder='Email address'
              name='email'
              value={data.email}
              onChange={onChangeHandler}
              required
            />
            <input
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2"
              type='text'
              placeholder='City/Town'
              name='city'
              value={data.city}
              onChange={onChangeHandler}
              required
            />
          </div> 
          <input
            className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none"
            type='text'
            placeholder='Full Address'
            name='address'
            value={data.address}
            onChange={onChangeHandler}
            required
          />
          <div className='flex gap-3'>
            <input
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2"
              type='text'
              placeholder='State'
              name='state'
              value={data.state}
              onChange={onChangeHandler}
              required
            />
            <input
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2"
              type="text"
              placeholder='Nigeria'
              name='country'
              value={data.country}
              disabled
            />
          </div>
          <div className='flex gap-3'>
            <input
              type="text"
              placeholder='Message'
              name='message'
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2"
              value={data.message}
              onChange={onChangeHandler}
            />
            <input
              type="text"
              placeholder='Whatsapp number'
              name='altnumber'
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2"
              value={data.altnumber}
              onChange={onChangeHandler}
            />
          </div>
        </div>

        <div className='flex flex-1 flex-col'>
          <div className='flex flex-1 flex-col gap-2'>
            <h4 className='bold-22'>Summary</h4>
            <div>
              <div className='flexBetween py-3'>
                <h4 className='medium-16'>Subtotal:</h4>
                <h4 className='text-gray-30 font-semibold'>
                  ₦{getTotalCartAmount()}
                </h4>
              </div>
              <hr />
              <div className='flexBetween py-3'>  
                <h4 className='medium-16'>VAT Fee:</h4>
                <h4 className='text-gray-30 font-semibold'>
                  ₦{getTotalCartAmount() === 0 ? 0 : 500}
                </h4>
              </div>
              <hr />
              <div className='flexBetween py-3'>
                <h4 className='medium-18'>Total:</h4>
                <h4 className='bold-18'>
                ₦{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 500}
                </h4>
              </div>
            </div>
            <button
              type='submit'
              className='btn-secondary w-52 rounded'
              disabled={isButtonClicked || totalAmount === 500} // Disable button if clicked or total is 0
            >
              {isButtonClicked ? "Processing..." : "Proceed to Checkout"}  {/* Change text */}
            </button>
          </div>
        </div>
      </form>

      {orderPlaced && bankDetails && (
        <div className="bank-details mt-8 p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-2xl font-bold mb-6 text-center">Bank Transfer Details</h3>
          <p className="text-lg mb-6 text-center">Please transfer the total amount to the following bank account:</p>
          
          <div className="bg-transparent rounded-md p-6 space-y-6 shadow-lg">
            {/* Bank Name */}
            <div className="flex justify-between items-center">
              <p className="font-semibold text-black text-lg">Bank Name:</p>
              <p className="text-black text-lg">{bankDetails.bankName}</p>
            </div>

            {/* Account Number */}
            <div className="flex justify-between items-center">
              <p className="font-semibold text-black text-lg">Account Number:</p>
              <p className="text-black text-lg">{bankDetails.accountNumber}</p>
            </div>

            {/* Account Name */}
            <div className="flex justify-between items-center">
              <p className="font-semibold text-black text-lg">Account Name:</p>
              <p className="text-black text-lg">{bankDetails.accountName}</p>
            </div>

            {/* Amount */}
            <div className="flex justify-between items-center">
              <p className="font-semibold text-black text-lg">Amount:</p>
              <p className="text-black text-lg">₦{totalAmount}</p>
            </div>
          </div>
          
          <p className="mt-6 text-lg text-center font-medium text-gray-800">
          <button
              type='submit'
              className='btn-secondary w-52 rounded'
              onClick={handleDoneClick} // Call the handler when clicked
            >
              DONE
            </button>
          </p>
        </div>
      )}
    </section>
  );
};

export default Order;
