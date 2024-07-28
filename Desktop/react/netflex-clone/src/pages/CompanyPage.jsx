import { useParams } from "react-router"
import { useGetCompany } from "../features/movies/useGetCompany"
import { useMoviesByCompany } from "../features/movies/useMoveisByCompany"
import Spinner from "../ui/loading/Spinner"
import CompanyCard from "../ui/CompanyCard"
import MovieCardsSwiper from "../ui/swipers/MovieCardsSwiper"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import FeedSkeleton from "../ui/loading/FeedSkeleton"
import CompanyUi from "../ui/CompanyUi"

function CompanyPage() {
    const{id}=useParams()
    const {companyDetails,isLoading}=useGetCompany(id)
    const {moviesByCompany,isLoading:isLoading2,isFetching,fetchNextPage,isFetchingNextPage,hasNextPage}=useMoviesByCompany(id)
    const { ref, inView } = useInView(); //ref to paginate on scroll
    useEffect(
      function () {
        if (inView && hasNextPage&&!isFetching)  fetchNextPage();
      },
      [inView, hasNextPage, fetchNextPage,isFetching]
    );
    if(isLoading||isLoading2) return <Spinner/>
    return (
        <div className=" min-h-[150vh] pt-20">
            <CompanyUi companyDetails={companyDetails}/>
            {moviesByCompany?.pages.map((arr, i) => {
          if (moviesByCompany.pages.length === i + 1)
            return <MovieCardsSwiper innerRef={ref} key={i} movies={arr} />;
          return <MovieCardsSwiper innerRef={ref} key={i} movies={arr} />;
        })}        {isFetchingNextPage &&
            hasNextPage &&
            Array(1)
              .fill(4)
              .map((val) => <FeedSkeleton key={val} />)}
        </div>
    )
}

export default CompanyPage
