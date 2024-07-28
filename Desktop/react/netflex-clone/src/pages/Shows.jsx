import { Suspense, useEffect, useState } from "react";
import { useInfinteMain } from "../features/movies/useInfinteMain";
import ExpandedSearch from "../ui/search/ExpandedSearch";
import SearchedMovies from "../ui/search/SearchedMovies";
import MovieCardsSwiper from "../ui/swipers/MovieCardsSwiper";
import FeedSkeleton from "../ui/loading/FeedSkeleton";
import { useInView } from "react-intersection-observer";
import Spinner from "../ui/loading/Spinner";

function Shows() {
    const [query,setQuery]=useState("")
    const { data, hasNextPage, fetchNextPage, isFetchingNextPage,isFetching } =useInfinteMain(50,"tv");
    const { ref, inView } = useInView(); //ref to paginate on scroll
    useEffect(
      function () {
        if (inView && hasNextPage&&!isFetching)  fetchNextPage();
      },
      [inView, hasNextPage, fetchNextPage,isFetching]
    );
      if(isFetching&&!isFetchingNextPage) return <Spinner/>
    console.log(data)
    return (
        <Suspense fallback={<Spinner />}>
        <div className=" pt-20 min-h-[150vh]  justify-center max-w-[full]  items-center">
            <ExpandedSearch setQuery={setQuery} query={query} media={"shows"} />
            <SearchedMovies query={query} media="shows"/>
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

export default Shows
