import { useInView } from "react-intersection-observer";
import { useInfinteMovie } from "../../features/movies/useInfinteMovie";
import Card from "../Card";
import ErrorFallback from "../ErrorFallBack";
import FeedSkeleton from "../loading/FeedSkeleton";
import { motion } from "framer-motion";
import { useEffect } from "react";
import SearchTitles from "./SearchTitles";
import { useGenre } from "../../context/useGenre";
import Spinner from "../loading/Spinner";
import CompanyCard from "../CompanyCard";
import ActorMainAvatar from "../actors/ActorMainAvatar";

function SearchedMovies({ query,media }) {
  if(!query) return null
  //state for genres
  const { genre, setGenre } = useGenre();
  //getting the search results and search info
  const {
    data: searchedMovies,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfinteMovie(query, genre,media);

  //infinte scrolling
  const { ref, inView } = useInView();
  useEffect(
    function () {
      if (genre && searchedMovies?.pages.flat(1)?.length < 10) fetchNextPage();
      if (inView && hasNextPage) fetchNextPage();
    },
    [inView, hasNextPage, fetchNextPage, genre, searchedMovies]
  );
  //handle loading and errors
  if (error) return <ErrorFallback message={error?.message} />;
  // if(searchedMovies?.pages.flat(1).length===0||total_results===0)return <ErrorFallback search={true} message={`your search for "${query}" did not have any matches`}/>
  // if(isLoading) return <Skeleton/>
  console.log(searchedMovies, query);
  //JSX
  return (
    <section className={`min-h-[10vh] ${!media&&"pt-20"} `}>
      <SearchTitles genre={genre} setGenre={setGenre} query={query} />
      {isLoading && <Spinner />}
      {searchedMovies?.pages.flat(1).length === 0 ? (
        <ErrorFallback
          search={true}
          message={`your search for "${query}" did not have any matches`}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3   lg:grid-cols-4 p-6 text-center  gap-5 min-h-[40rem]"
        >
          {media==="company"&&searchedMovies?.pages.flat(1).map((company,i)=>{
              if (!company.logo_path) return null;
              if (searchedMovies?.pages?.flat(1).length === i + 1)
                return <CompanyCard company={company} />;
              return <CompanyCard key={i} company={company} />;
          })}
          {media==="person"&&searchedMovies?.pages.flat(1).map((person,i)=>{
              if (!person.profile_path) return null;
              if (searchedMovies?.pages?.flat(1).length === i + 1)
                return <ActorMainAvatar person={person} image={person.profile_path} />;
              return <ActorMainAvatar person={person} key={i} image={person.profile_path} />;
          })}
          {(media!=="company"&&media!=="person")&&searchedMovies?.pages?.flat(1).map((m, i) => {
            if (!m.backdrop_path) return null;
            if (searchedMovies.pages?.flat(1).length === i + 1)
              return <Card mute={false} innerRef={ref} key={m.id} movie={m} />;
            return <Card key={i + m.id} movie={m} />;
          })}
          {isFetchingNextPage &&
            searchedMovies?.pages.flat(1).length > 10 &&
            hasNextPage &&
            Array(10)
              .fill(4)
              .map((val, i) => <FeedSkeleton key={i} />)}
          {/* <button ref={ref} onClick={()=>fetchNextPage()}> load</button> */}
        </motion.div>
      )}
    </section>
  );
}

export default SearchedMovies;
