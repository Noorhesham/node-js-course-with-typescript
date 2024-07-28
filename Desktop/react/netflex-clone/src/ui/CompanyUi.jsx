import { LazyLoadImage } from "react-lazy-load-image-component"
import { IMAGE_URL } from "../utils/Constans"

function CompanyUi({onClick,companyDetails}) {
    return (
        <div onClick={onClick} className="  min-w-[19rem] m-auto hover:scale-105 hover:translate-y-3 duration-200 cursor-pointer hover:opacity-95 w-[20rem] p-3">
        <LazyLoadImage effect="blur" src={`${IMAGE_URL}${companyDetails?.logo_path}`}/>

      </div>
    )
}

export default CompanyUi
