import { useEffect, useState } from "react";
import { useFeaturedMovies } from "../features/movies/useFeaturedMovies";
import MovieSwiper from "../features/movies/movieSwiper";
import MovieContent from "../ui/movies/MovieContent";
import MovieCardsSwiper from "../ui/swipers/MovieCardsSwiper";
import { useSuperHeroMovies } from "../features/movies/useSuperHeroMovies";
import { usePlayingMovies } from "../features/movies/usePlayingMovies";
import { useMovieUpcoming } from "../features/movies/useMovieUpcoming";
import { useAnime } from "../features/movies/useAnime";

import Spinner from "../ui/loading/Spinner";
import { useInfinteMain } from "../features/movies/useInfinteMain";
import { useInView } from "react-intersection-observer";
import FeedSkeleton from "../ui/loading/FeedSkeleton";
import { useHomeMovies } from "../features/movies/useHomeMovies";
import { MAIN_MOVIES } from "../utils/Constans";
import Hero from "../ui/components//Hero";
import BasedOn from "../features/movies/BasedOn";
import useGetWatchLater from "../features/movies/useGetWatchLater";
import { useGetBasedOnWatch } from "../features/movies/useGetBasedOnWatch";
import FeaturedCompanies from "../ui/FeaturedCompanies";

function Main() {
  // const {featuredMovies,isLoading}=useFeaturedMovies();
  const { homeMovies, isLoading } = useHomeMovies(MAIN_MOVIES);
  const { featuredMovies: featuredMovies2, isLoading: isLoading6 } =useFeaturedMovies(2);
  const { superHeroMovies, isLoading: isLoading2 } = useSuperHeroMovies();
  const { playingMovies, isLoading: isLoading3 } = usePlayingMovies();
  const { upcomingMovies, isLoading: isLoading4 } = useMovieUpcoming();
  const { anime, isLoading: isLoading5 } = useAnime(4);
  const { anime: anime2, isLoading: isLoading7 } = useAnime(3);
  const [currentSlide, setCurrentSlide] = useState(0); //link the small slider to the screen
  const{watchLater,isGettingWatchLater}=useGetWatchLater()
  const {based,isGettingBased}=useGetBasedOnWatch()
  const watchLength = watchLater?.length;
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =useInfinteMain(20); //use infinte popular movies to make home page more interactive
  const { ref, inView } = useInView(); //ref to paginate on scroll
  useEffect(
    function () {
      if (inView && hasNextPage) fetchNextPage();
    },
    [inView, hasNextPage, fetchNextPage]
  );
  const setSlide = (s) => setCurrentSlide(s); //the function to set the main slider form small slider indecies on click
  const activeMovie = homeMovies?.at(currentSlide); //getting the active movie to show on the main slider from the index of current slide
  if (
    isLoading ||
    isLoading2 ||
    isLoading3 ||
    isLoading4 ||
    isLoading5 ||
    isLoading6 ||
    isLoading7 ||isGettingWatchLater||isGettingBased
  )
    return <Spinner />; //if there is any loading return the spinner

  //JSX
  return (
    <>
    <div className=" w-full h-[100vh] max-w-[full] relative  group">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <MovieContent activeMovie={activeMovie} />
          <MovieSwiper
            setSlide={setSlide}
            curSlide={currentSlide}
            slides={homeMovies}
          />
        </>
      )}
      <div className="h-full relative py-4 ">
        <FeaturedCompanies/>
        {<BasedOn watchLater={watchLater} watchLength={watchLength} based={based}/>}
        <MovieCardsSwiper
          title={"Marvel cinematic universe"}
          movies={superHeroMovies}
        />
        <MovieCardsSwiper title={"Playing Now"} movies={playingMovies} />
        <Hero />
        <MovieCardsSwiper title={"Coming soon"} movies={upcomingMovies} />
        <MovieCardsSwiper title={"Top rated"} movies={featuredMovies2} />
        <MovieCardsSwiper title={"Anime"} movies={anime} />
        <MovieCardsSwiper title={""} movies={anime2} />
        {data?.pages.map((arr, i) => {
          if (data.pages.length === i + 1)
            return <MovieCardsSwiper innerRef={ref} key={i} movies={arr} />;
          return <MovieCardsSwiper key={i} movies={arr} />;
        })}
        {isFetchingNextPage &&
          hasNextPage &&
          Array(1)
            .fill(4)
            .map((val) => <FeedSkeleton key={val} />)}
      </div>
    </div>
    </>
  );
}

export default Main;
