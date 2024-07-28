import { useGetCompany } from "../features/movies/useGetCompany"
import FeedSkeleton from "./loading/FeedSkeleton"
import { useNavigate } from "react-router"
import CompanyUi from "./CompanyUi"
import Logo from "./Logo"

function CompanyCard({company,logo}) {
    const {companyDetails,isLoading}=useGetCompany(company.id)
    const navigate=useNavigate()
    function onClick(){
        navigate(`/company/${companyDetails.id}`)
    }
    if(isLoading) return <FeedSkeleton/>
    return (
       logo?<Logo companyDetails={companyDetails} onClick={onClick}/>:<CompanyUi onClick={onClick}  companyDetails={companyDetails}/>
    )
}

export default CompanyCard
