import { useState } from "react";
import { useUploadReview } from "../../features/authentication/useUploadReview";
import { BiLoaderCircle } from "react-icons/bi";
import { useUser } from "../../features/authentication/useUser";
import Starrating from "../movies/StarRating";

function AddReview({ movie }) {
  const [review, setReview] = useState("");
  const { uploadReview, isPending } = useUploadReview();
  const { user, isAuthenticated } = useUser();
  const [rating, setrating] = useState("");
  return (
    <div className="">
      <form
        className=" flex flex-col items-stretch"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(review, movie.id);
          // if (isAuthenticated) return  <ConfirmDelete resourceName={`log `} onConfirm={()=>navigate("/start")}/>
          if (review && movie.id && isAuthenticated)
            uploadReview({ review, movieId: String(movie.id), rating });
        }}
      >
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className=" text-sm p-4 px-8 bg-black resize-none text-gray-100 rounded-m border-red-600 border-2 outline-none"
          placeholder="Tell us your opinion !"
          rows={8}
          name="message"
        ></textarea>
        {isPending && (
          <BiLoaderCircle className=" text-5xl m-auto animate-spin" />
        )}
        <div className=" ml-auto">
          <Starrating
            messages={["Unwatchable", "Horrible", "Bad"]}
            OnSetRating={setrating}
          />
        </div>
        <button
          className=" text-lg self-end m-1 mb-2   py-1 px-2 bg-red-700 text-gray-100 text-center w-fit
       shadow-xl hover:text-gray-300 hover:bg-red-600 duration-100 rounded-sm "
        >
          Add your review
        </button>
      </form>
    </div>
  );
}

export default AddReview;
