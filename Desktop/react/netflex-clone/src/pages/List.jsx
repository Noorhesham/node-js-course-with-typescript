import { useGetBasedOnWatch } from "../features/movies/useGetBasedOnWatch"
import useGetWatchLater from "../features/movies/useGetWatchLater"
import Card from "../ui/Card"
import Title from "../ui/components/Title"
import Spinner from "../ui/loading/Spinner"
import MovieCardsSwiper from "../ui/swipers/MovieCardsSwiper"

function List() {
    const {based,isGettingBased}=useGetBasedOnWatch()
    const {watchLater,isGettingWatchLater}=useGetWatchLater()
    if(isGettingWatchLater||isGettingBased) return <Spinner/>
    return (
        <div className=" pt-20 ">
            <div className=" m-5 ml-10">
            <Title>my watch list 😸</Title>
            </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center    lg:grid-cols-4 p-6 text-center  gap-5 min-h-[40rem]">

        {watchLater.map((m, i) =><Card key={i + m.id} movie={m} />)}
        </div>
          <div>
          <div className=" m-5 ml-10 mb-10">
            <Title>suggested for you </Title>
            </div>
          {based&&based?.map((recommend,i)=><MovieCardsSwiper key={i} title={`Because you liked ${recommend[i]?.title}`} movies={recommend}/>)}
          </div>
        </div>
    )
}

export default List
