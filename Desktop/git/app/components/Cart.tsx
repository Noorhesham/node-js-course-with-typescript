import React from 'react'
import { LuShoppingCart } from 'react-icons/lu'

const Cart = () => {
  return (
    <div className=' bg-white border border-gray-800 relative rounded-full p-2 text-gray-900 hover:bg-[#1D61E7] cursor-pointer hover:text-white  duration-200'>
      <LuShoppingCart  className=' text-xl' />
      <span className=' w-4 h-4  absolute rounded-full top-0  text-center flex items-center justify-center text-xs -right-2 text-white bg-1'>2</span>
    </div>
  )
}

export default Cart
