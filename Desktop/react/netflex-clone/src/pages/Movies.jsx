import { Suspense, useEffect, useState } from "react"
import ExpandedSearch from "../ui/search/ExpandedSearch"
import SearchedMovies from "../ui/search/SearchedMovies"
import { useInfinteMain } from "../features/movies/useInfinteMain";
import { useInView } from "react-intersection-observer";
import MovieCardsSwiper from "../ui/swipers/MovieCardsSwiper";
import FeedSkeleton from "../ui/loading/FeedSkeleton";
import Spinner from "../ui/loading/Spinner";

function Movies() {
    const [query,setQuery]=useState("")
    const { data, hasNextPage, fetchNextPage, isFetchingNextPage,isFetching } =useInfinteMain(60);
    const { ref, inView } = useInView(); //ref to paginate on scroll
    useEffect(
      function () {
        if (inView && hasNextPage&&!isFetching)  fetchNextPage();
      },
      [inView, hasNextPage, fetchNextPage,isFetching]
    );
    if(isFetching&&!isFetchingNextPage) return <Spinner/>
    return (
      <Suspense fallback={<Spinner />}>
        <div className=" pt-20 min-h-[150vh]  justify-center max-w-[full]  items-center">
            <ExpandedSearch setQuery={setQuery} query={query} media={"movies"} />
            <SearchedMovies query={query} media="movie"/>
            <div className="h-full relative py-4 ">
            {data?.pages.map((arr, i) => {
          if (data.pages.length === i + 1)
            return <MovieCardsSwiper innerRef={ref} key={i} movies={arr} />;
          return <MovieCardsSwiper innerRef={ref} key={i} movies={arr} />;
        })}        {isFetchingNextPage &&
            hasNextPage &&
            Array(1)
              .fill(4)
              .map((val) => <FeedSkeleton key={val} />)}
            </div>
        </div>
        </Suspense>
    )
}

export default Movies
