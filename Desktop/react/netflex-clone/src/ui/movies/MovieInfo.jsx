import { AnimatePresence, motion } from "framer-motion";
import { IMAGE_URL } from "../../utils/Constans";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa6";
import { IoInformationCircleOutline } from "react-icons/io5";
import MovieOverview from "./MovieOverview";
function MovieInfo({
  activeMovie,
  handlePlay,
  logo,
  mini = false,
  videoIndex,
  trailers,
}) {
  const navigate = useNavigate();
  const media = activeMovie.seasons ? "tv" : "movie";
  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      style={logo && { top: "40%" }}
      className={` absolute w-[80%]  lg:w-[40%] duration-300  flex flex-col gap-2 top-[22%] left-1  lg:left-[5%]`}
    >
      <div className={`${mini ? "w-[10vw]" : "w-[10rem] lg:w-[34vw]"}`}>
        <img
          className=" w-full h-[11rem] object-contain  "
          src={
            activeMovie?.images?.logos.length &&
            `${IMAGE_URL}${
              activeMovie.images?.logos.filter(
                (logo) => logo.iso_639_1 === "en"
              )[0].file_path
            }`
          }
          alt=""
        />
      </div>
      {!logo && (
        <AnimatePresence mode="wait">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="lg:flex-grow drop-shadow-md	 text-white font-semibold duration-300 "
          >
            <MovieOverview big={true} overview={activeMovie?.overview} />
          </motion.p>
        </AnimatePresence>
      )}
      {!mini && (
        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              navigate(
                `/player/${media}/${trailers[videoIndex].key}/${activeMovie.id}`
              )
            }
            className="flex  items-center text-black bg-gray-100 py-3 px-6 text-2xl gap-2 rounded-lg"
          >
            <FaPlay />
            Play
          </button>
          <button
            onClick={() => {
              if (media == "tv") navigate(`/show/${activeMovie.id}`);
              else navigate(`/movie/${activeMovie.id}`);
            }}
            className="flex mt-3  items-center text-white bg-gray-500/90 py-1 px-2 lg:py-3 lg:px-6 text-2xl gap-2 rounded-lg"
          >
            <IoInformationCircleOutline />
            More Info
          </button>
        </div>
      )}
    </motion.div>
  );
}

export default MovieInfo;
