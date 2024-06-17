import React from 'react'
import { ProductProps } from '../types'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {   FaStar } from 'react-icons/fa';
import DrawerComponent from './DrawerComponent';
import ButtonRounded from './ButtonRounded';
import Motion from './Motion';
import { PriceProvider } from '../context/PriceContext';

const Product = ({product}:{product:ProductProps}) => {
    const {product_name,price_starts_from,description,parent_category,img_url,quantity,food_preference,average_rating,blurDataURL,
       rating_count,ranking,child_category,id}=product

  return (
    <PriceProvider>
    <Motion className='flex glass mx-auto hover:-translate-y-2 hover:border-1  duration-200 border-gray-400  relative border  shadow-lg w-full h-full  p-4 lg:p-0  rounded-xl   items-center  flex-row-reverse  md:flex-col'>
      <div className=' relative   w-[150px] h-[150px]   md:w-full md:h-56 rounded-t-xl  overflow-hidden  lg:bg-gray-200'>
        <LazyLoadImage effect='blur' height={'100%'} width={'100%'}  alt={product_name}  src={img_url} className=' w-full h-full  rounded-xl lg:rounded-y-xl   mx-auto  object-center lg:object-contain absolute'/>
        </div>
        <DrawerComponent name={product_name} id={id} trigger={ <>
          <ButtonRounded notbtn
          text="Add"
          className="absolute text-xs md:text-sm z-20 -translate-x-[50%] right-3 top-[80%] w-fit md:left-1/2 md:top-[46%] shadow-md "
        />
        </>}/>
      <div className=' flex flex-1 flex-col items-start w-full justify-between  px-3 pb-1 md:px-4 md:py-3'>
      <div className=' flex items-center w-full justify-between '>
      <h2 className=' font-bold text-sm lg:text-lg my-2'>{product_name}</h2>
      {price_starts_from>0&&<span className=' text-sky-400 text-xs md:text-base font-semibold '>{price_starts_from}₹</span>}
      </div>
      {!price_starts_from&&<span className=' font-semibold line-through text-red-400 mr-auto mb-2'>Not Specified</span>}
      {<span className='flex md:my-1 text-xs lg:text-base items-center text-gray-400 gap-2'><FaStar className=' text-1'/>{`${average_rating} (${rating_count} Reviews)`}</span>}
      <div className='flex items-center my-2 gap-2'>
      <span className=' md:py-1 px-1 md:px-2 rounded-full text-gray-50 bg-2 border-gray-600 text-xs md:text-sm border'>{parent_category}</span>
      <span className=' md:py-1 px-1 md:px-2 rounded-full text-gray-50 bg-2 border-gray-600 text-xs md:text-sm border'>{child_category}</span>
      </div>
      <p className=' text-xs lg:text-base text-gray-600'>{description.length>85?<>
        {description.slice(0,85)}<span className=' text-blue-300 hover:text-blue-400 duration-150 cursor-pointer'> , Read More...</span></>:`${description}`}</p>
      </div>
    </Motion>
    </PriceProvider>
  )
}

export default Product
