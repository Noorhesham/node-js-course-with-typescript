import { IoIosExit } from "react-icons/io";
import useEpisodeDetails from "../../tv/useEpisodeDetails";
import EpisodeContent from "./EpisodeContent";
import MovieImage from "../movies/MovieImage";
import Skeleton from "../loading/Skeleton";
import VideoCard from "../videos/VideoCard";
import { useParams } from "react-router";
import { motion } from "framer-motion";
export default function EpisodeModal({ episode, close }) {
  const { showId } = useParams();
  const { episodeDetails, isLoading } = useEpisodeDetails(
    episode.show_id,
    episode.season_number,
    episode.episode_number
  );
  if (isLoading) return <Skeleton />;
  return (
    <motion.section className="overflow-y-scroll z-[99] px-10 py-5 grid grid-cols-1 lg:grid-cols-2  h-[100%] top-0 fixed lg:top-10 left-0 w-[100%]  backdrop-blur-md transition-all duration-75  bg-black/60 ">
      <IoIosExit
        className="fixed text-gray-300 hover:text-red-700 cursor-pointer duration-100 top-5 left-20 lg:top-5 lg:left-10 z-50 text-6xl "
        onClick={close}
      />
      <div className="justify-around col-span-2 pt-16  items-center flex-col gap-3 lg:flex-row  flex">
        <div
          className={` group cursor-pointer lg:w-[55%] 
         hover:border-red-700  flex flex-col items-start p-3 
          md:p-1 md:pt-2 shadow-xl 
          bg-black/45  gap-2 text-sm border-b-[1px]
           md:border-b-2 border-gray-300 mb-10  `}
        >
          <EpisodeContent modal={true} episode={episode} />
        </div>
        <div
          className={`grid gap-3 grid-cols-1 md:grid-cols-2 ${
            episodeDetails.images.stills.length <= 2 ? "md:grid-cols-1" : ""
          }`}
        >
          {episodeDetails?.images.stills.map((img, i) => (
            <MovieImage
              slides={episodeDetails.images.stills}
              index={i}
              key={i}
              path={img.file_path}
            />
          ))}
        </div>
      </div>
      <div className="flex col-span-2   mt-5 flex-wrap gap-3 p-1 pb-20 justify-center items-center">
        {episodeDetails.videos.results.map((video, i) => (
          <VideoCard movieId={showId} mediabool="tv" key={i} video={video} />
        ))}
      </div>
    </motion.section>
  );
}
