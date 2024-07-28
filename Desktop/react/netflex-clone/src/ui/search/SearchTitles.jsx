import { useGenres } from "../../features/movies/useGenres";

function SearchTitles({ query, setGenre, genre }) {
  const { genres, isLoading } = useGenres();

  return (
    <section className="flex items-center gap-8 ">
      <div className=" lg:text-2xl text-lg  ml-[6rem] mt-3 font-semibold">
        <h2>
          Your search for &quot; <span className=" text-red-600">{query}</span>{" "}
          &quot;{" "}
        </h2>
      </div>
      <select
        value={genre}
        className="bg-[#242424] ml-auto outline-none text-red-700 mt-4  mr-[5rem] py-1 px-3 text-lg rounded-lg font-semibold"
        onChange={(e) => setGenre(e.target.value)}
        name=""
        id=""
      >
        <option className=" text-gray-200 " value={""}>
          Not specified
        </option>
        {genres?.map((genre) => (
          <option className=" text-gray-200 " value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </section>
  );
}

export default SearchTitles;
