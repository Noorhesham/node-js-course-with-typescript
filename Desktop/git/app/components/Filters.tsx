import React from 'react'
import { MdSell } from 'react-icons/md'

const Filters = () => {
  return (
    <div className='flex items-center text-base md:text-xl text-gray-900 justify-center gap-8'>
      <h3 className=' underline cursor-pointer text-1 py-2 px-4 rounded-full border-gray-400 border'>All</h3>
      <h3 className='  py-2 px-4 hover:text-1 duration-200 cursor-pointer hover:underline rounded-full flex items-center gap-2 border-gray-400 border'>Best Selling <MdSell/></h3>
    </div>
  )
}

export default Filters
