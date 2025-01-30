/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Item from './Item';

const ProductDisplay = ({ category }) => {
  const { all_products } = useContext(ShopContext);

  return (
    <div id="ProductDisplay" className="max-padd-container pt-8 pb-16 xl:pb">
      <h2 className="bold-32">Where Quality Meets Style</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-12">
        {all_products.map((product) => {
          // Check if the category matches or is "All"
          if (category === "All" || category === product.category) {
            return (
              <div key={product._id}> {/* Change from product.id to product._id */}
                <Item product={product} />
              </div>
            );
          }
          return null; // If the category doesn't match, return null
        })}
      </div>
    </div>
  );
};

export default ProductDisplay;
