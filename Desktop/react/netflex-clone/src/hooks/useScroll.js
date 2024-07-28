import { useEffect, useState } from "react";
import { paginate } from "../utils/helpers";

export function useScroll(array,max){
    const [page,setPage]=useState(1)
    const [arr,setarr]=useState([])
    useEffect(function(){
        if(page>1)setarr(s=>[...s,paginate(array,max,page)])
      },[page,array,max])  
      const maxPages=Math.trunc(array.length/max);
      function handleClick(){
        setPage(p=>p+1)
      }
      return {handleClick,maxPages,arr,page}
}