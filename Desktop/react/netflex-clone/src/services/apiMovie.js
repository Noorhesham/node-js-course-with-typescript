import { API_KEY, BASE_URL, RESTRICT,  } from "../utils/Constans";
import { chunk, shuffle } from "../utils/helpers";
import { getUser } from "./apiAuth";
import supabase from "./supabase";

export async function getPublicDetails(id){
      let { data: profiles, error } = await supabase
  .from('profiles')
  .select("*")
  // Filters
  if(error) throw new Error(error.message)
  profiles.forEach(profile=>profile.reviews=JSON.parse(profile.reviews))
const results=[];
  const profileRev=profiles.map(acc=>acc.reviews.map(rev=>{
    console.log(rev)
    if(String(rev.movieId)===id) results.push(acc)
  }))
  console.log(profileRev,results)

return {accounts:results}
}
export async function getMovieDetails(id,publicMovie=false) {
  try {
    const res = await fetch(
      `${BASE_URL}movie/${id}?api_key=${API_KEY}&append_to_response=recommendations,videos,reviews,similar,images,keywords,credits`
      );
    const movie = await res.json();
    const result = { ...movie };
    if(publicMovie){
      const publicData= await getPublicDetails(id);
      // console.log(publicData)
      return {...movie,...publicData}
      }
    return result;
  } catch (err) {
    throw new Error(err);
  }

}
export async function getMovieDetailsmini(id) {
  try {
    const res = await fetch(
      `${BASE_URL}movie/${id}?api_key=${API_KEY}&append_to_response=videos,recommendations`
    );
    const movie = await res.json();
    const result = { ...movie };
    return result;
  } catch (err) {
    throw new Error(err);
  }
}
export async function getHomeMovies(arr){
  try{
    const results = await Promise.all(
      arr.map(mov=>mov.type==='tv'?getTvDetails(mov.id):getMovieDetails(mov))
    );
    const shuffled=shuffle(results)
    return shuffled
  }catch(err){
    throw new Error(err)
  }
}
export async function getEpisodiesSeason(id,num){
  try {
    const res = await fetch(
      `${BASE_URL}tv/${id}/season/${num}?api_key=${API_KEY}`
    );
    const result = await res.json();

    return result;
  } catch (err) {
    throw new Error(err);
  }

}
export async function getTvDetails(id,publicMovie=false) {
  try {
    const res = await fetch(
      `${BASE_URL}tv/${id}?api_key=${API_KEY}&append_to_response=recommendations,videos,reviews,similar,images,keywords,credits,episode_groups`
    );
    const movie = await res.json();
    const result = { ...movie };
    const episodies=await Promise.all(result.seasons.map(season=>getEpisodiesSeason(result.id,season.season_number)))
    const results={...movie,episodies}
    if(publicMovie){
      const publicData= await getPublicDetails(id);
      // console.log(publicData)
      return {...results,...publicData}
      }
    return results;
  } catch (err) {
    throw new Error(err);
  }
}
export async function getTvDetailsmini(id) {
  try {
    const res = await fetch(
      `${BASE_URL}tv/${id}?api_key=${API_KEY}&append_to_response=videos`
    );
    const movie = await res.json();
    const result = { ...movie };
    return result;
  } catch (err) {
    throw new Error(err);
  }
}


