import ReactPlayer from "react-player";
import { YOUTUBE_URL } from "../utils/Constans";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeft } from "react-icons/fa6";
import useGetMovie from "../features/movies/useGetMovie";
import Spinner from "../ui/loading//Spinner";
import MoviePoster from "../ui/movies/MoviePoster";
import MovieMiniInfoCard from "../ui/movies/MovieMiniInfoCard";
import { FaLocationArrow } from "react-icons/fa";
import RelatedVideos from "../ui/videos/RelatedVideos";

function Player() {
  const { url, id,media } = useParams();
  const navigate = useNavigate();
  const { movie, isLoading } = useGetMovie(id,false, media,url);
  if (isLoading) return <Spinner />;
  console.log(movie);

  return (
    <section className=" bg-black relative  w-full h-full  duration-500">
      <section className=" w-full  relative flex flex-col xl:flex-row justify-center items-center gap-2 lg:pt-20 lg:px-10">
        <FaArrowLeft
          className=" absolute text-5xl z-50 bg-red-800 p-1 rounded-full xl:bg-transparent  left-[2%] cursor-pointer hover:text-gray-500 duration-150 top-[12%]"
          onClick={() => navigate(-1)}
        />
        <div className=" relative pt-[2.5rem] w-full  xl:w-[80%] mr-auto xl:ml-20 h-[70vh] self-start ">
          <ReactPlayer
            width="100%"
            height="100%"
            playing={true}
            controls={true}
            className=" absolute flex-auto top-0 left-0 w-full h-full rounded-2xl bg-center bg-cover"
            url={`${YOUTUBE_URL}${url}`}
          />
        </div>
        <div className="flex xl:self-start  flex-col border-b-2 border-gray-200 ">
          <div className=" hover:text-gray-200 cursor-pointer bg-[#222222] py-5 px-10 relative  flex gap-2 ">
            <MoviePoster media={media} width={"10rem"} movie={movie} />
            <MovieMiniInfoCard movie={movie} />
            <button
              onClick={() => navigate(`/${media==="tv"?"show":'movie'}/${id}`)}
              className=" text-3xl absolute top-[60%] left-[80%]"
            >
              <FaLocationArrow className=" text-red-500 hover:text-red-600 duration-100" />
            </button>
          </div>
        </div>
      </section>

      <RelatedVideos isLoading={isLoading} movie={movie} />
    </section>
  );
}

export default Player;
