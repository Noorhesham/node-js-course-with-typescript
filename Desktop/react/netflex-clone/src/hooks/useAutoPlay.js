import { useEffect, useState } from "react";

export function useAutoPlay({activeMovie,isHovered}){
    const [video,setVideo]=useState(false);
    useEffect(function(){
        setVideo(false)
        const interval=setTimeout(() => {
            setVideo(true)
        }, 5000);
        return ()=>clearTimeout(interval);
    },[activeMovie,isHovered])
  
    return {video,setVideo}
}