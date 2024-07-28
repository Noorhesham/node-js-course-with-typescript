import { IMAGE_URL_SMALL } from "../utils/Constans";
import { createPortal } from "react-dom";
import HoveredModal from "./HoveredModal";
import { useHover } from "../hooks/useHover";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Card({ movie,innerRef,mute }) {
  //state to show popup on hover and play the video after a while 
  const {onHover,setIsHovered,image,video,positionX,positionY,ref,isHovered}=useHover(movie)
  if(!movie.backdrop_path) return null
  return (
    <div
      ref={ref}
      className="relative shadow-2xl  w-fit md:w-[20rem] mt-4 "
      onMouseEnter={() => onHover()}
      onClick={()=>onHover()}
      onMouseLeave={() => setIsHovered(false)}
    >
     <img   ref={innerRef}
        className=" duration-150  rounded-lg "
        src={`${IMAGE_URL_SMALL}${movie.backdrop_path}`}
        alt=""
      />
      {isHovered &&
        createPortal(
          <HoveredModal image={image} video={video} movie={movie} mute={mute} positionX={positionX} positionY={positionY}/>,
          document.body
        )}
    </div>
  );
}

export default Card;
