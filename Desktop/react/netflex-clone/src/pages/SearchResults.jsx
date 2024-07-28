import { useSearchQuery } from "../context/useSearchQuery"
import SearchedMovies from "../ui/search/SearchedMovies"

function SearchResults() {
    const{query}=useSearchQuery();


    return (
        <div>
            <SearchedMovies query={query} />
        </div>
    )
}

export default SearchResults
