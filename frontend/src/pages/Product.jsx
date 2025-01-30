import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'  // Import useParams
import { ShopContext } from '../context/ShopContext'

const Product = () => {
  const { all_products } = useContext(ShopContext)
  const { productId } = useParams()  // Now you can access the productId from the URL
  console.log("productId: ", productId)

  return (
    <section className='max-padd-container py-20'>
      <div>Product
       
      </div>
    </section>
  )
}

export default Product
