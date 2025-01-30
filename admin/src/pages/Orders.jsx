import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaBox } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Orders = ({ url, setTotalOrders }) => {
  const [orders, setOrders] = useState([]);
  const [pin, setPin] = useState(""); // Add state for PIN
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track PIN authentication
  const [showDeliveredOrders, setShowDeliveredOrders] = useState(true); // State to control visibility of delivered orders

  const correctPin = "999uu"; // Hardcoded correct PIN

  // Check if user is already authenticated from localStorage
  useEffect(() => {
    const savedAuthState = localStorage.getItem('isAuthenticated');
    if (savedAuthState === 'true') {
      setIsAuthenticated(true);
      toast.success("New orders are below the list"); // Show success toast when the page is refreshed
    }

    // Check the saved state for delivered orders visibility from localStorage
    const savedShowDeliveredOrders = localStorage.getItem('showDeliveredOrders');
    if (savedShowDeliveredOrders !== null) {
      setShowDeliveredOrders(JSON.parse(savedShowDeliveredOrders)); // Apply saved state
    }
  }, []);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      setTotalOrders(response.data.data.length); // Set total orders count in the parent component
      console.log(response.data.data);
    } else {
      toast.error("Error fetching orders.");
    }
  };

  const statusHandler = async (event, orderId) => {
    console.log(event, orderId);
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value,
    });

    if (response.data.success) {
      toast.success(" Order status updated successfully!"); // Add success toast
      await fetchAllOrders();
    } else {
      toast.error("Error updating status.");
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === correctPin) {
      setIsAuthenticated(true); // Allow access after correct PIN
      toast.success("New orders are below the list if there's any"); // Show success message on correct PIN
      localStorage.setItem('isAuthenticated', 'true'); // Save authentication state in localStorage
    } else {
      toast.error("Incorrect PIN. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission on "Enter"
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllOrders(); // Fetch orders only if PIN is correct
    }
  }, [isAuthenticated]);

  // Count the number of orders for each status
  const statusCounts = {
    "Payment Under Review": orders.filter(order => order.status === "Payment Under Review").length,
    "Payment Confirmed": orders.filter(order => order.status === "Payment Confirmed").length,
    "Payment Cancelled": orders.filter(order => order.status === "Payment Cancelled").length,
    "Ready for Pick-up": orders.filter(order => order.status === "Ready for Pick-up").length,
    "Order Cancelled": orders.filter(order => order.status === "Order Cancelled").length,
    "Out For Delivery": orders.filter(order => order.status === "Out For Delivery").length,
    "Delivered": orders.filter(order => order.status === "Delivered").length,
    "Payment not Found": orders.filter(order => order.status === "Payment not Found").length,
  };

  // Calculate the total amount for all 'Delivered' orders
  const totalDeliveredAmount = orders
    .filter(order => order.status === "Delivered")
    .reduce((total, order) => total + order.amount, 0);

  // Save delivered orders visibility state to localStorage
  const toggleDeliveredOrdersVisibility = () => {
    setShowDeliveredOrders(prevState => {
      const newState = !prevState;
      localStorage.setItem('showDeliveredOrders', JSON.stringify(newState)); // Save state to localStorage
      return newState;
    });
  };

  return (
    <section className='p-4 sm:p-10 box-border w-full'>
      {/* Dashboard with Total Orders and status-specific cards */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='bg-gray-200 p-4 rounded'>
          <h5 className='font-bold'>Total Orders</h5>
          <p>{orders.length}</p> {/* Displaying the number of orders */}
        </div>

        {Object.keys(statusCounts).map((status) => (
          <div key={status} className='bg-gray-200 p-4 rounded'>
            <h5 className='font-bold'>{status}</h5>
            <p>{statusCounts[status]}</p> {/* Displaying the count for each status */}
          </div>
        ))}

        {/* Card for Total Delivered Amount */}
        <div className='bg-gray-200 p-4 rounded'>
          <h5 className='font-bold'>Total Delivered Amount</h5>
          <p>₦{totalDeliveredAmount}</p> {/* Displaying the total amount for all 'Delivered' orders */}
        </div>
      </div>

      {/* Button to toggle visibility of delivered orders */}
      <button 
        onClick={toggleDeliveredOrdersVisibility} 
        className="my-4 py-2 px-6 rounded text-white bg-primary hover:bg-black"
      >
        {showDeliveredOrders ? "Archive Delivered Orders" : "Unarchive Delivered Orders"}
      </button>

      <h4 className='bold-22 uppercase mt-6'>Orders Below </h4>
      <div className='overflow-auto mt-5'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-slate-900/20 text-gray-30 regular-14 xs:regular-16 text-start py-12'>
              <th className='p-1 text-left hidden sm:flex'>Package</th>
              <th className='p-1 text-left'>Order</th>
              <th className='p-1 text-left'>Items</th>
              <th className='p-1 text-left'>Price</th>
              <th className='p-1 text-left'>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              // Only display orders based on the visibility of delivered orders
              if (!showDeliveredOrders && order.status === "Delivered") {
                return null; // Skip displaying delivered orders when hidden
              }
              return (
                <tr key={order._id} className='border-b border-slate-900/20 text-gray-50 p-6 medium-14 text-left'>
                  <td className='p-1 hidden sm:table-cell'> <FaBox /> </td>
                  <td className='p-1'>
                    <div className='pb-2'>
                      <p>
                        {order.items.map((item, i) => {
                          return item.name + " X " + item.quantity + (i < order.items.length - 1 ? ", " : "");
                        })}
                      </p>
                    </div>
                    <hr className='w-1/2 border-t-2 border-gray-300' />
                    <div>
                      <h5 className='medium-14'>{order.address.FullName + ", " + order.address.phone}</h5>
                      <div>
                        <p>{order.address.email + ", "}</p>
                        <p>{order.address.city + ", " + order.address.address + ", " + order.address.state + ", " + order.address.country}</p>
                      </div>
                      <div>{order.address.message}</div>
                      <p>{order.address.altnumber}</p>
                    </div>
                  </td>

                  <td className='p-1'>{order.items.length}</td>
                  <td className='p-1'>₦{order.amount}</td>
                  <td className='p-1'>
                    <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='bg-primary ring-1 text-sm max-w-20 xl:max-w-28'>
                      <option value={"Payment Under Review"}>Payment Under Review</option>
                      <option value={"Payment Confirmed"}>Payment Confirmed</option>
                      <option value={"Payment Cancelled"}>Payment Cancelled</option>
                      <option value={"Ready for Pick-up"}>Ready for Pick-up</option>
                      <option value={"Order Cancelled"}>Order Cancelled</option>
                      <option value={"Out For Delivery"}>Out For Delivery</option>
                      <option value={"Delivered"}>Delivered</option>
                      <option value={"Payment not Found"}>Payment not Found</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Orders;
