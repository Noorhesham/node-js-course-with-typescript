import { FaStar } from "react-icons/fa6"

function Rate({episode}) {
    return (
        <div className=" flex items-center gap-1 font-thin text-gray-500">
            <FaStar className=" text-yellow-500" /> {episode.vote_average} / 10 {`(${episode.vote_count} count)`}

        </div>
    )
}

export default Rate
