import Card from "../Card";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import VideoCard from "../videos/VideoCard";
import MovieImage from "../movies/MovieImage";
import MoviePoster from "../movies/MoviePoster";
import ActorAvatar from "../actors/ActorAvatar";
import CompanyCard from "../CompanyCard";

function MovieCardsSwiper({
  home = false,
  movies,
  title,
  innerRef,
  video = false,
  big = false,
  image = false,
  media,logo=false,
  poster = false,avatar=false
}) {
  //array of the movies i want to display and a title and a ref (if existanent) to kepp scroll infintely
  if (movies?.length < 0||!movies) return null;
  if (poster) movies = movies.filter((m) => m.poster_path);
  return (
    < section  className="relative pb-10">

      <h1 className=" mt-5 lg:ml-10 text-4xl font-semibold mb-3 border-l-4 border-yellow-400 pl-2 ">
        {title}
      </h1>
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
        className=" lg:ml-10 overflow-y-hidden select-none   "
      >
        {movies?.map((movie, i) => (
          <SwiperSlide 
            key={i}
            className={` pb-2 m-auto   ${
              big ? " h-[23rem] xl:h-[18rem] video-card" : " swiper-card  "
            }`}
          >
            {video ? (
              <VideoCard
                mediabool={media}
                home={home}
                movieId={movie.id}
                video={movie}
              />
            ) : image ? (
              <MovieImage slides={movies} index={i} image={movie} />
            ) : poster ? (
              <MoviePoster
                movie={movie}
                hover={true}
                media={media}
                id={movie.id}
                path={movie.poster_path}
              />
            ):avatar?<ActorAvatar image={movie}/>:logo?<CompanyCard logo={true} company={movie}/>: (
              <Card mute={true} movie={movie} key={movie.id} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div ref={innerRef}  className="  w-full h-[2rem] pb-10  "></div>

    </section>
  );
}

export default MovieCardsSwiper;
