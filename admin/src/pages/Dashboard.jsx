import React from 'react';

const Dashboard = ({ totalProducts, totalOrdersToday, totalDelivered, totalConfirmedPayments, totalPrice }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {/* Total Products Card */}
      <div className="bg-gray-200 p-4 rounded shadow">
        <h5 className="font-bold">Total Products</h5>
        <p>{totalProducts}</p>
      </div>

      {/* Total Price Card */}
      <div className="bg-gray-200 p-4 rounded shadow">
        <h5 className="font-bold">Total Price of All Products</h5>
        <p>₦{totalPrice}</p>
      </div>

     
    </div>
  );
};

export default Dashboard;
