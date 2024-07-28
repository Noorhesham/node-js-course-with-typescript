import supabase from "./supabase";

export async function addReview({ id, review }) {
  const { data, error } = await supabase
    .from("reviews")
    .insert([{ id, review }])
    .select();
  if (error) throw new Error(error.message);
  return data;
}

// export async function getMovieReview(id) {
//     let { data: reviews, error } = await supabase
//     .from('reviews')
//     .select('review')
//       if (error) throw new Error(error.message);
//   return reviews;
// }
