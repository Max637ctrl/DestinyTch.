import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TbTrash } from "react-icons/tb";
import { BsPencil } from "react-icons/bs"; // Pencil icon for edit
import Dashboard from './Dashboard'; // Import Dashboard component

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // To track the product being edited
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    image: ''
  });
  const [imageFile, setImageFile] = useState(null); // Track the image file for upload
  const [pinModalVisible, setPinModalVisible] = useState(true); // Show pin modal initially
  const [pinInput, setPinInput] = useState(''); // User input for pin
  const [isPinValid, setIsPinValid] = useState(false); // Pin validation state
  const correctPin = '999uu'; // Hardcoded correct pin (change for production)

  // Fetch the product list from API
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/product/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching the list.");
      }
    } catch (error) {
      toast.error("Error occurred while fetching the list.");
    }
  };

  // Remove a product from the list
  const removeProduct = async (productId) => {
    try {
      const response = await axios.delete(`${url}/api/product/remove/${productId}`);
      if (response.data.success) {
        toast.success('Product removed successfully');
        await fetchList();  // Refresh the list after removal
      } else {
        toast.error('Failed to remove product');
      }
    } catch (error) {
      toast.error('Error occurred while removing the product');
      console.error(error);
    }
  };

  // Open the edit form with pre-filled data
  const editProduct = (product) => {
    setSelectedProduct(product._id); // Set the current product being edited
    setProductData({
      name: product.name,
      price: product.price,
      image: product.image
    });
    setImageFile(null); // Reset image file
  };

  // Handle pin input change
  const handlePinInputChange = (e) => {
    setPinInput(e.target.value);
  };

  // Verify the entered pin
  const verifyPin = () => {
    if (pinInput === correctPin) {
      setIsPinValid(true);  // Valid pin
      setPinModalVisible(false);  // Close the pin modal
      toast.success('Pin Verified!');
      const currentTime = new Date().getTime(); // Get current time in milliseconds
      localStorage.setItem('pinValidUntil', currentTime + 10 * 60 * 1000); // Store timestamp for 10 minutes
    } else {
      toast.error('Incorrect Pin!');
    }
  };

  useEffect(() => {
    // Check if the pin is valid based on localStorage timestamp
    const pinValidUntil = localStorage.getItem('pinValidUntil');
    const currentTime = new Date().getTime();

    if (pinValidUntil && currentTime < pinValidUntil) {
      setIsPinValid(true);  // PIN is still valid
      setPinModalVisible(false);  // Close the pin modal
      toast.success('Pin Verified!'); // Display success message
    }
  }, []);

  useEffect(() => {
    if (isPinValid) {
      fetchList(); // Fetch list only after pin verification
    }
  }, [isPinValid]);

  // Handle image file selection
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle input change for product data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  // Handle form submission for editing a product
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle image upload
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await axios.put(`${url}/api/product/update/${selectedProduct}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.success) {
        toast.success('Product updated successfully');
        setSelectedProduct(null); // Reset the selected product
        setProductData({
          name: '',
          price: '',
          image: ''
        });
        setImageFile(null); // Reset image file
        await fetchList(); // Refresh the list after editing
      } else {
        toast.error('Failed to update product');
      }
    } catch (error) {
      toast.error('Error occurred while updating the product');
      console.error(error);
    }
  };

  // Calculate total number of products
  const totalProducts = list.length;

  // Calculate total price of all products
  const totalPrice = list.reduce((total, product) => total + parseFloat(product.price), 0).toFixed(2);

  return (
    <section className='p-4 sm:p-10 box-border'>
      {/* Pin Modal */}
      {pinModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h4 className="text-xl font-bold mb-4"></h4>
            <div className="form-group mb-7">
              <input
                type="password"
                value={pinInput}
                onChange={handlePinInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder=""
              />
            </div>
            <button
              onClick={verifyPin}
              className="text-white py-2 px-6 rounded hover:bg-black"
            >
              Verify Pin
            </button>
          </div>
        </div>
      )}

      {/* Show Dashboard only after pin verification */}
      {isPinValid && (
        <div>
          <Dashboard 
            totalProducts={totalProducts} // Pass totalProducts to Dashboard
            totalOrdersToday={0} // You can update this if needed
            totalDelivered={0} // You can update this if needed
            totalConfirmedPayments={0} // You can update this if needed
            totalPrice={totalPrice} // Pass the totalPrice to the Dashboard
          />

          <h4 className='bold-22 uppercase mt-6'>Product List</h4>

          <div className='overflow-auto mt-5'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-slate-900/20 text-gray-30 regular-14 xs:regular-16 text-start py-12'>
                  <th className='p-1 text-left'>Products</th>
                  <th className='p-1 text-left'>Title</th>
                  <th className='p-1 text-left'>Price</th>
                  <th className='p-1 text-left'>Remove</th>
                  <th className='p-1 text-left'>Edit</th>
                </tr>
              </thead>
              <tbody>
                {list.map((product) => (
                  <tr
                    className='border-b border-slate-900/20 text-gray-50 p-6 medium-14 text-left'
                    key={product._id}>
                    <td>
                      <img
                        className='rounded-lg ring-1 ring-slate-900/5 m-1'
                        height={38}
                        width={38}
                        src={`${url}/images/` + product.image} alt={product.name} />
                    </td>
                    <td className='p-1'>
                      <div className='line-clamp-3'>{product.name}</div>
                    </td>
                    <td className='p-1'>₦{product.price}</td>
                    <td className='p-1'>
                      <div className='bold-22'>
                        <TbTrash onClick={() => removeProduct(product._id)} />
                      </div>
                    </td>
                    <td className='p-1'>
                      <div className='bold-22'>
                        <BsPencil onClick={() => editProduct(product)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit Product Form */}
          {selectedProduct && (
            <div className="mt-8">
              <h4 className="text-xl font-bold">Edit Product</h4>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                    placeholder="Product Name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                    placeholder="Product Price"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="p-2 border rounded"
                  />
                </div>
                <button type="submit" className="py-2 px-6 bg-black text-white rounded">
                  Update Product
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default List;
