import CompanyCard from "./CompanyCard"

function Company({companies}) {
    return (
        <div className=" flex flex-wrap items-center mt-3 gap-4">
            {companies.map((company,i)=><CompanyCard company={company} key={i}/>)}
        </div>
    )
}

export default Company
