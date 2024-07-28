import { motion } from "framer-motion";
import Video from "./videos/Video";
import MovieActions from "./movies/MovieActions";
import MovieMiniInfoCard from "./movies/MovieMiniInfoCard";
import { IMAGE_URL_SMALL } from "../utils/Constans";
function HoveredModal({ movie, positionX, positionY, mute, image, video,}) {
  const trailers = movie?.videos?.results.filter(
    (result) =>
      result.type === "Trailer" ||
      result.type === "Teaser" ||
      result.type === "Clip"
  );
  const videoIndex = Math.trunc(Math.random() * trailers?.length);
 
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ left: positionX, top: positionY }}
      className=" hover:border-2 border-red-700  flex flex-col duration-150 absolute w-[21.4rem] sm:w-[24rem]  shadow-2xl bg-[#242424] rounded-lg cursor-pointer z-[9999999]"
    >
      <div className="h-[14rem] ">
        {video && trailers.length > 0 ? (
          <Video
            trailers={trailers}
            rand={videoIndex}
            small={true}
            mute={mute}
            activeMovie={movie}
          />
        )  :(
          <img
            ref={image}
            className=" w-full  rounded-lg  "
            src={`${IMAGE_URL_SMALL}${movie?.backdrop_path}`}
            alt=""
          />
        )}
      </div>
      
      {trailers && <MovieActions video={trailers[videoIndex]} movie={movie} />}
      <MovieMiniInfoCard movie={movie} />
    </motion.div>
  );
}

export default HoveredModal;
