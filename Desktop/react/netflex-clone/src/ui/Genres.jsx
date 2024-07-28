function Genres({ movie }) {
  return (
    <div>
      <ul className=" pt-3 p-1 flex text-sm justify-center flex-wrap font-semibold text-gray-300 gap-2">
        {movie.genres?.map((gen) => (
          <li    className=" py-1 px-2 border-2 rounded-full border-gray-400/60 items-center text-center text-gray-50"
            key={gen.name}
          >
            {gen.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Genres;
