import AddReview from "./AddReview";
import AddedReviews from "./AddedReviews";

function UserReviews({ movie }) {
  return (
    <div className="auto-rows-auto">
      <AddReview movie={movie} />
      <AddedReviews movie={movie} />
    </div>
  );
}

export default UserReviews;
