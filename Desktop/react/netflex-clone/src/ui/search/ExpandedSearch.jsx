import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

function ExpandedSearch({media,setQuery,query}) {

  return (

      <div className={`flex relative w-[60%] bg-black text-3xl py-2 px-4 rounded-full m-auto items-center`}>
        <button
          className={`transition-all p-1 duration-100 outline-none   justify-end 
          `}
        >
          <IoIosSearch />
        </button>
        <input
          autoFocus
          placeholder={` Search ${media}`}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className={` placeholder:text-gray-400 bg-transparent w-[100%]  ml-1 outline-none text-xl h-[2rem] `}
          type="search"
        />
        <button
          className="p-1"
          onClick={() => {
            setQuery("");
          }}
        >
          <RxCross2 />
        </button>
      </div>

  );
}

export default ExpandedSearch;
