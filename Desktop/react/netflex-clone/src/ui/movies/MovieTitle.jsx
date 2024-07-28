import { toHoursAndMinutes } from "../../utils/helpers";

function MovieTitle({ movie }) {
  return (
    <>
      <h1>{movie.title || movie.name}</h1>
      <div className=" text-gray-300 mt-2 mb-4 flex gap-4 text-lg">
        <span>
          {movie.runtime
            ? toHoursAndMinutes(movie.runtime)
            : movie.birthday
            ? `Birth date: ${movie.birthday} `
            : `${movie?.number_of_seasons} season ${movie?.number_of_episodes} episodes`}
        </span>
        <span> {movie.release_date}</span>
        <span className=" text-gray-400 text-lg">
          {movie.place_of_birth && movie.place_of_birth}
        </span>
      </div>
    </>
  );
}

export default MovieTitle;
