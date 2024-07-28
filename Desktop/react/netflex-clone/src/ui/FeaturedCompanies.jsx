import Spinner from "./loading/Spinner"
import useGetCompanies from "../features/movies/useGetCompanies";
import MovieCardsSwiper from "./swipers/MovieCardsSwiper";

function FeaturedCompanies() {
    const {mainCompanies,isLoading}=useGetCompanies()
    if(isLoading) return <Spinner/>
    return (
        <div className=" my-5 ">
   
            {<MovieCardsSwiper logo={true} movies={mainCompanies}/>}
        </div>
    )
}

export default FeaturedCompanies
