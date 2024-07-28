import { MdArrowForwardIos } from "react-icons/md";
import MovieOverview from "./movies/MovieOverview";
import Title from "./components//Title";
import WatchLaterCard from "./components/WatchLaterCard";
import MovieCardsSwiper from "./swipers/MovieCardsSwiper";
import Reviews from "./reviews/Reviews";
import UserReviews from "./reviews/UserReviews";
import Cast from "./actors/Cast";
import Collection from "./Collection";
import RealtedMovies from "./movies/RealtedMovies";
import Company from "./Company";
import BackDrop from "./BackDrop";
import MovieTitle from "./movies/MovieTitle";
import MoviePoster from "./movies/MoviePoster";
import VideoCard from "./videos//VideoCard";
import MediaComponents from "./movies/MediaComponents";
import { useNavigate } from "react-router";

function Data({ movie, media, children }) {
  if(!movie) return
  const videos =
    media === "movie"
      ? movie?.videos?.results.filter(
          (result) =>
            result.type === "Trailer" ||
            result.type === "Teaser" ||
            result.type === "Clip"
        )
      : movie.videos?.results;
  const videoIndex = Math.trunc(Math.random() * videos?.length);
  const navigate = useNavigate();

  function navigateToVideos() {
    navigate(`/player/${media}/${videos[videoIndex].key}/${movie.id}`);
  }
  function navigateToImages() {
    navigate(`/image/${media}/${movie.id}`);
  }

  const backdrops =
    media === "movie"
      ? movie?.images?.backdrops.filter(
          (mov) =>
            mov.iso_639_1 === "en" &&
            mov.aspect_ratio === 1.778 &&
            mov.width >= 1920
        )
      : movie?.images?.backdrops;

  return (
    <>
      <BackDrop backdrops={backdrops} />
      <div className=" absolute top-[18%] left-[10%] text-5xl font-semibold w-[80%]   ">
        <MovieTitle movie={movie} />
        <div className=" flex flex-wrap justify-center  xl:flex-nowrap  gap-2 items-center  ">
          <MoviePoster id={movie?.id} media={media} genre={true} movie={movie} />
          <div className="flex-auto self-start relative h-[29rem] ">
            <VideoCard
              mediabool={media}
              mute={true}
              name={false}
              video={videos[videoIndex]}
              movieId={movie?.id}
            />
          </div>
          <MediaComponents
            onClick2={navigateToImages}
            onClick={navigateToVideos}
            movie={movie}
            imagesLen={movie.images.backdrops.length}
            video={videos[videoIndex]}
            videosLen={movie.videos.results.length}
          />
        </div>
        <div className=" flex items-center justify-stretch flex-wrap ">
          <MovieOverview overview={movie.overview} />
          <WatchLaterCard media={"movie"} movie={movie} />
        </div>
        <div className=" grid grid-cols-1 gap-5  lg:grid-cols-3 ">
          <div className=" col-span-2  w-fit">
            <Title onClick={navigateToVideos}>
              Videos{" "}
              <span className=" text-gray-300 text-sm">
                {movie.videos.results.length}
              </span>
              <MdArrowForwardIos className=" white group-hover:text-red-700 duration-100 " />
            </Title>
            <MovieCardsSwiper
              big={true}
              home={movie.id}
              media={media}
              video={true}
              movies={movie?.videos?.results.slice(0, 10)}
            />
          </div>
          {movie.reviews.results.length > 0 && (
            <Reviews reviews={movie.reviews.results} />
          )}
        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-3 auto-rows-auto gap-5 ">
          <div className=" col-span-2">
            <Title onClick={navigateToImages}>
              Images{" "}
              <span className=" text-gray-300 text-sm">
                {" "}
                {movie.images.backdrops.length}
              </span>
              <MdArrowForwardIos className=" white group-hover:text-red-700 duration-100 " />
            </Title>
            <MovieCardsSwiper
              image={true}
              movies={movie?.images?.backdrops.slice(0, 10)}
            />
          </div>
          <div>
            <Title>User reviews</Title>
            <UserReviews movie={movie} />
          </div>
        </div>
        <Title>
          Top Cast
          <span className=" text-gray-300 text-sm">
            {movie.credits.cast.length}
          </span>
          <MdArrowForwardIos className=" white group-hover:text-red-700 duration-100 " />
        </Title>
        <div
          className={`${
            children ? "lg:grid-cols-1" : ""
          } grid grid-cols-1 md:grid-cols-2 gap-4`}
        >
          <Cast cast={movie.credits.cast} />
          {children}
          {movie.belongs_to_collection && (
            <Collection media={media} id={movie.belongs_to_collection.id} />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5`">
            <div className="col-span-3">
            <Title>
            Related Movies
            <span className=" text-gray-300 text-sm">
              {movie.recommendations.results.length}
            </span>
            <MdArrowForwardIos className=" white group-hover:text-red-700 duration-100 " />
          </Title>
          <RealtedMovies media={media} movie={movie} />
            </div>
        <div className=" ml-0 lg:ml-3  py-3 lg:px-6 rounded-xl" >
        <Title>Production Companies</Title>
          <Company companies={movie?.production_companies}  />
        </div>
        </div>
      </div>
    </>
  );
}

export default Data;
