import ReviewUser from "./ReviewUser";
import Title from "../components/Title";
import { useScroll } from "../../hooks/useScroll";

function Reviews({ reviews }) {
  const { handleClick, maxPages, arr, page } = useScroll(reviews, 3);
  return (
    <div className="flex  items-start justify-start flex-col">
      <Title>Reviews</Title>
      <section className=" bg-black/40 p-1 rounded-md h-[50vh] xl:h-[40vh] flex flex-col  overflow-y-scroll ">
        <div className=" flex flex-col items-center justify-center gap-5 ">
          {reviews.slice(0, 3).map((review, i) => (
            <ReviewUser review={review} key={i} />
          ))}
        </div>
        {arr &&
          arr
            .flat(1)
            .map((review, i) => <ReviewUser review={review} key={i} />)}
        {page < maxPages && arr && (
          <button
            className=" text-lg self-end m-1   py-1 px-2 bg-red-700 text-gray-100 text-center w-fit
       shadow-xl hover:text-gray-300 hover:bg-red-600 duration-100 rounded-sm "
            onClick={handleClick}
          >
            Load more
          </button>
        )}
      </section>
    </div>
  );
}

export default Reviews;
