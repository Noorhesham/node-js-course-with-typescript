import { motion } from "framer-motion";
import { IMAGE_URL } from "../../utils/Constans";
import { useEffect, useState } from "react";
import MovieInfo from "./MovieInfo";
import Video from "../videos/Video";

function MovieContent({ activeMovie }) {
  const [video, setVideo] = useState(false);
  const [logo, setLogo] = useState(false);
  const [selectedVideo, setVideoIndex] = useState(0);

  const trailers = activeMovie?.videos?.results?.filter(
    (result) =>
      result.type === "Trailer" ||
      result.type === "Teaser" ||
      result.type === "Clip"
  );
  useEffect(
    function () {
      setVideo(false);
      setLogo(false);
      const interval = setTimeout(() => {
        setVideo(true);
        setVideoIndex(
          trailers?.length > 0 && Math.trunc(Math.random() * trailers?.length)
        );
      }, 4500);
      const time = setTimeout(() => {
        setLogo(true);
      }, 5500);
      return () => {
        clearTimeout(interval);
        clearTimeout(time);
      };
    },
    [activeMovie]
  );
  //   useEffect(() => {
  //     setVideoIndex(Math.trunc(Math.random()*trailers?.length));
  // }, [selectedVideo,trailers]);
  function handlePause() {
    setTimeout(() => {
      setLogo(false);
      setVideo(false);
    }, 2000);
  }
  function handlePlay() {
    setLogo(false);
    setVideo(true);
  }
  return (
    <>
      {video && activeMovie.videos.results.length > 0 ? (
        <Video
          rand={selectedVideo}
          trailers={trailers}
          handlePause={handlePause}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            backgroundImage: `url(${IMAGE_URL}${activeMovie?.backdrop_path})`,
          }}
          className=" relative  lg:w-full h-full  bg-center bg-cover duration-500"
        ></motion.div>
      )}
      <MovieInfo
        trailers={trailers}
        videoIndex={selectedVideo}
        logo={logo}
        handlePlay={handlePlay}
        activeMovie={activeMovie}
      />
    </>
  );
}

export default MovieContent;
