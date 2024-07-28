import { IMAGE_URL } from "../utils/Constans"

function BackDrop({backdrops}) {
    const backDropIndex=Math.trunc(Math.random() * backdrops.length)  
    return (
        <div className=" relative  w-full h-full  duration-500">
        <img className=" absolute left-0 top-0 blur-md" 
          src={`${IMAGE_URL}${backdrops[backDropIndex]?.file_path}`}alt="" />
      </div>
    )
}

export default BackDrop
