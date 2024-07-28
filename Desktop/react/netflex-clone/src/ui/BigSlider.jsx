import Swiper from "swiper"
import VideoCard from "./VideoCard"
import { SwiperSlide } from "swiper/react"

function BigSlider() {
    return (
        <div>
            <Swiper 
        slidesPerView={"auto"}
        spaceBetween={5}
        centeredSlides={true}
        loop={true}
        pagination={{
          type: "bullets",
          clickable: true,
        }}
        cssMode={true}
        navigation={true}
        modules={[FreeMode, Navigation, Pagination]}
        className=" ml-10 select-none"
      >
        {movies?.map((movie, i) => (
          <SwiperSlide key={i} className=" swiper-slide-big ">
           {<VideoCard movieId={movie.id}  video={movie}/>}
          </SwiperSlide>
        ))}
      </Swiper>
        </div>
    )
}

export default BigSlider
