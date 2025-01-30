import React, { useContext } from 'react';
import { FaMinus, FaPlus, FaUpRightAndDownLeftFromCenter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Item = ({ product }) => {
  const { cartItems, addToCart, removeFromCart, url} = useContext(ShopContext);

  // Fallback for undefined cart item count
  const itemCount = cartItems && cartItems[product?._id] ? cartItems[product._id] : 0;

  return (
    <div className="shadow-lg">
      <div className="relative group">
        <img 
          src={`${url}/images/${product.image}`} 
          alt={product.name} 
          className="rounded-tl-2xl rounded-tr-2xl" 
        />

        <div className="relative bottom-5 flexCenter gap-x-2">
          <Link 
            to={`/`} 
            className="bg-white h-8 w-8 p-2 rounded-full shadow-inner cursor-pointer transition-all duration-100 opacity-0 group-hover:opacity-100"
          >
           
          </Link>

          <div className="flex items-center gap-2">
            {/* Show FaPlus when itemCount is 0, otherwise show FaMinus and the current count */}
            {itemCount === 0 ? (
              <FaPlus 
                onClick={() => addToCart(product._id)}  // Adding product to cart
                className="bg-white h-8 w-8 p-2 rounded-full shadow-inner cursor-pointer" 
              />
            ) : (
              <div className="bg-white rounded-full flex justify-center items-center gap-2 p-2">
                <FaMinus 
                  onClick={() => removeFromCart(product._id)} // Removing product from cart
                  className="rounded-full h-8 w-8 p-2 cursor-pointer" 
                />
                <p>{itemCount}</p>
                <FaPlus 
                  onClick={() => addToCart(product._id)} // Increment count by adding product to cart again
                  className="rounded-full bg-secondary h-6 w-6 p-1 m-1 cursor-pointer" 
                />
              </div>
            )}
          </div>
        </div>

        <div className="p-3">
          <div className="flex justify-between">
            <h5 className="text-[16px] font-bold text-gray-900/50">{product.category}</h5>
            <div className="text-secondary bold-18">₦{product.price}</div>
          </div>
          <h4 className="medium-18 mb-1 line-clamp-1">{product.name}</h4>
          <p className="line-clamp-2">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Item;
