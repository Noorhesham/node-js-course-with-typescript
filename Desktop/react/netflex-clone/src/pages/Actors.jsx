import { useGetPopularActors } from "../features/actors/useGetPopularActors"
import Title from "../ui/components/Title"
import Spinner from "../ui/loading/Spinner"
import ExpandedSearch from "../ui/search/ExpandedSearch"
import SearchedMovies from "../ui/search/SearchedMovies"
import { Suspense, useState } from "react"

function Actors() {
    const {featuredActors,isLoading}=useGetPopularActors()
    const [query,setQuery]=useState("")
    if(isLoading) return <Spinner/>
    console.log(featuredActors)

    return (
      <Suspense fallback={<Spinner />}>
        <div className=" pt-[8rem] min-h-[150vh]  justify-center max-w-[full]  items-center">

            <div className=" m-10"><Title>search for a person</Title></div>
            <ExpandedSearch setQuery={setQuery} query={query} media={"person"} />
            <SearchedMovies query={query} media="person"/>
        </div>
        </Suspense>)
}

export default Actors
