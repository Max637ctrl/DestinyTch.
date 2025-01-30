import React, { useState, useEffect } from 'react';
import upload_area from "../assets/upload_area1.svg";
import { FaPlus } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Add = () => {
    const url = 'http://localhost:4000'.trim();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
    });
    const [loading, setLoading] = useState(false); // Added loading state
    const [pin, setPin] = useState(""); // State for PIN input
    const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track if user has entered correct PIN

    const correctPin = "999uu"; // Hardcoded correct PIN

    useEffect(() => {
        const pinVerificationTime = localStorage.getItem("pinVerificationTime");
        const currentTime = new Date().getTime();

        // Check if the pin is verified and if it's within 10 minutes
        if (pinVerificationTime && currentTime - pinVerificationTime < 600000) {
            setIsAuthenticated(true); // Pin is still valid
        }
    }, []);

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        // Basic validation
        if (!data.name || !data.description || !data.price || !data.category || !image) {
            toast.error("Please fill all fields and upload an image.");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        try {
            setLoading(true); // Set loading to true during request

            const response = await axios.post(`${url}/api/product/add`, formData);
            if (response.data.success) {
                toast.success(response.data.message);
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "",
                });
                setImage(null); // Reset image to null after submit
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Error while uploading product. Please try again.");
        } finally {
            setLoading(false); // Set loading to false after request
        }
    };

    const handlePinSubmit = (e) => {
        e.preventDefault();
        if (pin === correctPin) {
            setIsAuthenticated(true);
            // Store the time of pin verification in localStorage
            localStorage.setItem("pinVerificationTime", new Date().getTime());
            toast.success("Pin Verified! You can now add products.");
        } else {
            toast.error("Incorrect PIN. Please try again.");
        }
    };

    const handleKeyPress = (e) => {
        // Prevent form submission when pressing Enter key in the PIN input
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    if (!isAuthenticated) {
        return (
            <section className='p-4 sm:p-10 w-full bg-primary/20'>
                <form onSubmit={handlePinSubmit} className='flex flex-col gap-y-5 max-w-[555px]'>
                    <h4 className='bold-22 pb-2 uppercase'></h4>
                    <div className='flex flex-col gap-y-2'>
                        <input
                            onChange={(e) => setPin(e.target.value)}
                            value={pin}
                            className='ring-1 ring-slate-900/10 py-1 px-3 outline-none'
                            type='password' // type='number' could cause issues with non-numeric inputs, so keeping it 'text' and manually validating
                            name='pin'
                            placeholder=''
                            maxLength="5" // Limiting to a 5-character PIN length
                            required
                            onKeyPress={handleKeyPress} // Disable enter key press
                        />
                    </div>
                    <button className="text-white py-2 px-6 rounded hover:bg-black">
                        Verify pin
                    </button>
                </form>
            </section>
        );
    }

    return (
        <section className='p-4 sm:p-10 w-full bg-primary/20'>
            <form onSubmit={onSubmitHandler} className='flex flex-col gap-y-5 max-w-[555px]'>
                <h4 className='bold-22 pb-2 uppercase'>Products Upload</h4>

                {/* Image Upload */}
                <div className='flex flex-col gap-y-2 max-w-24 h-24'>
                    <p>Upload image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : upload_area} className='h-20' alt="Upload Area" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />
                </div>

                {/* Product Name */}
                <div className='flex flex-col gap-y-2'>
                    <p>Product name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        className='ring-1 ring-slate-900/10 py-1 px-3 outline-none'
                        type='text' name='name' placeholder='Type here...' required
                    />
                </div>

                {/* Product Description */}
                <div className='flex flex-col gap-y-2'>
                    <p>Product description</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        className='ring-1 ring-slate-900/10 py-1 px-3 outline-none resize-none'
                        name='description' rows="6" placeholder='Describe your product here...' required
                    />
                </div>

                {/* Product Category and Price */}
                <div className='flex items-center gap-x-6 text-gray-900/70 medium-15'>
                    <div className='flex flex-col gap-y-2'>
                        <p>Product category</p>
                        <select
                            onChange={onChangeHandler}
                            value={data.category}
                            className='outline-none ring-1 ring-slate-900/10 pl-2'
                            name='category'
                            required
                        >
                            <option value="">Select</option>
                            <option value="Women">Women</option>
                            <option value="Men">Men</option>
                            <option value="Kids">Kids</option>
                            <option value="Unisex">Unisex</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Cap">Cap</option>
                            <option value="Bags">Bags</option>
                            <option value="Extras">Extras</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <p>Product price</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            name='price'
                            className='ring-1 ring-slate-900/10 pl-2 w-24 outline-none'
                            type='number'
                            placeholder='₦1000'
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    className='btn-dark sm:w-5/12 flexCenter gap-x-2 !py-2 rounded'
                    type='submit'
                    disabled={loading}
                >
                    {loading ? <span>Loading...</span> : <FaPlus />}
                    {loading ? 'Please wait...' : 'Add Product'}
                </button>

            </form>
        </section>
    );
};

export default Add;
