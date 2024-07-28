import { CiBookmarkRemove } from "react-icons/ci";
import Label from "./Label";
import { useWatchLater } from "../../features/movies/useWatchLater";
import { useRemoveWatchLater } from "../../features/movies/useRemoveWatchLater";
import useGetWatchLater from "../../features/movies/useGetWatchLater";
import { FaBookmark } from "react-icons/fa6";
function WatchLaterCard({ movie, media }) {
  const { addToWatchLater, isPending } = useWatchLater();
  const { removeWatchLater, isPending: isPending2 } = useRemoveWatchLater();
  const { watchLater, isGettingWatchLater } = useGetWatchLater();
  const isInWatchLater = watchLater?.find((m) => m.id === movie.id) && true;
  return (
    <div className=" lg:flex-1 flex-[40%] py-1 px-4 relative">
      {isPending || (isPending2 && <miniLoader />)}
      {isInWatchLater && (
        <Label
          onClick={() => removeWatchLater(movie.id)}
          icon={<CiBookmarkRemove className=" text-2xl" />}
        >
          remove from watch list{" "}
        </Label>
      )}
      {!isInWatchLater && (
        <Label
          onClick={() => addToWatchLater({ id: movie.id, media })}
          icon={<FaBookmark className=" text-2xl" />}
        >
          {" "}
          add to watch later
        </Label>
      )}
    </div>
  );
}

export default WatchLaterCard;
