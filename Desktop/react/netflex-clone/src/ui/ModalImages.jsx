import {motion} from "framer-motion"
import { IoIosExit } from "react-icons/io";
import { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import { IMAGE_URL } from "../utils/Constans";
import { LazyLoadComponent } from "react-lazy-load-image-component";

function ModalImages({slides,index,setClick}) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    function closeModal(){
        setClick(false)
    }
    return (
       <>
        <Swiper
        initialSlide={index}
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 z-[99999] select-none top-0 fixed lg:top-10 left-0 w-[100%] h-[100%] backdrop-blur-md transition-all duration-75 "
      >
        <IoIosExit className="fixed text-gray-300 hover:text-red-700 cursor-pointer duration-100 top-20 lg:top-5 left-10 z-50 text-6xl " onClick={closeModal}/>
        {slides?.map((slide, index) => (
          <SwiperSlide
        
            key={index}
            className="swiper-max top-[30%] lg:top-0"
          >
         <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className=" w-full"
        >
            <LazyLoadComponent>

            <img className=" w-full" src={`${IMAGE_URL}${slide?.file_path}`} alt="" />
            </LazyLoadComponent>
        </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
      
       </>
    )
}

export default ModalImages
