import { FaChevronDown } from "react-icons/fa6";
import { IoPlayCircleSharp } from "react-icons/io5";
import { PiPlusFill, PiThumbsDownFill, PiThumbsUpFill } from "react-icons/pi";
import { useNavigate } from "react-router";
import { useSearchQuery } from "../../context/useSearchQuery";
import { useWatchLater } from "../../features/movies/useWatchLater";
import { BiLoaderCircle } from "react-icons/bi";
import useGetWatchLater from "../../features/movies/useGetWatchLater";
import { useRemoveWatchLater } from "../../features/movies/useRemoveWatchLater";
import Label from "../components/Label";
import { CiBookmarkRemove } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";

function MovieActions({ movie, video }) {
  const navigate = useNavigate();
  const { setQuery } = useSearchQuery();
  const { addToWatchLater, isPending } = useWatchLater();
  const { removeWatchLater, isPending: isPending2 } = useRemoveWatchLater();
  const media = movie.seasons ? "tv" : "movie";
  const id = movie.id;
  const { watchLater } = useGetWatchLater();
  const isInWatchLater = watchLater?.find((m) => m.id === id) && true;
  return (
    <div className="flex relative flex-col bg-[#242424] rounded-md shadow-2xl">
      {isPending ||
        (isPending2 && (
          <BiLoaderCircle className=" text-5xl m-auto animate-spin" />
        ))}
      <div className="flex justify-between text-3xl p-4 ">
        <div className=" flex  items-center gap-2 ">
          <div
            onClick={() => {
              setQuery("");
              navigate(`/player/${media}/${video.key}/${movie.id}`);
            }}
            className=" hover:bg-red-600/75 duration-100  p-2 rounded-full border-gray-200 border-2  "
          >
            <IoPlayCircleSharp />
          </div>
          { (
            <div onClick={() => addToWatchLater({ id, media })} className={`hover:bg-red-600/75 duration-100  p-2 rounded-full text-center border-gray-200 border-2 ${isInWatchLater ?"bg-red-600":'bg-slate-700'} `}>
              <PiThumbsUpFill />
            </div>
          )}
          { (
            <div
              onClick={() => removeWatchLater(movie.id)}
              className={` hover:bg-red-600/75 duration-100 bg-slate-700   p-2 rounded-full border-gray-200 border-2 ${!isPending2 ?"bg-red-600":'bg-slate-700'}  `}
            >
              <PiThumbsDownFill />
            </div>
          )}
          {!isInWatchLater && (
            <div
              className=" hover:bg-red-600/75 duration-100  p-2 rounded-full border-gray-200 border-2"
              onClick={() => addToWatchLater({ id, media })}
            >
              <PiPlusFill />
            </div>
          )}
          <div
            onClick={() => {
              setQuery("");
              if (media == "tv") navigate(`/show/${movie.id}`);
              else navigate(`/movie/${movie.id}`);
            }}
            className=" hover:bg-red-600/75 duration-100  p-2 rounded-full border-gray-200 border-2  "
          >
            <FaChevronDown title="more info" />
          </div>
        </div>
        <div className=" absolute right-3 top-[-45%]">
          {isInWatchLater && (
            <Label
              onClick={() => removeWatchLater(id)}
              icon={<CiBookmarkRemove className=" text-2xl" />}
            >
              added to watch later
            </Label>
          )}
          {!isInWatchLater && (
            <Label
              onClick={() => addToWatchLater({ id: movie.id, media: media })}
              icon={<FaBookmark className=" text-2xl" />}
            >
              watch later
            </Label>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieActions;
