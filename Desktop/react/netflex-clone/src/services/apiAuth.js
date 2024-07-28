import supabase from "./supabase";

const URL =
  "https://qeosgcqmnfcjzlhurqla.supabase.co/storage/v1/object/public/avatars/";

export async function signUp({ email, password, full_name }) {
  console.log(email, password, full_name);
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name, avatar_url: "", likedMovies: [], reviews: [] },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}
export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}
export async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return user;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();
  console.log(error);
  if (error) throw new Error(error.message);
}

export async function updatePublicUser(avatar_url,full_name,id) {
  const avatar=avatar_url
  const fullname=full_name
  const { data, error } = await supabase
    .from("profiles")
    .update( {avatar_url:avatar,full_name:fullname} )
    .eq("id", id)
    .select();
    console.log(data);
  if (error) throw new Error(error.message);
}
export async function updatePublicreview(reviews, id) {
  const rev=reviews.filter(r=>r)
  console.log(rev)
  const { data, error } = await supabase
    .from("profiles")
    .update({reviews:rev} )
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  console.log(data);
}
export async function uploadAvatar(avatar) {
  const {
    data: { user },
    error,
  } = await supabase.auth.updateUser();

  const fileName = `avatar-${user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(error);

  //update avatar in user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: { avatar_url: `${URL}${fileName}` },
  });
  if (error2) throw new Error(error.message);
  updatePublicUser(`${URL}${fileName}`, user.id);
  return updatedUser;
}

export async function updateCurrentUser({ password, full_name, avatar }) {
  let updateData;
  if (password) updateData = { password };
  if (full_name) updateData = { data: { full_name } };
  //1.update pass or full name
  const { data:user, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return user;

  //2.upload avatar image
  const fileName = `avatar-${user.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(error.message);
  //3.update avatar in user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: { avatar_url: `${URL}${fileName}` },
  });
  console.log(fileName,full_name,user.user.id)
  if (error2) throw new Error(error.message);
  updatePublicUser(`${URL}${fileName}`,full_name, user.user.id  );
  return updatedUser;
}

export async function UploadReview({review,movieId,rating}){
  console.log(review,movieId,rating)
  const user = await getUser()
  const reviews=user.user_metadata.reviews
  const updatedReviews=reviews?.filter(rev=>rev?.movieId!==movieId)
  console.log(user)
  const { data, error } = await supabase.auth.updateUser({data:{ reviews:[...updatedReviews,{review,movieId,rating}]}});
  if (error) throw new Error(error.message);
  updatePublicreview([...updatedReviews,{review,movieId,rating}],user.id)
  return data
}
export async function WatchLater({id,media}){
  const user = await getUser()
  const likedMovies=user.user_metadata.likedMovies
  const updatedMovies=likedMovies?.filter(rev=>rev?.id!==id)||[]
  const { data, error } = await supabase.auth.updateUser({data:{ likedMovies:[...updatedMovies,{id,media}]}});
  if (error) throw new Error(error.message);
  return data;
}
WatchLater({})
export async function removeWatchLater(id){
  const user = await getUser()
  const likedMovies=user.user_metadata.likedMovies
  const updatedMovies=likedMovies?.filter(rev=>rev?.id!==id)||[]
  const { data, error } = await supabase.auth.updateUser({data:{ likedMovies:updatedMovies}});
  if (error) throw new Error(error.message);
  console.log(data)
  return data;
}
export async function recoverPassword(email){
  let { data, error } = await supabase.auth.resetPasswordForEmail(email)
  console.log(data)
  if (error) throw new Error(error.message);

}
export async function updatePass({password}) {

  const { data:user, error } = await supabase.auth.updateUser({password});

  if (error) throw new Error(error.message);

  return user;
}

// export async function Token() {
//   const res = await fetch(
//     `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`
//   );
//   const data1 = await res.json();
//   console.log(data1);
//   const tok = await fetch(
//     `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`
//   );
//   const token = await tok.json();
//   console.log(token.request_token);
//   window.location.replace(
//     `https://www.themoviedb.org/authenticate/${token.request_token}?redirect_to=http://localhost:5173/main`
//   );
//   return token.request_token;
// }
// export async function thirdParty() {
//   const queryParams = new URLSearchParams();
//   const token = queryParams.request_token;
//   const auth = await fetch(
//     `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`,
//     {
//       body: JSON.stringify({
//         request_token: token,
//       }),
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//       },
//     }
//   );
//   const authentication = auth.json();
//   console.log(authentication);
// }