export async function getFeaturedMovies(page) {
  try {
    const res = await fetch(`${BASE_URL}movie/top_rated?api_key=${API_KEY}&page=${page}`);
    const data = await res.json();
    const results=data.results.filter(result=>result?.genre_ids?.every(g=>!(g===10749||g===27)))

    const resultsFilter = await Promise.all(
      results.map((data) => getMovieDetailsmini(data.id))
    );
    return shuffle(resultsFilter);
  } catch (err) {
    throw new Error(err);
  }
}
export async function getPopularMovies(page) {
  try {
    const res = await fetch(`${BASE_URL}movie/popular?api_key=${API_KEY}&page=${page}`);
    const data = await res.json();    
    const results=data.results.filter(result=>result?.genre_ids?.every(g=>!(g===10749||g===27)))
    const resultsFilter = await Promise.all(
      results.map((data) =>getMovieDetailsmini(data.id) )
    );
    return resultsFilter;
  } catch (err) {
    throw new Error(err);
  }
}
export async function getPlayingMovies(page) {
  try {
    const res = await fetch(`${BASE_URL}movie/now_playing?api_key=${API_KEY}&page=${page}`);
    const data = await res.json();
    const results=data.results.filter(result=>result?.genre_ids?.every(g=>!(g===10749||g===27)))
    const resultsFilter = await Promise.all(
      results.map((data) => getMovieDetailsmini(data.id))
    );
    return resultsFilter;
  } catch (err) {
    throw new Error(err);
  }
}
export async function getMovieUpcoming(page) {
  try {
    const res = await fetch(`${BASE_URL}movie/upcoming?api_key=${API_KEY}&page=${page}`);
    const data = await res.json();
    const results=data.results.filter(result=>result?.genre_ids?.every(g=>!(g===10749||g===27)))
    const resultsFilter = await Promise.all(
      results.map((data) => getMovieDetailsmini(data.id))
    );
    return resultsFilter;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getSuperHeroMovies() {
  try {
    // 9717 9715
    const res = await fetch(
      `${BASE_URL}discover/movie?api_key=${API_KEY}&with_anime=28&with_keywords=180547&&9715&&9717`
    );
    const data = await res.json();
    const results = await Promise.all(
      data.results.map((data) => getMovieDetailsmini(data.id))
    );
    return results;
  } catch (err) {
    throw new Error(err);
  }
}
export async function getAnime(page) {
  try {
    const res = await fetch(
      `${BASE_URL}discover/tv?api_key=${API_KEY}&page=${page}&with_anime=16&with_keywords=210024&&207826&&9715`
    );
    const data = await res.json();
    const results=data.results.filter(result=>result?.genre_ids?.every(g=>!(g===10749||g===27)))

    // const results=data.results.filter(result=>result?.genre_ids?.every(g=>!(g===10759)))
    const results2 = await Promise.all(
      results?.map((data) => getTvDetails(data.id))
    );
    return results2;
  } catch (err) {
    throw new Error(err);
  }
}


export async function searchForMovie(query,genre,pageParam, ) {
  try {
    if(RESTRICT.includes(query.toLowerCase().trim())){
     throw new Error("this search key word is not allowed") 
     
    } 
    const res = await fetch(`${BASE_URL}search/multi?query=${query}&page=${pageParam}&api_key=${API_KEY}&adult=false`);
    const data = await res.json();
    let results=data.results.filter(d=>d.backdrop_path&&(!d.genre_ids.includes(10749||27)));
    console.log(results)
    if(genre)   results=data.results.filter(result=>result?.genre_ids?.some(g=>g===+genre))
    // if((title&&genre!=='')) return results.length
    
    const Detailedresults = await Promise.all(results.map((d) => d.media_type==='tv'?getTvDetailsmini(d.id):d.media_type==='movie'?getMovieDetailsmini(d.id):""));
    const  filtered=Detailedresults.filter(m=>m.backdrop_path)

    // if(genre) filtered=filtered.filter(result=>result.anime.some(g=>g.id===+genre))
    return filtered;
  } catch (err) {
    throw new Error(err);
  }
}


export async function getAllGenres() {
  try {

    const res = await fetch(`${BASE_URL}genre/movie/list?api_key=${API_KEY}`);
    const data = await res.json();
    return data.genres.filter(g=>g.id!==10749||g===27&&g.id!==53);

  } catch (err) {
    throw new Error(err);
  }
}

export async function getWatchLater(){
  const user = await getUser()
  const likedMovies=user.user_metadata.likedMovies
  const results=await Promise.all(likedMovies.filter(res=>res.id).map(movie=>movie.media==='tv'?getTvDetailsmini(movie.id):getMovieDetailsmini(movie.id)))
  console.log(likedMovies)
  return results
}
export async function getRelated(){
  const watchLater=await getWatchLater()
  const recommends=await Promise.all(watchLater.map(w=>shuffle(w.recommendations?.results)?.filter(r=>r.backdrop_path&&(!r.genre_ids.includes(10749||g===27)))?.slice(0,5)).filter(r=>r).flat(1).map(movie=>movie.media==='tv'?getTvDetailsmini(movie.id):getMovieDetailsmini(movie.id)))
  return chunk(recommends,20)
}

export async function getCollection(id){
  const res = await fetch(`${BASE_URL}collection/${id}?api_key=${API_KEY}`);
    const data = await res.json();
    return data
}

export async function getMoviesByCompany({pageParam,id}){
  console.log(pageParam,id)
  const res=await fetch(`${BASE_URL}discover/movie?api_key=${API_KEY}&with_companies=${id}&page=${pageParam}`);
  const data = await res.json();
  if (!data) return []
  const results = await Promise.all(
    data.results.map((data) => getMovieDetailsmini(data.id))
  );
  return results.filter(r=>r.backdrop_path)
}
export async function getCompany(id){
  const res = await fetch(`${BASE_URL}company/${id}?api_key=${API_KEY}`);
  const data = await res.json();
  // const {results}=await getMoviesByCompany(id)
    return data
}
export async function getCompaniesSpcific(arr){
  const results = await Promise.all(arr.map(a=>getcompany(a)));
  // const {results}=await getMoviesByCompany(id)
  console.log(results)
    return results
}

export async function getRecommendations({pageParam,id}){
  const res = await fetch(`${BASE_URL}movie/${id}/recommendations?api_key=${API_KEY}&page=${pageParam}`);
    const data = await res.json();
    return data.results
}
export async function getRecommendationsTv({pageParam,id}){
  const res = await fetch(`${BASE_URL}tv/${id}/recommendations?api_key=${API_KEY}&page=${pageParam}`);
    const data = await res.json();
    return data.results
}
export async function getEpisodeDetails(id,seasonNum,episodeNum){
  const res = await fetch(`${BASE_URL}tv/${id}/season/${seasonNum}/episode/${episodeNum}?api_key=${API_KEY}&append_to_response=recommendations,videos,reviews,similar,images,keywords,credits`);
    const data = await res.json();
    return data
}


  export async function searchActor(query,pageParam){
    console.log(query,pageParam)
    const res = await fetch(`${BASE_URL}search/person?query=${query}&page=${pageParam}&api_key=${API_KEY}&adult=false`);
      const data = await res.json();
      console.log(data)
      return data.results
    }
    export async function popularActor(){
      const res = await fetch(`${BASE_URL}person/popular?api_key=${API_KEY}&append_to_response=recommendations,videos,reviews,similar,images,keywords,credits`);
        const data = await res.json();
        console.log(data)
        return data.results
}
export async function getcompany(id){
  const res = await fetch(`${BASE_URL}company/${id}?api_key=${API_KEY}&append_to_response=tv_credits,videos,latest,movie_credits,images,keywords,credits`);
    const data = await res.json();
    console.log(data)
    return data
}
export async function getPerson(id){
  const res = await fetch(`${BASE_URL}person/${id}?api_key=${API_KEY}&append_to_response=tv_credits,videos,latest,movie_credits,images,keywords,credits`);

    const data = await res.json();
    return data
}