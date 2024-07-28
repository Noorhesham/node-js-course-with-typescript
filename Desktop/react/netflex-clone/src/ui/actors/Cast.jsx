import Actor from "./Actor";
import { useScroll } from "../../hooks/useScroll";

function Cast({ cast }) {
  const { handleClick, maxPages, arr, page } = useScroll(cast, 10);
  return (
    <div className=" grid md:grid-cols-2  gap-4 overflow-y-scroll h-[30vh] md:h-[80vh]  ">
      {cast.slice(0, 10).map((actor, i) => (
        <Actor actor={actor} key={i} />
      ))}
      {arr && arr.flat(1).map((actor, i) => <Actor actor={actor} key={i} />)}
      {page < maxPages && arr && (
        <button
          className=" text-lg self-end m-1   py-1 px-2 bg-red-700 text-gray-100 text-center w-fit
       shadow-xl hover:text-gray-300 hover:bg-red-600 duration-100 rounded-sm "
          onClick={handleClick}
        >
          Load more
        </button>
      )}
    </div>
  );
}

export default Cast;
