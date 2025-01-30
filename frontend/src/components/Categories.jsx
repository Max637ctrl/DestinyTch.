/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { categories } from '../assets/data';

const Categories = ({category, setCategory }) => {
  return (
    <section className='max-padd-container py-16 xl:py-10' id='shop'>
      <div className='flex flex-wrap justify-center items-center gap-6'>
        {categories.map((item) => (
          <div
          onClick={()=> setCategory(prev=>prev===item.name?"All":item.name)}
            id={item.name}
            key={item.name}
            className={`category-item  px-4  text-center cursor-pointer ${category===item.name?" text-[#ffd873] ":" "} `}
          >
            
            <h4 className='mt-6 medium-18'>{item.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
