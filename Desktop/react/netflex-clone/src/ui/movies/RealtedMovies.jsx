import { useEffect } from "react";
import { useInfinteRecommend } from "../../features/movies/useInfinteRecommend";
import MovieCardsSwiper from "../swipers/MovieCardsSwiper";
import { useInView } from "react-intersection-observer";
import FeedSkeleton from "../loading/FeedSkeleton";
import Spinner from "../loading/Spinner";

function RealtedMovies({ movie, media }) {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfinteRecommend(movie.id, media);
  const { ref, inView } = useInView(); //ref to paginate on scroll
  useEffect(
    function () {
      if (inView && hasNextPage) fetchNextPage();
    },
    [inView, hasNextPage, fetchNextPage]
  );
  if (isLoading) return <Spinner />;
  return (
    <div className="">
      {data?.pages.map((arr, i) => {
        if (data.pages.length === i + 1)
          return (
            <MovieCardsSwiper
              poster={true}
              media={media}
              innerRef={ref}
              key={arr}
              movies={arr}
            />
          );
        return <MovieCardsSwiper media={media} poster={true} key={i} movies={arr} />;
      })}
      {isFetchingNextPage &&
        hasNextPage &&
        Array(5)
          .fill(4)
          .map((val, i) => <FeedSkeleton key={i} />)}
    </div>
  );
}

export default RealtedMovies;
