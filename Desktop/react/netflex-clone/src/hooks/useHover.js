import { useEffect, useRef, useState } from "react";

export function useHover(movie={},poster=false){
    const [isHovered, setIsHovered] = useState(false);
    const [video, setVideo] = useState(false);
  
    //to make the position of the popup relative to the original image
    const [positionX, setPositionX] = useState();
    const [positionY, setPositionY] = useState();
  
    const ref = useRef();
    const image = useRef();
  
    useEffect(
      function () {
        setVideo(false);
        const interval = setTimeout(() => {
          setVideo(true);
        }, 2500);
        return () => clearTimeout(interval);
      },
      [movie, isHovered]
    );
    function onHover() {
      //on hover on elemnt we set positions and set the hover state to true so we need 3 states
      if (poster){
        setPositionX(ref.current.getBoundingClientRect().left + window.scrollX+150);
        setPositionY(ref.current.getBoundingClientRect().top + window.scrollY+200);
      }
      
      else{
        setPositionX(ref.current.getBoundingClientRect().left + window.scrollX);
        setPositionY(ref.current.getBoundingClientRect().top + window.scrollY);
      }
    
      setIsHovered(true);
    }
    return {onHover,positionX,positionY,ref,image,video,setIsHovered,isHovered}
}