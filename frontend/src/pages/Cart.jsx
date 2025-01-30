/* eslint-disable no-unused-vars */
import React from 'react'
import { all_products } from '../assets/data'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
  import {TbTrash} from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const navigate = useNavigate();

  const {url, cartItems, all_products, removeFromCart, getTotalCartAmount} = useContext(ShopContext)
  return (
    <section className='max-padd-container pt-20'> 
      <div className='py-15'>
    <table className='w-full'>
      <thead>
        <tr className=' border-b border-slate-900/20 text-gray-30 regular-14 xs:regular xs:regular-16 text-start py-12  '>
        <th className='p-1 text-left'>Products</th>
        <th className='p-1 text-left'>Title</th>
        <th className='p-1 text-left'>Price</th>
        <th className='p-1 text-center'>Quantity</th>
        <th className='p-1 text-center'>Total</th>
        <th className='p-1 text-center'>Remove</th>

        </tr>
      </thead>
      <tbody>
  {all_products.map((product) => {
    if (cartItems[product._id] > 0) {
      return (
        <tr key={product._id} className="border-b border-slate-900/20 text-gray-50 p-6 medium-14 ">
          <td className="p-1">
            <img src= {url+"/images/"+product.image} height={38} width={38} className="rounded-lg ring-1 ring-slate-900/5 m-1" />
          </td>
          <td className="p-1">
            <div className="line-clamp-3">{product.name}</div>
          </td>
          
          <td className="p-1 border-r border-slate-300 text-left">₦{product.price}</td> {/* Add border-right */}
          <td className="border-r border-slate-300 text-center">{cartItems[product._id]}</td> {/* Add border-right */}
          <td className="border-r border-slate-300 text-center">₦{product.price * cartItems[product._id]}</td> {/* Add border-right */}
          <td className="p-1">
            <div className="bold-22 ">
              <TbTrash className=" text-center" onClick={() => { removeFromCart(product._id) }} />
            </div>
          </td>
        </tr>
      );
    }
    return null;
  })}
</tbody>

    </table>
    <div className='flex flex-col xl:flex-row gasp-20 mt-20'>
      <div className='flex flex-1 flex-col gap-2'>
      <h4 className='bold-22'>Summary</h4>
      <div>
        <div className='flexBetween py-3'>
          <h4 className='medium-16'>Subtotal:</h4>
          <h4 className='text-gray-30 font-semibold' >₦{getTotalCartAmount()}</h4>
        </div>
        <hr />
        <div className='flexBetween py-3'>
          <h4 className='medium-16' >VAT Fee:</h4>
          <h4 className='text-gray-30 font-semibold' >₦{getTotalCartAmount()===0?0:500}</h4>
        </div>
        <hr />
        <div className='flexBetween py-3'>
          <h4 className='medium-18'>Total:</h4>
          <h4 className='bold-18'>₦{getTotalCartAmount()===0?0:getTotalCartAmount()+500}</h4>
        </div>
      
        <button
  onClick={() => navigate('/order')}
  className='btn-secondary w-52 rounded'
  disabled={getTotalCartAmount() === 0}  // Disable if total is 0
>
  Proceed to Checkout
</button>

    </div>
    </div>
    <div className='flex flex-1 flex-col gap-8'>
    <h4 className='bold-20 capitalize'>Enter your coupon code</h4>
    <div className='flexBetween h-[2.8rem] bg-primary ring-1 ring-slate-900/10 w-full max-w-[488px] rounded'>
      <input type='text' placeholder='Coupon code (optional)' className='pl-3 bg-transparent border-none outline-none' />
      <button  className='btn-dark rounded relative !px-10 !py-3'>Submit</button>
      </div>
      </div>
</div>
  </div>
    </section>
  )
}

export default Cart
