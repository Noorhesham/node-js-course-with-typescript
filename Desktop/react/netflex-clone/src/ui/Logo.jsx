import { IMAGE_URL } from "../utils/Constans"

function Logo({onClick,companyDetails}) {
    return (

        <div onClick={onClick} className=" py-1 px-10 rounded-xl border-2 max-w-fit  md:max-w-[20rem] border-gray-400
          hover:scale-105 hover:border-red-600  hover:translate-y-[-3px] m-1 duration-200 cursor-pointer hover:opacity-90 ">
        <img  className="logo " src={`${IMAGE_URL}${companyDetails?.logo_path}`}/>

      </div>
    )
}

export default Logo
