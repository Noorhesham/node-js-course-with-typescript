import { BiSolidVideos } from "react-icons/bi"
import { IoIosImages } from "react-icons/io"

function MediaComponents({videosLen,movie,imagesLen,video,onClick,onClick2}) {
    return (
        <div className=" justify-center p-2 flex w-full  xl:w-auto  xl:flex-col gap-2 self-start   xl:flex-none ">
        <div onClick={onClick}
         className=" hover:bg-gray-400/50  group  duration-100 cursor-pointer p-8 lg:p-16 bg-gray-600/40 text-4xl
         flex flex-col items-center w-full justify-center  "><BiSolidVideos className=" group-hover:text-red-600 duration-100"/>
         <span className=" text-xl  mt-2 capitalize">{videosLen} videos</span> </div>
        <div onClick={onClick2} className="hover:bg-gray-400/50 group w-full duration-100 cursor-pointer p-8  lg:p-16 bg-gray-600/40 text-4xl flex flex-col items-center justify-center "><IoIosImages className="group-hover:text-red-600 duration-100" />
         <span className=" text-xl  mt-2 capitalize">{imagesLen<100?imagesLen:"+99"} images</span> </div>
      </div>
    )
}

export default MediaComponents
