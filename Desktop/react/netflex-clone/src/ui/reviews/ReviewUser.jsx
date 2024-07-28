import { IMAGE_URL } from "../../utils/Constans";
import MovieOverview from "../movies/MovieOverview";
import Starrating from "../movies/StarRating";

function ReviewUser({ review,id }) {
  console.log(review);
  const myrev=review?.reviews?.findIndex(rev=>String(rev.movieId)===String(id))
  console.log(review.reviews,myrev)
  return (
    <div className="flex items-stretch text-lg gap-2 p-1 ">
      <div className="max-w-[2rem]">
        <img
          className=" rounded-md object-cover "
          src={
            review?.author_details?.avatar_path
              ? `${IMAGE_URL}${review?.author_details?.avatar_path}`
              : review?.avatar_url
              ? review?.avatar_url
              : `/avatar1.jpg`
          }
          alt=""
        />
      </div>
      <div className=" flex flex-col gap-1">
        <h4 className=" flex gap-1 items-center text-gray-200">
          {review?.author || review?.full_name}
  
        {myrev>=0&&<Starrating defaultRating={review?.reviews[myrev]?.rating} change={false} size={10}/>}
        </h4>
        {
          <MovieOverview
            small={true}
            overview={ review.content||review?.reviews[myrev].review }
          />
        }
      </div>
    </div>
  );
}

export default ReviewUser;
