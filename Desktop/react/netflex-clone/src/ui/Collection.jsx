import useGetCollection from "../features/movies/useGetCollection";
import MoviePoster from "./movies/MoviePoster";
import Spinner from "./loading/Spinner";
import Title from "./components/Title";
// 531241
function Collection({ media,id }) {
  const { collection, isLoading } = useGetCollection(id);
  if (isLoading) return <Spinner />;
  const m=media
  return (
    <section className=" border-l-2 p-2 border-gray-300   ">
      <div className="flex items-stretch gap-2">
        <MoviePoster media='none'  width="12rem" path={collection?.poster_path} />
        <Title>{collection.name}</Title>
      </div>
      <div className=" mt-5 flex items-center gap-4 justify-center flex-wrap">
        {collection.parts.map((part, i) => {
          if (!part.poster_path) return null;
          return (
            <MoviePoster
            media={m}
              id={part.id}
              width="9rem"
              key={i}
              path={part?.poster_path}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Collection;
