import { BsBookmarkPlusFill } from "react-icons/bs";
import { IMAGE_URL } from "../../utils/Constans";
import { useNavigate } from "react-router";
import { useWatchLater } from "../../features/movies/useWatchLater";
import { useHover } from "../../hooks/useHover";
import Genres from "../Genres";
import HoveredModal from "../HoveredModal";
import { createPortal } from "react-dom";
import Title from "../components/Title";

function MoviePoster({
  genre = false,
  movie,
  path,
  width = "18rem",
  id,
  hover = false,
  media,

}) {
  const navigate = useNavigate();
  const { addToWatchLater, isPending } = useWatchLater();
  const { onHover, setIsHovered, image, positionX, positionY, ref, isHovered } =
    useHover(movie, true);
  return (
    <div
      ref={ref}
      onMouseEnter={() => onHover()}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if(media==="none") return null
        if (id && media === "movie") navigate(`/movie/${id}`);
        else navigate(`/show/${id}`);
      }}
      style={{ width: `${width}` }}
      className="  rounded-sm flex flex-col items-baseline md:w-[14rem] lg:w-[18rem] w-auto relative hover:opacity-90 text-4xl self-stretch  transition-all duration-75 cursor-pointer"
    >
      {isPending && <miniLoader />}
      <BsBookmarkPlusFill
        onClick={() => addToWatchLater(movie.id)}
        className="absolute p-3 text-6xl left-[-.3rem] hover:text-gray-400 cursor-pointer duration-100  "
      />
      <img
        className="rounded-sm"
        src={`${IMAGE_URL}${movie?.poster_path || path}`}
        alt=""
      />
      {genre && <Genres movie={movie} />}
      {movie?.character&&<h2 className=" absolute bottom-0 left-0 text-red-600 ml-1 font-semibold text-lg">As {movie.character}</h2>}
      {isHovered &&
        hover &&
        movie.backdrop_path &&
        createPortal(
          <HoveredModal
            image={image}
            movie={movie}
            positionX={positionX}
            positionY={positionY}
          />,
          document.body
        )}
    </div>
  );
}

export default MoviePoster;
