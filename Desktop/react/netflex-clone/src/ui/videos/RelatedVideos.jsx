import { useEffect, useState } from "react";
import { paginate } from "../../utils/helpers";
import Button from "../components/Button";
import MovieCardsSwiper from "../swipers/MovieCardsSwiper";
import Title from "../components/Title";

function RelatedVideos({movie,isLoading}) {
    const [page,setPage]=useState(1)
    const [videos,setVideos]=useState([])
    useEffect(function(){
        console.log(page)
        if(isLoading) return
        if(page>1)setVideos(s=>[...s,paginate(movie?.videos?.results,10,page)])
      },[page,isLoading,movie])  
      const maxPages=Math.trunc(movie?.videos?.results.length/10);

    function handleClick(){
        setPage(p=>p+1)
      }
      console.log(videos,page,maxPages)
  return (
    <div className=" flex flex-col pb-10">
     <Title margin={true}>Related videos</Title>
      {<MovieCardsSwiper video={true} movies={movie?.videos?.results.slice(0,10)} />}
      {videos &&
        videos.map((video) => (
          <MovieCardsSwiper key={video} video={true} movies={video} />
        ))}
      {page <= maxPages && videos && (
        <Button onClick={handleClick}>Load more</Button>
      )}
    </div>
  );
}

export default RelatedVideos;
