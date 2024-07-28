import {  useParams } from "react-router";
import useGetMovie from "../features/movies/useGetMovie";
import { motion } from "framer-motion";

import Spinner from "../ui/loading/Spinner";

import Data from "../ui/Data";

function Movie() {
  const { movie, isLoading } = useGetMovie(true, true,true);
  const media='movie'
  if (isLoading) return <Spinner />;
  console.log(movie)
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Data media={media} movie={movie}/>  
    </motion.section>
  );
}

export default Movie;
