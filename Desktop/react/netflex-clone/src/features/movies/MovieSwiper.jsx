import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper and modules styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import {
  Autoplay,
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/modules";
import { IMAGE_URL } from "../../utils/Constans";

function MovieSwiper({ slides, curSlide, setSlide }) {
  return (
    <Swiper
      effect={"coverflow"}
      initialSlide={curSlide}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
      loop={true}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      className="movieSwiper"
    >
      {slides?.map((slide, index) => (
        <SwiperSlide
          onClick={() => setSlide(index)}
          key={index}
          className="swiper-slide"
        >
          <img src={`${IMAGE_URL}${slide.poster_path}`} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MovieSwiper;
