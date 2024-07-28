import { Suspense, useState } from "react";
import SearchedMovies from "../ui/search/SearchedMovies";
import ExpandedSearch from "../ui/search/ExpandedSearch";
import Spinner from "../ui/loading/Spinner";
import FeaturedCompanies from "../ui/FeaturedCompanies";
import Title from "../ui/components/Title";

function Companies() {
    const [query,setQuery]=useState("")
    return (
      <Suspense fallback={<Spinner />}>
        <div className=" pt-[8rem] min-h-[150vh]  justify-center max-w-[full]  items-center">
            <FeaturedCompanies/>
            <div className=" m-10"><Title>search for a company</Title></div>
            <ExpandedSearch setQuery={setQuery} query={query} media={"company"} />
            <SearchedMovies query={query} media="company"/>
        </div>
        </Suspense>)
}

export default Companies
