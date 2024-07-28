import { Link } from "react-router-dom"
import MovieCards from "../../ui/movies/MovieCards"
import MovieCardsSwiper from "../../ui/swipers/MovieCardsSwiper"

function BasedOn({watchLater,based,watchLength}) {
    return (
        <>
             {watchLength < 6 ? (
          <MovieCards title={"Watch Later Movies"} movies={watchLater} />
        ) : watchLength > 20 ? (
          <>
            <MovieCardsSwiper
              title={"Watch Later Movies"}
              movies={watchLater?.slice(0, 20)}
            />
            <Link className="bg-red-600 text-gray-100   w-fit
       shadow-xl button   mt-1 py-2 px-4  md:py-5 md:px-10 active:shadow-sm hover:translate-y-[-.5rem] hover:opacity-80 transition-all duration-100 text-center m-auto text-4xl p-1 capitalize ml-[25%] sm:ml-[45%] font-semibold hover:bg-red-600  rounded-full " to="/list">see whole liste</Link>
          </>
        ) : (
          <MovieCardsSwiper title={"Watch Later Movies"} movies={watchLater} />
        )}
        {based&&based?.map((recommend,i)=><MovieCardsSwiper key={i} title={`Because you liked ${watchLater[i+1]?.title}`} movies={recommend}/>)}
        </>
    )
}

export default BasedOn

