function MovieMiniInfoCard({movie}) {
    return (
        <div className="flex flex-col items-start ml-1">
        <h2 className=" p-1 text-lg font-semibold capitalize ">
          {movie?.title||movie?.name}
        </h2>
        <div>
          <ul className=" p-1 flex text-xl flex-wrap font-semibold text-gray-300 gap-2">
            {movie?.genres?.map((gen) => (
              <li key={gen.name}>{gen.name}</li>
            ))}
          </ul>
        </div>
        <div className=" flex gap-3  pb-3 p-1 text-lg font-semibold text-gray-200">{movie?.runtime?`${movie.runtime} min `:movie?.seasons?`${movie.number_of_episodes} episodes   ${movie.seasons.length} ${movie.seasons.length===1?` season` :'seasons'}`:""}</div>
      </div>
    )
}

export default MovieMiniInfoCard
