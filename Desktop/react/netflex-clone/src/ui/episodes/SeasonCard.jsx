import { LazyLoadImage } from "react-lazy-load-image-component";
import { IMAGE_URL } from "../../utils/Constans";
import MovieOverview from "../movies/MovieOverview";

function SeasonCard({ season, onClick, id, seasonState }) {
  return (
    <div
      onClick={() => onClick(season)}
      className={`hover:bg-zinc-900  duration-150  transition-all group cursor-pointer hover:opacity-80 duration-100 flex flex-col text-xs  p-1`}
    >
      <div className=" max-w-[10rem]">
        <LazyLoadImage
          className={`${
            season?.id === seasonState?.id ? "border-2 border-red-700" : ""
          }
            group-hover:scale-105 transition-all duration-100 rounded-md group-hover:border-3 border-red-700`}
          effect="blur"
          src={`${IMAGE_URL}${season.poster_path}`}
          alt=""
        />
      </div>
      <div className=" flex flex-col">
        <span>
          {season.season_number} .{season.name}
        </span>
        <MovieOverview small={true} overview={season.overview} />
      </div>
    </div>
  );
}

export default SeasonCard;
