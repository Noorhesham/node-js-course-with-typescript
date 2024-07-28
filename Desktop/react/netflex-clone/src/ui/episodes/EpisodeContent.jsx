import { LazyLoadImage } from "react-lazy-load-image-component";
import Rate from "./Rate";
import { IMAGE_URL } from "../../utils/Constans";
import { BsDot } from "react-icons/bs";

function EpisodeContent({ episode, modal = false }) {
  return (
    <>
      <div className={`relative `}>
        <LazyLoadImage
          effect="blur"
          className={` ${
            modal ? "rounded-md  md:w-full" : " md:max-w-[15rem]"
          }   group-hover:grayscale-[50%] duration-100  `}
          src={`${IMAGE_URL}${episode.still_path}`}
          alt=""
        />
        <span className=" text-sm text-red-600  left-1 font-semibold md:text-md bottom-1 absolute">
          {episode.runtime} min
        </span>
      </div>
      <div className={`${modal && "text-lg mb-3"} flex flex-col`}>
        <div
          className={` ${
            modal && "text-xl mb-3"
          } text-sm flex md:text-md font-semibold md:gap-2 items-center`}
        >
          <span>
            S{episode.season_number} E{episode.episode_number}
          </span>
          <h6 className=" hover:text-gray-500 duration-100  flex items-center">
            <BsDot className=" hidden md:block" />
            {episode.name}
          </h6>
          <span className=" ml-auto mr-1 font-normal text-gray-400">
            {episode.air_date}
          </span>
        </div>
        <div>
          <p className=" font-normal w-fit mt-1">{episode.overview}</p>
        </div>
        <div>
          <Rate episode={episode} />
        </div>
      </div>
    </>
  );
}

export default EpisodeContent;
